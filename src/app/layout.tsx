import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JP AQUANA Banja Luka | Gradski olimpijski bazen & Vodeni park",
  description: "Zvanični portal JP Aquana d.o.o. Banja Luka. Gradski olimpijski bazen (GOB), Vodeni park Aquana, raspored staza, cjenovnici, javne nabavke i obavještenja.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
