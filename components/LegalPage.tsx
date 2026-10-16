import Link from "next/link";

type Block = { h?: string; p?: string; list?: string[] };

export default function LegalPage({ doc }: { doc: { title: string; updated: string; blocks: Block[] } }) {
  return (
    <main className="mx-auto max-w-[760px] px-5 pb-28 pt-28 md:px-0">
      <Link href="/" className="label text-cyan-ink hover:underline">
        → חזרה לעמוד הבית
      </Link>
      <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4rem)]">{doc.title}</h1>
      <p className="mt-2 text-muted">{doc.updated}</p>
      <div className="mt-10 space-y-8 text-lg">
        {doc.blocks.map((b, i) => (
          <section key={i}>
            {b.h && <h2 className="display text-[1.6rem]">{b.h}</h2>}
            {b.p && <p className="mt-2">{b.p}</p>}
            {b.list && (
              <ul className="mt-3 list-disc space-y-1.5 ps-6">
                {b.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
