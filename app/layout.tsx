import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/afek-light-aaa.woff2", weight: "300" },
    { path: "./fonts/afek-bold-aaa.woff2", weight: "700" },
    { path: "./fonts/afek-black-aaa.woff2", weight: "900" },
  ],
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/polin-regular.woff2", weight: "400" },
    { path: "./fonts/polin-bold.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ngogen.co.il"),
  title: "נ.ג. עוגן | כוח אדם, אחזקה וניקיון",
  description: "חברת כוח אדם, ניקיון ואחזקה למוסדות ולעסקים. מגייסים, מלווים ומפקחים כל בוקר בשטח. 500+ עובדים, מאז 2017.",
  openGraph: {
    title: "נ.ג. עוגן · תהיו רגועים, יש לכם שקט תפעולי",
    description: "כוח אדם, ניקיון ואחזקה. מהגיוס ועד הפיקוח השוטף.",
    locale: "he_IL",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#061524" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body data-sea="storm">{children}</body>
    </html>
  );
}
