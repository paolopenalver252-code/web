"use client";

import { motion } from "framer-motion";
import { Search, Layers, Cog, LineChart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico",
    text: "Auditamos su presencia digital actual y detectamos exactamente qué le está costando reservas.",
  },
  {
    n: "02",
    icon: Layers,
    title: "Diseño del sistema",
    text: "Diseñamos el sistema que su clínica necesita: presencia, automatización, o ambas combinadas.",
  },
  {
    n: "03",
    icon: Cog,
    title: "Implementación",
    text: "Construimos e integramos cada pieza sin interrumpir su actividad diaria ni su agenda.",
  },
  {
    n: "04",
    icon: LineChart,
    title: "Crecimiento continuo",
    text: "Medimos resultados reales, ajustamos la estrategia y escalamos el sistema mes a mes.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative py-28 md:py-40">
      <Container className="flex flex-col gap-20 md:gap-28">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso claro. Nunca una caja negra."
          description="Cada etapa tiene un objetivo concreto y un entregable visible. Usted siempre sabe en qué punto del sistema se encuentra."
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              variants={revealUp(i * 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={cn("relative flex flex-col gap-5", i % 2 === 1 && "md:mt-14")}
            >
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -top-6 -left-1 select-none text-[86px] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-border-strong)]"
              >
                {step.n}
              </span>

              <div className="relative flex flex-col gap-5 pt-14">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-border bg-surface-900/60 text-accent-400">
                  <step.icon className="size-[18px]" />
                </span>
                <h3 className="font-display text-[20px] text-fg">{step.title}</h3>
                <p className="text-[14.5px] leading-[1.7] text-fg-muted">{step.text}</p>
              </div>

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-17px] top-[74px] hidden h-px w-8 bg-border md:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
