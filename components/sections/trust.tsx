"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { revealUp, staggerContainer, viewportOnce, SPRING_HEAVY } from "@/lib/motion";
import { useScene, useLayer } from "@/lib/parallax";

const CAPABILITIES = [
  "SEO local sanitario",
  "Google Business Profile",
  "Automatización WhatsApp / SMS",
  "Cumplimiento RGPD",
  "Gestión de reputación",
  "Reporting mensual",
];

export function Trust() {
  const { ref, progress } = useScene<HTMLElement>();
  const glowY = useLayer(progress, 140, SPRING_HEAVY);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center overflow-hidden py-32 md:py-48 lg:min-h-[135vh]"
    >
      <motion.div style={{ y: glowY }}>
        <Glow position="center-right" size="xl" />
      </motion.div>
      <Container className="flex flex-col gap-24 md:gap-32">
        <SectionHeading
          layout="split"
          size="md"
          eyebrow="Por qué funciona"
          title="Especializados en un solo sector. Nunca dispersos."
          description="No trabajamos con restaurantes, inmobiliarias ni comercio electrónico. Solo con centros de bienestar, clínicas privadas y profesionales de la salud — y esa especialización es, precisamente, la razón por la que el sistema funciona."
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap gap-3 lg:ml-[10%]"
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
          className="relative flex flex-col gap-8 lg:ml-[18%] lg:mt-8"
        >
          <p className="font-display max-w-[24ch] text-[34px] font-normal italic leading-[1.15] text-fg sm:text-[46px] md:text-[60px] lg:text-[68px]">
            Un sistema de crecimiento no promete magia. Promete claridad: qué
            está funcionando, qué no, y qué hacer a continuación.
          </p>
          <footer className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em] text-fg-faint">
            <span className="h-px w-10 bg-border" />
            — Equipo POTENARIS
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
