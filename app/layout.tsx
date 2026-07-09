import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/effects/cursor-glow";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const siteUrl = "https://potenaris.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "POTENARIS — Sistemas de Crecimiento para Clínicas y Centros de Bienestar",
    template: "%s — POTENARIS",
  },
  description:
    "POTENARIS ayuda a centros de bienestar, clínicas privadas y profesionales de la salud a fortalecer su presencia digital, atraer pacientes y generar reservas constantes. Sin depender del boca a boca.",
  keywords: [
    "marketing para clínicas",
    "sistema de reservas automatizado",
    "presencia digital centros de bienestar",
    "SEO local clínicas",
    "growth systems salud",
  ],
  openGraph: {
    title: "POTENARIS — Sistemas de Crecimiento para Clínicas y Centros de Bienestar",
    description:
      "Más visibilidad local. Más reservas online. Menos dependencia del boca a boca.",
    url: siteUrl,
    siteName: "POTENARIS AI Growth Systems",
    locale: "es_ES",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void">
        <MotionConfig reducedMotion="user">
          <CursorGlow />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
