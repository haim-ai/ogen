import Image from "next/image";
import Link from "next/link";
import { WA } from "@/lib/content";
import { asset } from "@/lib/asset";

/** The anchor at rest on the bottom: "we've got your back". */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-storm px-5 pt-24 text-white md:px-12">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12 md:items-end">
        <p className="display text-[clamp(3rem,9vw,9rem)] md:col-span-8">
          נותנים לכם
          <br />
          <span className="text-cyan">גב.</span>
        </p>
        <div className="flex flex-col items-start gap-5 md:col-span-4 md:items-end">
          <div className="relative h-[66px] w-[121px]">
            <Image src={asset("/media/logo-full-light.png")} alt="נ.ג. עוגן" fill sizes="121px" className="object-contain" />
          </div>
          <p className="text-white/70">נ.ג. עוגן · כוח אדם, אחזקה וניקיון</p>
          <a href={WA} target="_blank" rel="noopener" className="pill pill-solid">
            <span className="dot" aria-hidden>
              ←
            </span>
            דברו איתנו בוואטסאפ
          </a>
        </div>
      </div>

      {/* the seabed, and the anchor resting on it */}
      <div aria-hidden className="relative mx-auto mt-20 h-[150px] max-w-[1400px]">
        <span className="anchor absolute bottom-[14px] left-[12%] h-[120px] rotate-[-24deg] text-cyan" />
        <span className="absolute inset-x-0 bottom-0 h-[14px] rounded-t-[50%] bg-navy" />
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/60">
        <p>© 2026 נ.ג. עוגן · עיצוב קונספט</p>
        <nav aria-label="מידע משפטי" className="flex gap-6">
          <Link href="/accessibility" className="hover:text-white">
            הצהרת נגישות
          </Link>
          <Link href="/privacy" className="hover:text-white">
            מדיניות פרטיות
          </Link>
        </nav>
      </div>
    </footer>
  );
}
