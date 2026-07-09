"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section className="relative py-28 md:py-40">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Posicionamiento"
          title="Lo que no hacemos, a propósito."
          description="La claridad sobre lo que no somos es la mejor forma de entender lo que sí somos."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-5 rounded-3xl border border-border p-8 md:p-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
              No somos
            </span>
            {NOT.map((item) => (
              <motion.div key={item} variants={revealUp()} className="flex items-start gap-3">
                <X className="mt-0.5 size-4 shrink-0 text-fg-faint" />
                <p className="text-[15.5px] leading-[1.65] text-fg-muted">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass-panel bg-noise flex flex-col gap-5 rounded-3xl p-8 md:p-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
              Somos
            </span>
            {ARE.map((item) => (
              <motion.div key={item} variants={revealUp()} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <p className="text-[15.5px] leading-[1.65] text-fg">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
