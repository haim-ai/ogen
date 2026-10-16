"use client";
import { useState } from "react";
import Link from "next/link";
import { WA, PHONE, ADDRESS, HOURS, EMAILS } from "@/lib/content";

/** One visit to start with. WhatsApp first, the phone, or a short form; all the details below. */
export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", place: "", need: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setErr("חסר שם.");
    if (!/^0\d{8,9}$/.test(form.phone.replace(/[^\d]/g, ""))) return setErr("הטלפון לא נראה נכון. מספר ישראלי, עם 0 בהתחלה.");
    setErr("");
    // no server: the details go out as a ready WhatsApp message, sent only if the visitor presses send there
    const text = [`שלום, אני ${form.name.trim()}.`, form.place && `מ${form.place.trim()}.`, form.need && `צריך: ${form.need.trim()}`, `טלפון: ${form.phone.trim()}`].filter(Boolean).join("\n");
    window.open(`${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  };

  const field = "mt-2 block w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-lg outline-none transition-colors focus:border-cyan";

  return (
    <section id="contact" className="relative px-5 py-28 md:px-12 md:py-36" aria-labelledby="contact-h">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="label text-cyan-ink">נתחיל יחד בביקור אחד</p>
          <h2 id="contact-h" className="display mt-5 text-[clamp(2.8rem,7vw,6.6rem)]">
            תגידו לנו לאן,
            <br />
            <span className="text-cyan">נגיע.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg md:text-xl">נגיע אליכם, נכיר את המקום, ותקבלו תוכנית עבודה כתובה. כזו שאפשר גם להציג להנהלה.</p>
          <div className="mt-10 flex flex-col items-start gap-4">
            <a href={WA} target="_blank" rel="noopener" className="pill pill-solid !min-h-[60px] !text-[1.15rem]">
              <span className="dot !size-11" aria-hidden>
                ←
              </span>
              דברו איתנו בוואטסאפ
            </a>
            <a href={PHONE.href} className="display ltr text-[clamp(2rem,4vw,3.2rem)] text-navy underline-offset-8 hover:underline">
              {PHONE.label}
            </a>
          </div>

          <dl className="mt-14 grid gap-6 text-lg sm:grid-cols-2">
            <div>
              <dt className="label text-muted">כתובת</dt>
              <dd className="mt-1">{ADDRESS}</dd>
            </div>
            <div>
              <dt className="label text-muted">שעות פעילות</dt>
              <dd className="mt-1">{HOURS}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="label text-muted">מיילים לפי מחלקה</dt>
              <dd className="mt-2">
                <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {EMAILS.map((m) => (
                    <li key={m.address} className="flex items-baseline justify-between gap-3 border-b border-line py-2">
                      <span className="text-muted">{m.dept}</span>
                      <a href={`mailto:${m.address}`} className="ltr text-navy hover:text-cyan-ink">
                        {m.address}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="rounded-[28px] bg-mist p-7 md:p-10">
            {!sent ? (
              <form onSubmit={submit} noValidate>
                <p className="display text-[1.8rem]">או השאירו פרטים ונחזור אליכם</p>
                <div className="mt-6 grid gap-5">
                  <label className="block">
                    <span className="font-bold">שם</span>
                    <input value={form.name} onChange={set("name")} autoComplete="name" required className={field} />
                  </label>
                  <label className="block">
                    <span className="font-bold">טלפון</span>
                    <input value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" dir="ltr" required className={`${field} text-end`} />
                  </label>
                  <label className="block">
                    <span className="font-bold">המוסד או העסק</span>
                    <input value={form.place} onChange={set("place")} autoComplete="organization" className={field} />
                  </label>
                  <label className="block">
                    <span className="font-bold">מה צריך?</span>
                    <textarea value={form.need} onChange={set("need")} rows={3} className={`${field} resize-none`} placeholder="למשל: שני עובדי ניקיון לבוקר, מתחילת החודש" />
                  </label>
                </div>
                <p role="alert" className="mt-4 min-h-[1.5em] font-bold text-[var(--error-ink)]">
                  {err}
                </p>
                <button type="submit" className="pill pill-solid mt-2 w-full justify-center">
                  <span className="dot" aria-hidden>
                    ←
                  </span>
                  שלחו, ונחזור אליכם
                </button>
                <p className="mt-4 text-sm text-muted">
                  הלחיצה פותחת וואטסאפ עם ההודעה. הפרטים לא נשמרים באתר. <Link href="/privacy" className="underline">מדיניות פרטיות</Link>.
                </p>
              </form>
            ) : (
              <div role="status">
                <span aria-hidden className="anchor h-12 text-cyan" />
                <p className="display mt-4 text-[2rem]">תודה, {form.name.trim()}.</p>
                <p className="mt-3 text-lg">פתחנו לכם וואטסאפ עם ההודעה מוכנה. לחצו שם &quot;שלח&quot;, ונחזור אליכם בשעות הפעילות. אם דחוף: <a href={PHONE.href} className="ltr font-bold">{PHONE.label}</a>.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
