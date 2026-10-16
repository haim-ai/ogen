"use client";
import { useEffect, useRef, useState } from "react";
import { BOARD } from "@/lib/content";

const START = 5 * 60 + 50; // 05:50
const END = 8 * 60; // 08:00
const RUN_SEC = 17; // real seconds for the whole morning

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`;

type Status = "wait" | "way" | "missing" | "replaced" | "on";

function statusAt(p: (typeof BOARD)[number], now: number): { status: Status; who: string } {
  const at = toMin(p.at);
  if (p.missing) {
    const miss = toMin(p.missing.at);
    if (now < miss) return { status: now >= at - 25 ? "way" : "wait", who: "" };
    if (now < miss + 3) return { status: "missing", who: "—" };
    if (now < at) return { status: "replaced", who: p.missing.sub };
    return { status: "on", who: p.missing.sub };
  }
  if (now >= at) return { status: "on", who: p.who };
  if (now >= at - 20) return { status: "way", who: p.who };
  return { status: "wait", who: "" };
}

const LABEL: Record<Status, string> = { wait: "ממתין", way: "בדרך", missing: "חסר!", replaced: "הוחלף", on: "מאויש" };

/** A cell that flips like a departures board when its text changes. */
function Flap({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span key={text} className={`flap inline-block ${className}`}>
      {text || " "}
    </span>
  );
}

/**
 * The signature: one institution's morning on a departures-style board. It runs by itself while on screen,
 * 05:50 to 08:00 in ~17 seconds. Posts go from waiting to on their way to staffed; at 06:41 the usher at the
 * main entrance is missing, and three minutes later someone else is on the way.
 */
export default function Board() {
  const root = useRef<HTMLElement>(null);
  const [now, setNow] = useState(START);
  const [runs, setRuns] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setNow(END);
      return;
    }
    let raf = 0;
    let t0 = 0;
    let visible = false;
    let elapsed = 0;
    let last = 0;
    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = ts;
        return;
      }
      if (!t0) t0 = ts;
      elapsed += (ts - (last || ts)) / 1000;
      last = ts;
      const m = Math.min(END, START + ((END - START) * elapsed) / RUN_SEC);
      setNow((prev) => (Math.floor(prev) === Math.floor(m) ? prev : m));
      if (m >= END) cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [runs]);

  const states = BOARD.map((p) => statusAt(p, now));
  const staffed = states.filter((s) => s.status === "on").length;
  const done = now >= END;
  const alarm = states.some((s) => s.status === "missing");

  return (
    <section ref={root} id="board" className="relative overflow-hidden bg-storm px-5 py-24 text-white md:px-12 md:py-32" aria-labelledby="board-h">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label text-cyan">הערכת מצב · כל בוקר</p>
            <h2 id="board-h" className="display mt-5 text-[clamp(2.5rem,5.8vw,5.6rem)]">
              בזמן שאתם עוד בדרך,
              <br />
              <span className="text-cyan">הבוקר כבר מסודר.</span>
            </h2>
          </div>
          <div className="flex items-end gap-8 md:col-span-5 md:justify-end">
            <div>
              <p className="label text-white/50">השעה</p>
              <p className="display ltr text-[clamp(3.4rem,6.5vw,6rem)] tabular-nums" aria-live="off">
                {fmt(now)}
              </p>
            </div>
            <div>
              <p className="label text-white/50">עמדות מאוישות</p>
              <p className="display ltr text-[clamp(3.4rem,6.5vw,6rem)] tabular-nums">
                <span className={staffed === BOARD.length ? "text-cyan" : ""}>{staffed}</span>
                <span className="text-white/30">/{BOARD.length}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[22px] bg-[var(--board)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_40px_80px_-40px_rgba(0,0,0,0.8)] md:mt-16">
          <table className="w-full border-collapse text-right">
            <caption className="sr-only">לוח העמדות של בוקר אחד במוסד, משעה 05:50 עד 08:00</caption>
            <thead>
              <tr className="label text-white/45">
                <th scope="col" className="px-4 py-4 font-bold md:px-7">עמדה</th>
                <th scope="col" className="hidden px-4 py-4 font-bold sm:table-cell">מקום</th>
                <th scope="col" className="px-4 py-4 font-bold">שעה</th>
                <th scope="col" className="hidden px-4 py-4 font-bold md:table-cell">עובד</th>
                <th scope="col" className="px-4 py-4 font-bold md:px-7">מצב</th>
              </tr>
            </thead>
            <tbody>
              {BOARD.map((p, i) => {
                const s = states[i];
                const tone = s.status === "on" ? "text-cyan" : s.status === "missing" ? "text-alert" : s.status === "replaced" ? "text-white" : "text-white/40";
                return (
                  <tr key={i} className={`border-t border-white/[0.07] transition-colors duration-500 ${s.status === "missing" ? "bg-alert/10" : ""}`}>
                    <td className="px-4 py-3.5 md:px-7">
                      <span className="display text-[1.15rem] md:text-[1.5rem]">{p.role}</span>
                      <span className="block text-sm text-white/55 sm:hidden">{p.place}</span>
                    </td>
                    <td className="hidden px-4 py-3.5 text-lg text-white/75 sm:table-cell">{p.place}</td>
                    <td className="px-4 py-3.5">
                      <span className="display ltr text-[1.05rem] tabular-nums text-white/70 md:text-[1.3rem]">{p.at}</span>
                    </td>
                    <td className="hidden px-4 py-3.5 md:table-cell">
                      <Flap text={s.who} className="tile display text-[1.2rem]" />
                    </td>
                    <td className="px-4 py-3.5 md:px-7">
                      <span className={`inline-flex items-center gap-2 ${tone}`}>
                        {s.status === "on" ? <span aria-hidden className="anchor h-4" /> : s.status === "missing" ? <span aria-hidden className="size-2.5 animate-ping rounded-full bg-alert" /> : null}
                        <Flap text={LABEL[s.status]} className="display text-[1.05rem] md:text-[1.3rem]" />
                      </span>
                      {p.missing && (s.status === "replaced" || s.status === "on") && <span className="block text-sm text-white/60">המחליף: {p.missing.sub}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className={`max-w-[46ch] text-xl transition-colors duration-500 md:text-2xl ${alarm ? "text-alert" : "text-white/85"}`} aria-live="polite">
            {alarm ? "06:41. הסדרן בכניסה לא הגיע. המפקח כבר על הטלפון." : done ? "08:00. אתם מגיעים, והכל כבר מאויש." : "חסר עובד? מחליפים אותו מיד. לפני שאתם בכלל יודעים."}
          </p>
          {done && (
            <button type="button" onClick={() => (setNow(START), setRuns((r) => r + 1))} className="pill pill-ghost text-white">
              <span className="dot" aria-hidden>
                <span className="!text-storm">↻</span>
              </span>
              להריץ שוב את הבוקר
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
