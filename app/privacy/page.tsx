import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import legal from "@/lib/legal.json";

export const metadata: Metadata = { title: "מדיניות פרטיות | נ.ג. עוגן", alternates: { canonical: "/privacy" } };

export default function Page() {
  return <LegalPage doc={legal.privacy} />;
}
