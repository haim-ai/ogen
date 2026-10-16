import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import legal from "@/lib/legal.json";

export const metadata: Metadata = { title: "הצהרת נגישות | נ.ג. עוגן", alternates: { canonical: "/accessibility" } };

export default function Page() {
  return <LegalPage doc={legal.accessibility} />;
}
