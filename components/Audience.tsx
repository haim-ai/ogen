import Image from "next/image";
import { AUDIENCE } from "@/lib/content";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

/** Who it is for: the pain held still on one side, the institutions read out on the other. */
export default function Audience() {
  return (
    <section id="audience" className="relative bg-mist px-5 py-28 md:px-12 md:py-36" aria-labelledby="audience-h">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
            <p className="label text-cyan-ink">למי זה מיועד?</p>
            <h2 id="audience-h" className="display mt-5 text-[clamp(2.2rem,4.4vw,4rem)]">
              כוח אדם לא מדויק
              <br />
              <span className="text-cyan">משפיע</span> על כל העסק.
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg">על הרצף התפעולי, על הצוות הקיים, ועל איך שהמקום שלכם נראה כלפי חוץ.</p>
            <p className="display-light mt-8 max-w-[22ch] border-s-4 border-alert ps-5 text-[clamp(1.4rem,2.4vw,2rem)] leading-tight">
              והכי מתסכל? העובד לא הגיע, ומי שנראה לא מקצועי ולא מאורגן, זה אתם.
            </p>
          </div>
        </div>

        <Reveal as="ul" className="md:col-span-7">
          {AUDIENCE.map((a) => (
            <li key={a} data-reveal className="group flex items-center gap-5 border-b border-line py-5 md:py-7">
              <span aria-hidden className="anchor h-0 text-cyan opacity-0 transition-all duration-300 group-hover:h-8 group-hover:opacity-100" />
              <span className="display text-[clamp(1.7rem,3.6vw,3.3rem)] transition-transform duration-300 group-hover:-translate-x-2">{a}</span>
            </li>
          ))}
          <li data-reveal className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[24px]">
            <Image src={asset("/media/kitchen.webp")} alt="מטבח תעשייתי נקי ומוכן לבוקר" fill sizes="(min-width: 768px) 55vw, 90vw" className="object-cover" />
          </li>
        </Reveal>
      </div>
    </section>
  );
}
