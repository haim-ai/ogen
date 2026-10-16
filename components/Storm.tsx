"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORM, WA, PHONE } from "@/lib/content";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger);

type Body = { x: number; y: number; vx: number; vy: number; a: number; va: number; phase: number; born: number; w: number; h: number };

const HOLD_SEC = 1.3;
const NAV_CLEAR = 84;

/** tell the nav what the sea is doing */
function announce(state: "storm" | "calm", open: number) {
  document.body.dataset.sea = state;
  window.dispatchEvent(new CustomEvent("ogen:sea", { detail: { state, open } }));
}

/**
 * The opening. A bad morning arrives as notifications that drift and pile up; the cursor pushes them around.
 * Holding the button drops the anchor: everything lines up, gets ticked off, sinks, and the calm opens from the
 * point where the anchor hit. Scrolling past without holding anchors instantly, so nobody is left in the storm.
 */
export default function Storm() {
  const root = useRef<HTMLElement>(null);
  const sea = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const gate = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const rope = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const calm = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const anchorFn = useRef<(instant?: boolean) => void>(() => {});
  const holding = useRef(false);
  const [count, setCount] = useState(4);
  const [anchored, setAnchored] = useState(false);

  useEffect(() => {
    const sec = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const max = mobile ? 6 : STORM.length;
    const bodies: Body[] = [];
    let W = 0;
    let H = 0;
    let avoid: DOMRect[] = [];
    let mouse = { x: -9999, y: -9999 };
    let progress = 0;
    let done = false;
    let raf = 0;
    let last = performance.now();
    let spawnClock = 0;
    let n = Math.min(4, max);

    const measure = () => {
      const r = sec.getBoundingClientRect();
      W = r.width;
      H = r.height;
      avoid = [headline.current!, gate.current!].map((el) => {
        const b = el.getBoundingClientRect();
        return new DOMRect(b.left - r.left - 18, b.top - r.top - 18, b.width + 36, b.height + 36);
      });
      const bt = button.current!.getBoundingClientRect();
      const rp = rope.current!;
      rp.style.left = `${bt.left - r.left + bt.width / 2 - 1.5}px`;
      rp.style.height = `${Math.max(0, bt.top - r.top)}px`;
    };

    const make = (i: number, entering: boolean): Body => {
      const el = cards.current[i]!;
      const w = el.offsetWidth || 260;
      const h = el.offsetHeight || 64;
      // start in the open water left of the headline (physical left in RTL)
      const x = Math.random() * Math.max(40, W * (mobile ? 0.7 : 0.5) - w) + 12;
      const top = mobile && avoid[0] ? avoid[0].bottom : H * 0.12;
      const bottom = mobile && avoid[1] ? avoid[1].top - h : H * 0.85;
      // new ones arrive under the nav (and on a phone, in the water below the headline), never through text
      const y = entering && !mobile ? NAV_CLEAR : top + Math.random() * Math.max(10, bottom - top);
      return { x, y, vx: (Math.random() - 0.5) * 30, vy: entering ? 120 + Math.random() * 80 : 0, a: (Math.random() - 0.5) * 14, va: 0, phase: Math.random() * 6.28, born: performance.now(), w, h };
    };

    const settleAt = (b: Body, el: HTMLDivElement) => {
      el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.a}deg)`;
    };

    measure();
    for (let i = 0; i < n; i++) bodies.push(make(i, false));

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (done) return;
      const t = now / 1000;

      // the morning keeps coming
      spawnClock += dt;
      if (n < max && spawnClock > (mobile ? 1.3 : 0.95)) {
        spawnClock = 0;
        bodies.push(make(n, true));
        n++;
        setCount(n);
        announce("storm", n);
      }

      // the hold
      if (holding.current) progress = Math.min(1, progress + dt / HOLD_SEC);
      else progress = Math.max(0, progress - dt * 1.6);
      ring.current!.style.strokeDashoffset = String(1 - progress);
      rope.current!.style.transform = `scaleY(${progress})`;
      if (progress >= 1) {
        anchorFn.current();
        return;
      }

      const shake = 1 + progress * 6;
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const el = cards.current[i];
        if (!el) continue;
        // swell and current
        const swell = Math.sin(t * 0.9 + b.phase) * 14 + Math.sin(t * 0.37 + b.phase * 2) * 8;
        let fx = Math.sin(t * 0.21 + b.phase) * 10 - 6;
        let fy = (H * 0.45 + swell * 6 - (b.y + b.h / 2)) * 0.25;
        // the cursor pushes them away
        const dx = b.x + b.w / 2 - mouse.x;
        const dy = b.y + b.h / 2 - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200) {
          const d = Math.sqrt(d2) || 1;
          const k = (1 - d / 200) * 2600;
          fx += (dx / d) * k;
          fy += (dy / d) * k;
          b.va += (dx > 0 ? 1 : -1) * 40 * dt;
        }
        // keep clear of the headline and the gate
        for (const r of avoid) {
          if (b.x + b.w > r.left && b.x < r.right && b.y + b.h > r.top && b.y < r.bottom) {
            const cx = r.left + r.width / 2;
            fx += (b.x + b.w / 2 < cx ? -1 : 1) * 900;
          }
        }
        // neighbours nudge each other
        for (let j = i + 1; j < bodies.length; j++) {
          const o = bodies[j];
          const ox = b.x - o.x;
          const oy = b.y - o.y;
          if (Math.abs(ox) < b.w * 0.8 && Math.abs(oy) < b.h * 0.9) {
            const s = oy >= 0 ? 1 : -1;
            b.vy += s * 60 * dt;
            o.vy -= s * 60 * dt;
          }
        }
        b.vx += fx * dt;
        b.vy += fy * dt;
        b.vx *= Math.exp(-dt * 1.6);
        b.vy *= Math.exp(-dt * 1.6);
        b.x += b.vx * dt + (progress > 0 ? (Math.random() - 0.5) * shake : 0);
        b.y += b.vy * dt + (progress > 0 ? (Math.random() - 0.5) * shake : 0);
        b.va += (-b.a * 0.6 + Math.sin(t * 0.7 + b.phase) * 4) * dt;
        b.va *= Math.exp(-dt * 2);
        b.a += b.va * dt * 6;
        // walls
        if (b.x < 8) (b.x = 8), (b.vx = Math.abs(b.vx) * 0.5);
        if (b.x + b.w > W - 8) (b.x = W - 8 - b.w), (b.vx = -Math.abs(b.vx) * 0.5);
        // floor and ceiling. On a phone the headline spans the width, so the water is the band between it and the gate
        const floor = mobile && avoid[1] ? avoid[1].top - b.h : H - b.h - 8;
        const ceiling = mobile && avoid[0] ? avoid[0].bottom : NAV_CLEAR;
        if (b.y > floor) (b.y = floor), (b.vy = -Math.abs(b.vy) * 0.4);
        // new arrivals still fall in from above; after that the ceiling holds
        if (b.y < ceiling && now - b.born > 1400) (b.y = ceiling), (b.vy = Math.abs(b.vy) * 0.4);
        settleAt(b, el);
      }
    };

    // the anchor drops
    anchorFn.current = (instant = false) => {
      if (done) return;
      done = true;
      setAnchored(true);
      announce("calm", 0);
      const g = gate.current!.getBoundingClientRect();
      const r = sec.getBoundingClientRect();
      const gx = g.left - r.left + g.width / 2;
      const gy = g.top - r.top + g.height / 2;
      const c = calm.current!;
      if (instant || reduce) {
        gsap.set(c, { clipPath: "circle(150% at 50% 50%)" });
        gsap.set(sea.current, { autoAlpha: 0 });
        return;
      }
      const els = cards.current.slice(0, bodies.length).filter(Boolean) as HTMLDivElement[];
      els.forEach((el) => (el.style.transition = "none"));
      const colX = mobile ? 16 : Math.max(24, W * 0.06);
      const gap = mobile ? 52 : 60;
      const top0 = Math.max(90, H / 2 - (els.length * gap) / 2);
      const tl = gsap.timeline();
      tl.to(gate.current, { scale: 1.12, duration: 0.12, ease: "power2.out" }).to(gate.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      els.forEach((el, i) => {
        tl.to(el, { x: colX, y: top0 + i * gap, rotate: 0, duration: 0.7, ease: "power3.out" }, 0.08 + i * 0.03);
      });
      tl.add(() => els.forEach((el) => el.classList.add("done")), "+=0.05");
      els.forEach((el, i) => tl.to(el.querySelector(".tick"), { scale: 1, autoAlpha: 1, duration: 0.25, ease: "back.out(3)" }, `>-${i ? 0.21 : 0}`));
      tl.to(els, { y: `+=${H * 0.5}`, autoAlpha: 0, duration: 0.6, ease: "power2.in", stagger: 0.02 }, "+=0.35");
      tl.fromTo(c, { clipPath: `circle(0px at ${gx}px ${gy}px)` }, { clipPath: `circle(${Math.hypot(W, H) * 1.1}px at ${gx}px ${gy}px)`, duration: 1.2, ease: "power3.inOut" }, "-=0.45");
      tl.set(sea.current, { autoAlpha: 0 });
      tl.from(c.querySelectorAll("[data-rise]"), { y: 40, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, "-=0.55");
    };

    if (reduce) {
      anchorFn.current(true);
    } else {
      gsap.set(calm.current, { clipPath: "circle(0px at 50% 50%)" });
      announce("storm", n);
      raf = requestAnimationFrame(step);
    }

    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => (mouse = { x: -9999, y: -9999 });
    sec.addEventListener("pointermove", onMove);
    sec.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(measure);
    ro.observe(sec);
    const st = ScrollTrigger.create({ trigger: sec, start: "top top", end: "bottom 25%", onLeave: () => anchorFn.current(true) });

    return () => {
      cancelAnimationFrame(raf);
      sec.removeEventListener("pointermove", onMove);
      sec.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      st.kill();
    };
  }, []);

  const press = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    holding.current = true;
  };
  const release = () => (holding.current = false);
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      anchorFn.current();
    }
  };

  return (
    <section ref={root} id="top" className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-storm text-white" aria-label="פתיחה">
      {/* the storm */}
      <div ref={sea} className="absolute inset-0">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 80% 10%, var(--sea-hi) 0%, var(--sea-mid) 40%, var(--storm) 75%)" }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 opacity-40" style={{ background: "repeating-linear-gradient(176deg, transparent 0 22px, rgba(25,166,224,0.08) 22px 23px)" }} />

        <div ref={headline} className="absolute right-5 top-[calc(var(--nav-h)+6svh)] max-w-[min(640px,88vw)] md:right-12 md:top-[calc(var(--nav-h)+12svh)]">
          <p className="label text-cyan">עוד בוקר רגיל במוסד</p>
          <p className="display mt-4 text-[clamp(2.7rem,7.2vw,6.6rem)]">
            עוד בוקר של
            <br />
            כיבוי שריפות?
          </p>
          <p className="mt-5 max-w-[34ch] text-lg text-white/75">העובד לא הגיע, המסדרון לא נוקה, והטלפון לא מפסיק. החזיקו את הכפתור, נוריד עוגן.</p>
        </div>

        {STORM.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              cards.current[i] = el;
            }}
            aria-hidden
            className={`card pointer-events-none absolute left-0 top-0 w-[min(250px,58vw)] rounded-[18px] bg-[var(--card)] px-4 py-3 text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] will-change-transform transition-opacity duration-500 ${i < count ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="label text-[0.7rem] text-cyan-ink">{s.from || "התראה"}</span>
              <span className="label ltr text-[0.7rem] text-muted">{s.t}</span>
            </div>
            <p className="mt-0.5 text-[0.98rem] font-bold leading-snug">{s.msg}</p>
            <span className="tick invisible absolute -left-3 -top-3 grid size-8 scale-0 place-items-center rounded-full bg-cyan text-storm">✓</span>
          </div>
        ))}

        {/* the anchor line, from the top of the screen down to the button (placed in JS) */}
        <div ref={rope} aria-hidden className="pointer-events-none absolute left-0 top-0 w-[3px] origin-top scale-y-0 bg-cyan shadow-[0_0_16px_rgba(25,166,224,0.8)]" />

        <div ref={gate} className="absolute bottom-[8svh] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-[10svh] md:left-auto md:right-12 md:translate-x-0 md:flex-row md:gap-5">
          <button
            ref={button}
            type="button"
            onPointerDown={press}
            onPointerUp={release}
            onPointerCancel={release}
            onPointerLeave={release}
            onKeyDown={key}
            onContextMenu={(e) => e.preventDefault()}
            className="relative grid size-[132px] touch-none select-none place-items-center rounded-full bg-white/5 text-cyan ring-1 ring-white/15 transition-colors hover:bg-white/10"
            aria-label="להוריד עוגן: החזיקו לחוץ, או Enter"
          >
            <svg aria-hidden viewBox="0 0 132 132" className="absolute inset-0 -rotate-90">
              <circle cx="66" cy="66" r="62" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
              <circle ref={ring} cx="66" cy="66" r="62" fill="none" stroke="var(--cyan)" strokeWidth="4" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            </svg>
            <span aria-hidden className="anchor h-[58px]" />
          </button>
          <div className="text-center md:text-right">
            <p className="display text-xl">החזיקו להוריד עוגן</p>
            <button type="button" onClick={() => anchorFn.current()} className="label mt-1 text-white/60 underline-offset-4 hover:underline">
              או דלגו לשקט
            </button>
          </div>
        </div>
      </div>

      {/* the calm, opened from where the anchor hit */}
      <div ref={calm} className="absolute inset-0 bg-calm text-ink" style={{ clipPath: "circle(0px at 50% 50%)" }} aria-hidden={!anchored}>
        <div className="mx-auto grid h-full max-w-[1400px] items-center gap-8 px-5 pb-8 pt-[calc(var(--nav-h)+2rem)] md:grid-cols-12 md:px-12">
          <div className="md:col-span-7">
            <p data-rise className="label text-cyan-ink">
              נ.ג. עוגן · כוח אדם, אחזקה וניקיון
            </p>
            <h1 className="mt-5">
              <span data-rise className="display-light block text-[clamp(2.4rem,5.6vw,5.4rem)]">
                תהיו רגועים.
              </span>
              <span data-rise className="display mt-2 block text-[clamp(3rem,8.4vw,8.4rem)] text-navy">
                יש לכם <span className="text-cyan">שקט</span>
                <br />
                תפעולי.
              </span>
            </h1>
            <p data-rise className="mt-6 max-w-[40ch] text-lg md:text-xl">
              חברת כוח אדם שמלווה מהגיוס ועד הפיקוח השוטף. <strong>אנחנו דואגים שהכול יעבוד.</strong>
            </p>
            <div data-rise className="mt-8 flex flex-wrap gap-3">
              <a href={WA} target="_blank" rel="noopener" className="pill pill-solid">
                <span className="dot" aria-hidden>
                  ←
                </span>
                דברו איתנו בוואטסאפ
              </a>
              <a href={PHONE.href} className="pill pill-ghost text-navy">
                <span className="dot" aria-hidden>
                  <span>☎</span>
                </span>
                <span className="ltr">{PHONE.label}</span>
              </a>
            </div>
          </div>
          <figure data-rise className="relative hidden h-[min(72svh,640px)] overflow-hidden rounded-[28px] md:col-span-5 md:block">
            <Image src={asset("/media/corridor.webp")} alt="מסדרון נקי ושקט של מוסד בשעות הבוקר" fill priority sizes="40vw" className="object-cover" style={{ objectPosition: "35% 50%" }} />
            <figcaption className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow-lg">
              <span aria-hidden className="anchor h-4 text-cyan" />
              <span className="ltr">07:00</span> · כל העמדות מאוישות
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
