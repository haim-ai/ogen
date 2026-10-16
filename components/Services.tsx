import Image from "next/image";
import { SERVICES } from "@/lib/content";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

const ICONS = ["nikayon", "koach_adam", "achzaka"];

/** "To make operations work, you need an anchor." One giant word, three services read like a ledger. */
export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-28 md:px-12 md:py-40" aria-labelledby="services-h">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <p data-reveal className="label text-cyan-ink">
            השירותים שלנו
          </p>
          <h2 id="services-h" data-reveal className="display-light mt-5 text-[clamp(1.7rem,2.5vw,2.3rem)] leading-[1.15]">
            כדי שהתפעול יעבוד
            <br />
            כמו שצריך, אתם צריכים
          </h2>
          <p data-reveal aria-hidden className="display mt-2 text-[clamp(7rem,19vw,17rem)] leading-[0.8] text-navy">
            עוגן<span className="text-cyan">.</span>
          </p>
          <span className="sr-only">עוגן.</span>
        </Reveal>

        <Reveal as="ol" className="md:col-span-6 md:col-start-7">
          {SERVICES.map((s, i) => (
            <li key={s.n} data-reveal className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-8 last:border-b">
              <span className="row-span-2 grid size-16 place-items-center rounded-2xl bg-navy transition-colors duration-300 group-hover:bg-cyan">
                <Image src={asset(`/media/${ICONS[i]}_anchor_white_flat.svg`)} alt="" width={40} height={40} unoptimized />
              </span>
              <h3 className="display flex items-baseline gap-4 text-[clamp(2rem,3.6vw,3.2rem)]">
                <span className="label ltr text-cyan-ink">{s.n}</span>
                {s.name}
              </h3>
              <p className="mt-2 max-w-[44ch] text-lg text-muted">{s.line}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
