import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { AboutPositioning } from "@/components/sections/about-positioning";
import { AboutNiche } from "@/components/sections/about-niche";
import { AboutValues } from "@/components/sections/about-values";
import { AboutQuote } from "@/components/sections/about-quote";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Nosotros — Especialistas en salud y bienestar",
  description:
    "POTENARIS es un sistema de crecimiento especializado exclusivamente en clínicas privadas, centros de bienestar y profesionales de la salud. No somos una agencia de marketing generalista.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="No somos una agencia de marketing más."
        description="Somos un equipo especializado en un solo sector, que construye sistemas de crecimiento — no campañas sueltas ni webs bonitas sin propósito."
      />
      <AboutPositioning />
      <AboutNiche />
      <AboutValues />
      <AboutQuote />
      <FinalCta />
    </>
  );
}
