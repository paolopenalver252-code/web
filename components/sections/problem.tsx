"use client";

import { motion } from "framer-motion";
import { Search, Clock, Star, Users, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section className="relative py-28 md:py-40">
      <Container className="flex flex-col gap-16 md:gap-20">
        <SectionHeading
          eyebrow="¿Le suena familiar?"
          title="Cinco síntomas de una clínica sin sistema de crecimiento."
          description="No es falta de esfuerzo. Es que la visibilidad, las reservas y la reputación funcionan por separado, en lugar de trabajar como un solo sistema."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col"
        >
          {SYMPTOMS.map((s, i) => (
            <motion.div
              key={s.n}
              variants={revealUp()}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-t border-border py-7 transition-colors duration-500 hover:bg-surface-900/30 md:gap-10 md:py-8"
            >
              <span className="font-mono text-[13px] text-fg-faint">{s.n}</span>
              <p
                className={
                  i === 0
                    ? "font-display text-[22px] leading-snug text-fg md:text-[28px]"
                    : "text-[17px] leading-snug text-fg-muted md:text-[19px]"
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
          className="max-w-[52ch] font-display text-[22px] italic leading-snug text-fg-muted md:text-[26px]"
        >
          Si algo de esto le resulta familiar, no le falta esfuerzo.
          <span className="text-fg"> Le falta un sistema.</span>
        </motion.p>
      </Container>
    </section>
  );
}
