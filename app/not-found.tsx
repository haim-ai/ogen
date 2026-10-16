import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-storm px-6 text-center text-white">
      <div>
        <span aria-hidden className="anchor h-24 text-cyan" />
        <p className="display mt-6 text-[clamp(2.4rem,6vw,4.4rem)]">העמוד הזה נסחף.</p>
        <p className="mt-3 text-lg text-white/75">אבל אנחנו עדיין כאן, מעוגנים.</p>
        <Link href="/" className="pill pill-solid mt-8">
          <span className="dot" aria-hidden>
            →
          </span>
          חזרה לעמוד הבית
        </Link>
      </div>
    </main>
  );
}
