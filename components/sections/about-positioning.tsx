"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { revealUp, staggerContainer, viewportOnce } from "@/lib/motion";

const NOT = [
  "Diseñadores freelance que entregan una web y desaparecen",
  "Gestores de redes sociales sin conexión con sus reservas",
  "Una agencia generalista que trabaja con cualquier sector",
];

const ARE = [
  "Un sistema de crecimiento integrado: visibilidad, automatización y reputación conectadas",
  "Especialistas exclusivos en salud, bienestar y clínicas privadas",
  "Un socio que mide resultados de negocio, no solo métricas de vanidad",
];

export function AboutPositioning() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <Glow position="top-right" size="lg" tone="faint" />
      <Container className="flex flex-col gap-20 md:gap-28">
        <SectionHeading
          layout="split"
          size="lg"
          eyebrow="Posicionamiento"
          title="Lo que no hacemos, a propósito."
          description="La claridad sobre lo que no somos es la mejor forma de entender lo que sí somos."
        />

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-7 border-t border-border pt-8"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
              No somos
            </span>
            {NOT.map((item) => (
              <motion.div key={item} variants={revealUp()} className="flex items-start gap-3">
                <X className="mt-0.5 size-4 shrink-0 text-fg-faint" />
                <p className="max-w-[34ch] text-[16px] leading-[1.7] text-fg-muted">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass-panel bg-noise flex flex-col gap-7 rounded-[28px] p-9 md:mt-14 md:p-11"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
              Somos
            </span>
            {ARE.map((item) => (
              <motion.div key={item} variants={revealUp()} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <p className="max-w-[34ch] text-[16px] leading-[1.7] text-fg">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
