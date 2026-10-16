"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CALM } from "@/lib/content";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The bookend of the storm: the same phone, the same morning, now with four quiet messages from Ogen's supervisor.
 * They arrive one by one when the phone comes into view.
 */
export default function Morning() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const msgs = gsap.utils.toArray<HTMLElement>(".msg");
        gsap.set(msgs, { autoAlpha: 0, y: 24, scale: 0.96 });
        gsap.to(msgs, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", stagger: 0.9, scrollTrigger: { trigger: ".phone", start: "top 70%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden px-5 py-28 text-white md:px-12 md:py-40" aria-labelledby="morning-h">
      <Image src={asset("/media/entrance.webp")} alt="" fill sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: "50% 60%" }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,21,36,0.15)_0%,rgba(6,21,36,0.55)_45%,rgba(6,21,36,0.88)_100%)]" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="max-w-[30ch] text-xl text-white/80">אתם רוצים להפסיק לכבות שריפות, אבל כל יום הסיפור חוזר על עצמו.</p>
          <h2 id="morning-h" className="display mt-6 text-[clamp(2.8rem,6.6vw,6.4rem)]">
            עכשיו דמיינו
            <br />
            <span className="text-cyan">סיפור אחר.</span>
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg text-white/85 md:text-xl">אתם מגיעים בבוקר. הערכת מצב כבר נעשתה, כל עמדה כבר מאוישת, ואתם פנויים לעבודה שלכם.</p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="phone mx-auto w-[min(360px,86vw)] rounded-[42px] bg-[var(--phone)] p-3 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            <div className="rounded-[32px] bg-[var(--phone-screen)] px-4 pb-6 pt-5 text-ink">
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <span className="grid size-10 place-items-center rounded-full bg-navy text-cyan">
                  <span aria-hidden className="anchor h-5" />
                </span>
                <div>
                  <p className="font-bold leading-tight">פיקוח · עוגן</p>
                  <p className="text-xs text-muted">מחובר</p>
                </div>
              </div>
              <ol className="mt-4 space-y-3" aria-label="הודעות מהפיקוח">
                {CALM.map((m) => (
                  <li key={m.t} className="msg max-w-[88%] rounded-2xl rounded-tr-md bg-white px-4 py-3 shadow-sm">
                    <p className="text-[0.98rem] leading-snug">{m.msg}</p>
                    <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted">
                      <span className="ltr">{m.t}</span>
                      <span aria-hidden className="text-cyan">✓✓</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
