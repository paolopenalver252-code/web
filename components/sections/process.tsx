"use client";

import { motion, type Variants } from "framer-motion";
import { Search, Layers, Cog, LineChart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { PulseConnector } from "@/components/ui/pulse-connector";
import {
  revealUp,
  viewportOnce,
  SPRING_LIGHT,
  SPRING_MEDIUM,
  SPRING_HEAVY,
  EASE_SIGNATURE,
} from "@/lib/motion";
import { useScene, useLayer } from "@/lib/parallax";
import { cn } from "@/lib/utils";

const iconActivate: Variants = {
  dim: { borderColor: "var(--color-border)", boxShadow: "0 0 0 rgba(79,209,224,0)" },
  active: {
    borderColor: "var(--color-border-accent)",
    boxShadow: "0 0 24px -6px rgba(79,209,224,0.5)",
    transition: { duration: 0.9, delay: 0.3, ease: EASE_SIGNATURE },
  },
};

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
  const { ref, progress } = useScene<HTMLElement>();

  // Each ghost numeral drifts at its own speed — literal slow/medium/fast
  // depth layers, so the columns never feel like one flat plane.
  const depth0 = useLayer(progress, 30, SPRING_LIGHT);
  const depth1 = useLayer(progress, 90, SPRING_HEAVY);
  const depth2 = useLayer(progress, 55, SPRING_MEDIUM);
  const depth3 = useLayer(progress, 110, SPRING_HEAVY);
  const depths = [depth0, depth1, depth2, depth3];

  return (
    <section
      ref={ref}
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
              <motion.span
                aria-hidden
                style={{ y: depths[i] }}
                className="font-display pointer-events-none absolute -top-16 -left-2 select-none text-[128px] leading-none text-transparent opacity-80 [-webkit-text-stroke:1px_var(--color-border-strong)] md:text-[150px]"
              >
                {step.n}
              </motion.span>

              <div className="relative flex flex-col gap-5 pt-20 md:pt-24">
                <motion.span
                  variants={iconActivate}
                  initial="dim"
                  whileInView="active"
                  viewport={viewportOnce}
                  className="flex size-12 items-center justify-center rounded-2xl border bg-surface-900/60 text-accent-400"
                >
                  <step.icon className="size-5" />
                </motion.span>
                <h3 className="font-display text-[22px] text-fg">{step.title}</h3>
                <p className="max-w-[30ch] text-[15px] leading-[1.75] text-fg-muted">
                  {step.text}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="absolute right-[-25px] top-[112px] hidden md:block">
                  <PulseConnector length={40} delay={i * 0.3} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
