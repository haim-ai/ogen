"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { WA } from "@/lib/content";
import { asset } from "@/lib/asset";

const LINKS = [
  { href: "#services", label: "שירותים" },
  { href: "#board", label: "הבוקר שלכם" },
  { href: "#audience", label: "למי זה" },
  { href: "#how", label: "איך זה עובד" },
  { href: "#contact", label: "צרו קשר" },
];

/** Logo, links, a live status chip (storm / calm) and the one CTA. Over the storm it is white, then it settles. */
export default function Nav() {
  const [sea, setSea] = useState<{ state: "storm" | "calm"; open: number }>({ state: "storm", open: 4 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = (e: Event) => setSea((e as CustomEvent).detail);
    const sc = () => setScrolled(window.scrollY > 40);
    window.addEventListener("ogen:sea", on);
    window.addEventListener("scroll", sc, { passive: true });
    sc();
    return () => {
      window.removeEventListener("ogen:sea", on);
      window.removeEventListener("scroll", sc);
    };
  }, []);

  const dark = sea.state === "storm" && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${dark ? "text-white" : "text-navy"} ${scrolled ? "bg-white/90 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : ""}`}
    >
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1400px] items-center gap-4 px-5 md:px-12">
        <a href="#top" className="relative h-[42px] w-[77px] shrink-0" aria-label="נ.ג. עוגן, לראש העמוד">
          <Image src={asset(dark ? "/media/logo-full-light.png" : "/media/logo-full.png")} alt="נ.ג. עוגן" fill sizes="77px" className="object-contain" priority />
        </a>

        <p className={`label hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 sm:flex ${dark ? "bg-white/10" : "bg-mist"}`} aria-live="polite">
          {sea.state === "storm" ? (
            <>
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-alert" />
              סערה · <span className="ltr">{sea.open}</span> פניות פתוחות
            </>
          ) : (
            <>
              <span aria-hidden className="anchor h-3.5 text-cyan" />
              שקט · הכל מאויש
            </>
          )}
        </p>

        <nav aria-label="ראשי" className="ms-auto hidden xl:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label whitespace-nowrap text-[0.92rem] opacity-80 transition-opacity hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={WA} target="_blank" rel="noopener" className="pill pill-solid ms-auto shrink-0 whitespace-nowrap !min-h-[44px] !py-1 text-[0.92rem] xl:ms-6">
          <span className="dot !size-8" aria-hidden>
            ←
          </span>
          <span className="hidden sm:inline">דברו איתנו בוואטסאפ</span>
          <span className="sm:hidden">וואטסאפ</span>
        </a>
      </div>
    </header>
  );
}
