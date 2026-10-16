import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Storm from "@/components/Storm";
import Services from "@/components/Services";
import Board from "@/components/Board";
import Depth from "@/components/Depth";
import Audience from "@/components/Audience";
import Field from "@/components/Field";
import Founder from "@/components/Founder";
import Steps from "@/components/Steps";
import Morning from "@/components/Morning";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { WA, PHONE, ADDRESS } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "נ.ג. עוגן",
  description: "חברת כוח אדם, ניקיון ואחזקה למוסדות ולעסקים.",
  telephone: PHONE.label,
  address: { "@type": "PostalAddress", streetAddress: ADDRESS.split(",")[0], addressLocality: "בית שמש", addressCountry: "IL" },
  openingHours: "Su-Th 08:30-18:00",
  foundingDate: "2017",
  sameAs: [WA],
};

export default function Page() {
  return (
    <SmoothScroll>
      {/* doctor-ok: security.inner-html - static JSON-LD from constants, "<" escaped */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav />
      <main>
        <Storm />
        <Services />
        <Board />
        <Depth />
        <Audience />
        <Field />
        <Founder />
        <Steps />
        <Morning />
        <Contact />
      </main>
      <Footer />
      <a href={WA} target="_blank" rel="noopener" aria-label="וואטסאפ" className="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-navy text-2xl text-white shadow-[0_14px_30px_-10px_rgba(6,21,36,0.7)] ring-2 ring-cyan/60 transition-transform hover:scale-105">
        <span aria-hidden>✆</span>
      </a>
    </SmoothScroll>
  );
}
