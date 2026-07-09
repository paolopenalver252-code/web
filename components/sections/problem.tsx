"use client";

import { motion } from "framer-motion";
import { Search, Clock, Star, Users, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { staggerContainer, revealUp, viewportOnce } from "@/lib/motion";

const SYMPTOMS = [
  {
    n: "01",
    icon: Users,
    text: "Su agenda depende del boca a boca, no de un sistema que usted controle.",
  },
  {
    n: "02",
    icon: Search,
    text: "Cuando alguien busca su especialidad en Google, aparece antes la competencia.",
  },
  {
    n: "03",
    icon: Clock,
    text: "Pasa horas del día respondiendo mensajes y confirmando citas a mano.",
  },
  {
    n: "04",
    icon: Star,
    text: "Sus reseñas están dispersas, desactualizadas o casi no existen.",
  },
  {
    n: "05",
    icon: TrendingDown,
    text: "Sabe que necesita más visibilidad, pero no sabe por dónde empezar.",
  },
];

export function Problem() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-32 md:py-44 lg:min-h-[115vh]">
      <Glow position="center-left" size="lg" tone="faint" />
      <Container className="flex flex-col gap-20 md:gap-28">
        <SectionHeading
          layout="split"
          eyebrow="¿Le suena familiar?"
          size="lg"
          title="Cinco síntomas de una clínica sin sistema de crecimiento."
          description="No es falta de esfuerzo. Es que la visibilidad, las reservas y la reputación funcionan por separado, en lugar de trabajar como un solo sistema."
          className="lg:pr-[8%]"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col lg:ml-[10%]"
        >
          {SYMPTOMS.map((s, i) => (
            <motion.div
              key={s.n}
              variants={revealUp()}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-border py-8 transition-colors duration-500 hover:bg-surface-900/30 md:gap-10 md:py-10"
            >
              <span className="font-display absolute -left-1 top-1/2 hidden -translate-y-1/2 select-none text-[64px] leading-none text-transparent opacity-0 transition-opacity duration-500 [-webkit-text-stroke:1px_var(--color-border-strong)] group-hover:opacity-100 lg:-left-20 lg:block">
                {s.n}
              </span>
              <span className="font-mono text-[13px] text-fg-faint lg:hidden">{s.n}</span>
              <p
                className={
                  i === 0
                    ? "font-display text-[24px] leading-[1.2] text-fg md:text-[32px]"
                    : "text-[18px] leading-[1.3] text-fg-muted md:text-[21px]"
                }
              >
                {s.text}
              </p>
              <s.icon className="hidden size-5 text-fg-faint transition-colors duration-500 group-hover:text-accent-400 md:block" />
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </motion.div>

        <motion.p
          variants={revealUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-display max-w-[26ch] text-[26px] italic leading-[1.25] text-fg-muted md:text-[34px] lg:ml-[10%]"
        >
          Si algo de esto le resulta familiar, no le falta esfuerzo.
          <span className="text-fg"> Le falta un sistema.</span>
        </motion.p>
      </Container>
    </section>
  );
}
