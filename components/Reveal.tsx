"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** One entrance per block: children marked data-reveal rise in once, staggered. */
export default function Reveal({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ol" | "ul" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
          y: 44,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
      });
    },
    { scope: ref },
  );
  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
