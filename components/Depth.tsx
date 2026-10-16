"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NUMBERS } from "@/lib/content";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Ogen in numbers as a sounding line: the anchor runs down a rope with the scroll, and every mark it passes lights up.
 * The deeper the mark, the bigger the number: 2017 near the surface, 500+ workers at the bottom.
 */
export default function Depth() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".sinker",
          { y: 0 },
          {
            y: () => (root.current!.querySelector(".rope") as HTMLElement).offsetHeight - 70,
            ease: "none",
            scrollTrigger: { trigger: ".rope", start: "top 60%", end: "bottom 60%", scrub: 0.6, invalidateOnRefresh: true },
          },
        );
        gsap.utils.toArray<HTMLElement>(".mark").forEach((m) => {
          gsap.fromTo(m, { opacity: 0.18 }, { opacity: 1, duration: 0.4, scrollTrigger: { trigger: m, start: "top 62%", toggleActions: "play none none reverse" } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="numbers" className="relative px-5 py-28 md:px-12 md:py-36" aria-labelledby="numbers-h">
      <div className="mx-auto max-w-[1400px]">
        <p className="label text-cyan-ink">עוגן במספרים</p>
        <h2 id="numbers-h" className="display mt-5 max-w-[16ch] text-[clamp(2.4rem,5vw,4.6rem)]">
          כמה עמוק העוגן
          <br />
          <span className="text-cyan">שלנו יושב.</span>
        </h2>

        <div className="rope relative mt-16 md:mt-24">
          {/* the line and the sinker */}
          <div aria-hidden className="absolute bottom-0 left-[14px] top-0 w-[2px] bg-[repeating-linear-gradient(to_bottom,var(--cyan)_0_10px,transparent_10px_18px)] md:left-[40px]" />
          <div aria-hidden className="sinker absolute left-[-6px] top-0 z-10 grid size-[42px] place-items-center rounded-full bg-navy text-cyan shadow-lg md:left-[20px]">
            <span className="anchor h-6" />
          </div>

          <ol className="ms-0 space-y-[clamp(3rem,8vh,6rem)] pe-14 md:pe-36">
            {NUMBERS.map((n, i) => (
              <li key={n.label} className="mark grid gap-x-8 md:grid-cols-[1fr_auto] md:items-end">
                <p className="flex flex-wrap items-baseline gap-x-4">
                  <span className="display ltr text-navy" style={{ fontSize: `clamp(${2.6 + i * 0.9}rem, ${5 + i * 2.6}vw, ${4 + i * 3}rem)` }}>
                    {n.v}
                  </span>
                  {n.unit && <span className="display text-[clamp(1.4rem,2.6vw,2.4rem)] text-cyan-ink">{n.unit}</span>}
                </p>
                <p className="max-w-[28ch] text-lg text-muted md:text-xl">{n.label}</p>
                {n.unit === "רכבים" && (
                  <div className="relative mt-4 h-[78px] w-[170px] md:col-span-2">
                    <Image src={asset("/media/van.webp")} alt="רכב של נ.ג. עוגן" fill sizes="170px" className="object-contain object-right" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
