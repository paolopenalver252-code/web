"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealUp, staggerContainer, viewportOnce } from "@/lib/motion";

const CAPABILITIES = [
  "SEO local sanitario",
  "Google Business Profile",
  "Automatización WhatsApp / SMS",
  "Cumplimiento RGPD",
  "Gestión de reputación",
  "Reporting mensual",
];

export function Trust() {
  return (
    <section className="relative py-28 md:py-40">
      <Container className="flex flex-col gap-16 md:gap-20">
        <SectionHeading
          eyebrow="Por qué funciona"
          title="Especializados en un solo sector. Nunca dispersos."
          description="No trabajamos con restaurantes, inmobiliarias ni comercio electrónico. Solo con centros de bienestar, clínicas privadas y profesionales de la salud — y esa especialización es, precisamente, la razón por la que el sistema funciona."
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap gap-3"
        >
          {CAPABILITIES.map((c) => (
            <motion.span
              key={c}
              variants={revealUp()}
              className="rounded-full border border-border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-muted"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>

        <motion.blockquote
          variants={revealUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass-panel bg-noise relative overflow-hidden rounded-[32px] px-8 py-14 md:px-16 md:py-20"
        >
          <div
            aria-hidden
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, var(--color-accent-500), transparent 70%)" }}
          />
          <p className="font-display relative max-w-[34ch] text-[26px] font-normal italic leading-[1.35] text-fg md:text-[34px]">
            Un sistema de crecimiento no promete magia. Promete claridad: qué está
            funcionando, qué no, y qué hacer a continuación.
          </p>
          <footer className="relative mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-fg-faint">
            — Equipo POTENARIS
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
