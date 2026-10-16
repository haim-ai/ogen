import Image from "next/image";
import { WORKERS } from "@/lib/content";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

/** In the field: who checks it was really cleaned, and who gets sent. Two different compositions, their own photos. */
export default function Field() {
  return (
    <section className="relative px-5 py-28 md:px-12 md:py-36" aria-label="בשטח">
      <div className="mx-auto max-w-[1400px]">
        {/* 01: photo leads, the card overlaps its edge */}
        <Reveal className="relative grid md:grid-cols-12">
          <figure data-reveal className="relative aspect-[3/2] overflow-hidden rounded-[28px] md:col-span-8 md:col-start-5">
            <Image src={asset("/media/cleaning-team.webp")} alt="צוות הניקיון והפיקוח של נ.ג. עוגן ליד רכבי החברה" fill sizes="(min-width: 768px) 62vw, 92vw" className="object-cover" style={{ objectPosition: "30% 55%" }} />
          </figure>
          <div data-reveal className="relative z-10 -mt-16 mx-4 rounded-[24px] bg-white p-7 shadow-[0_30px_60px_-30px_rgba(10,31,51,0.35)] md:absolute md:bottom-[-3rem] md:right-0 md:mx-0 md:mt-0 md:w-[min(520px,42vw)] md:p-10">
            <p className="label ltr text-cyan-ink">01 / 02</p>
            <h2 className="display mt-3 text-[clamp(2rem,3.4vw,3rem)]">מי בודק שזה באמת נוקה?</h2>
            <p className="mt-3 text-lg font-bold text-cyan-ink">העובדים המנהלים והפיקוח שלנו.</p>
            <p className="mt-2 text-lg text-muted">צוות הפיקוח מגיע לשטח ובודק שהעבודה באמת נעשתה, כדי שלא תצטרכו להתחיל את היום בסיור.</p>
          </div>
        </Reveal>

        {/* 02: the headline is split by the photo */}
        <Reveal className="mt-40 md:mt-56">
          <p data-reveal className="label ltr text-cyan-ink">
            02 / 02
          </p>
          <h2 data-reveal className="display mt-4 text-[clamp(2.8rem,8vw,8rem)]">
            לא מי שפנוי,
          </h2>
          <div data-reveal className="my-6 grid gap-8 md:grid-cols-12 md:items-center">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[24px] md:col-span-5 md:col-start-4">
              <Image src={asset("/media/workers.webp")} alt="סוגי העובדים של עוגן: סדרן, עובד אריזה, עובד ניקיון, עובד מטבח ועובד כללי" fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
            </figure>
            <div className="md:col-span-4">
              <p className="text-lg">אספקת כוח אדם לתקופה קצרה, למערך קבוע או לפעילות שגדלה.</p>
              <p className="mt-2 text-lg text-muted">אנחנו מגייסים לפי העמדות, השעות ואופי המקום שלכם.</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="סוגי עובדים">
                {WORKERS.map((w) => (
                  <li key={w.label} className="rounded-full px-4 py-2 text-sm font-bold text-white" style={{ background: w.color }}>
                    {w.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2 data-reveal className="display text-end text-[clamp(2.8rem,8vw,8rem)] text-cyan">
            מי שמתאים.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
