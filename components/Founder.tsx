import Image from "next/image";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

/** The founder: the quote large, the portrait, his signature, and where it all started. */
export default function Founder() {
  return (
    <section id="about" className="relative overflow-hidden bg-navy px-5 py-28 text-white md:px-12 md:py-36" aria-labelledby="about-h">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p data-reveal aria-hidden className="display text-[9rem] leading-[0.5] text-cyan">
            ”
          </p>
          <blockquote data-reveal className="display-light mt-4 text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.15]">
            כואב לי לראות מוסדות וגופים איכותיים שמנוהלים לא טוב, בגלל כוח אדם שלא הגיע, או שלא הותאם לתפקיד.
          </blockquote>
          <div data-reveal className="mt-8 flex items-center gap-5">
            <span className="rounded-2xl bg-white px-4 py-2">
              <Image src={asset("/media/hershi-signature.png")} alt="הערשי גרטנהויז" width={136} height={40} />
            </span>
            <p className="label text-white/70">מנכ״ל נ.ג. עוגן</p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-4 md:col-start-9">
          <figure data-reveal className="relative aspect-square overflow-hidden rounded-[28px]">
            <Image src={asset("/media/hershi.webp")} alt="הערשי גרטנהויז, מנכ״ל נ.ג. עוגן" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
          </figure>
        </Reveal>

        <Reveal className="md:col-span-8 md:col-start-5 md:mt-10">
          <p data-reveal className="label text-cyan">
            אודות
          </p>
          <h2 id="about-h" data-reveal className="display mt-4 text-[clamp(2.2rem,4.6vw,4.2rem)]">
            הכל התחיל
            <br />
            מניקיון של ישיבות.
          </h2>
          <p data-reveal className="mt-6 max-w-[56ch] text-lg text-white/80 md:text-xl">
            הערשי גרטנהויז הקים את עוגן ב־2017, אחרי יותר מעשור של ניהול צוותי עובדים ושנים של ניהול אדמיניסטרטיבי במוסדות חינוך.{" "}
            <strong className="text-white">הוא ישב בכיסא של המנהל. הוא יודע איך נראה הבוקר הזה מבפנים.</strong>
          </p>
          <p data-reveal className="mt-4 max-w-[56ch] text-lg text-white/80 md:text-xl">
            מאז עוגן גדלה למאות עובדים ברחבי הארץ, ונשארה נאמנה לאותה הבטחה: לקחת אחריות על כל המערך.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
