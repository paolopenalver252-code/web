"use client";

import { motion } from "framer-motion";
import { Search, Layers, Cog, LineChart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { revealUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico",
    text: "Auditamos su presencia digital actual y detectamos exactamente qué le está costando reservas.",
    offset: "md:mt-0",
  },
  {
    n: "02",
    icon: Layers,
    title: "Diseño del sistema",
    text: "Diseñamos el sistema que su clínica necesita: presencia, automatización, o ambas combinadas.",
    offset: "md:mt-20",
  },
  {
    n: "03",
    icon: Cog,
    title: "Implementación",
    text: "Construimos e integramos cada pieza sin interrumpir su actividad diaria ni su agenda.",
    offset: "md:mt-6",
  },
  {
    n: "04",
    icon: LineChart,
    title: "Crecimiento continuo",
    text: "Medimos resultados reales, ajustamos la estrategia y escalamos el sistema mes a mes.",
    offset: "md:mt-28",
  },
];

export function Process() {
  return (
    <section
      id="proceso"
      className="relative flex flex-col justify-center overflow-hidden py-32 md:py-44 lg:min-h-[100vh]"
    >
      <Glow position="bottom-left" size="md" tone="faint" />
      <Container className="flex flex-col gap-24 md:gap-32">
        <SectionHeading
          align="center"
          size="lg"
          eyebrow="Cómo trabajamos"
          title="Un proceso claro. Nunca una caja negra."
          description="Cada etapa tiene un objetivo concreto y un entregable visible. Usted siempre sabe en qué punto del sistema se encuentra."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              variants={revealUp(i * 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={cn("relative flex flex-col gap-6", step.offset)}
            >
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -top-16 -left-2 select-none text-[128px] leading-none text-transparent opacity-80 [-webkit-text-stroke:1px_var(--color-border-strong)] md:text-[150px]"
              >
                {step.n}
              </span>

              <div className="relative flex flex-col gap-5 pt-20 md:pt-24">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-surface-900/60 text-accent-400">
                  <step.icon className="size-5" />
                </span>
                <h3 className="font-display text-[22px] text-fg">{step.title}</h3>
                <p className="max-w-[30ch] text-[15px] leading-[1.75] text-fg-muted">
                  {step.text}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-21px] top-[120px] hidden h-px w-10 bg-border md:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
