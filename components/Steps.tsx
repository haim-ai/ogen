import { STEPS } from "@/lib/content";
import Reveal from "./Reveal";

/** Three steps, laid out as a line you walk along, numbers as the landmarks. */
export default function Steps() {
  return (
    <section id="how" className="relative px-5 py-28 md:px-12 md:py-36" aria-labelledby="how-h">
      <div className="mx-auto max-w-[1400px]">
        <p className="label text-cyan-ink">איך זה עובד</p>
        <h2 id="how-h" className="display mt-5 max-w-[20ch] text-[clamp(2.2rem,4.6vw,4.2rem)]">
          שלושה שלבים, ומהיום הראשון <span className="text-cyan">אתם יודעים מה קורה.</span>
        </h2>
        <Reveal as="ol" className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          <span aria-hidden className="absolute inset-x-0 top-[2.4rem] hidden h-[2px] bg-[repeating-linear-gradient(to_left,var(--cyan)_0_10px,transparent_10px_18px)] md:block" />
          {STEPS.map((s) => (
            <li key={s.n} data-reveal className="relative">
              <span className="display relative z-10 inline-grid size-20 place-items-center rounded-full bg-white text-[2rem] text-navy ring-2 ring-cyan">{s.n}</span>
              <h3 className="display mt-6 text-[1.9rem]">{s.title}</h3>
              <p className="mt-3 max-w-[34ch] text-lg text-muted">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
