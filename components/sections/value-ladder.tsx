"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Glow } from "@/components/effects/glow";
import { revealUp, staggerContainer, viewportOnce, SPRING_MEDIUM } from "@/lib/motion";
import { SERVICE_LEVELS } from "@/lib/services";
import { cn } from "@/lib/utils";
import { useRef } from "react";

function CardOrPlain({
  featured,
  children,
}: {
  featured?: boolean;
  children: React.ReactNode;
}) {
  if (featured) {
    return (
      <SpotlightCard className="bg-noise grid grid-cols-1 gap-8 rounded-3xl border-border-accent p-8 shadow-[var(--shadow-ambient)] lg:grid-cols-[1.1fr_1fr] lg:p-10">
        {children}
      </SpotlightCard>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">{children}</div>
  );
}

export function ValueLadder() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: railProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });
  const reduced = useReducedMotion();
  const railFill = useSpring(
    railProgress,
    reduced ? { stiffness: 1000, damping: 100, mass: 0.1 } : SPRING_MEDIUM
  );

  // Each node "wakes up" as the light reaches it — four fixed thresholds
  // evenly spaced along the rail, one per level.
  const active0 = useTransform(railProgress, [0.03, 0.14], [0, 1]);
  const active1 = useTransform(railProgress, [0.28, 0.39], [0, 1]);
  const active2 = useTransform(railProgress, [0.53, 0.64], [0, 1]);
  const active3 = useTransform(railProgress, [0.78, 0.89], [0, 1]);
  const activation = [active0, active1, active2, active3];

  return (
    <section id="sistema" className="relative overflow-hidden py-32 md:py-48">
      <Glow position="top-right" size="lg" />
      <Container className="flex flex-col gap-20 md:gap-28">
        <SectionHeading
          layout="split"
          size="lg"
          eyebrow="El sistema de cuatro niveles"
          title="Empiece pequeño. Vea resultados. Escale con confianza."
          description="Cada nivel resuelve un problema concreto y prepara el terreno para el siguiente. No son servicios sueltos: son los pasos de un mismo sistema de crecimiento."
        />

        <div ref={railRef} className="relative flex flex-col">
          {/* connecting rail — the track */}
          <div
            aria-hidden
            className="absolute left-[19px] top-3 bottom-3 hidden w-px bg-border md:block"
          />
          {/* the light that travels down it as you scroll through the system */}
          <motion.div
            aria-hidden
            style={{ scaleY: railFill }}
            className="absolute left-[19px] top-3 bottom-3 hidden w-px origin-top bg-gradient-to-b from-accent-400 to-accent-600 shadow-[0_0_12px_rgba(79,209,224,0.6)] md:block"
          />

          {SERVICE_LEVELS.map((level, i) => (
            <motion.div
              key={level.id}
              id={level.id}
              variants={revealUp()}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={cn(
                "relative grid grid-cols-1 gap-6 py-12 transition-colors duration-500 md:grid-cols-[40px_1fr] md:gap-10 md:py-16",
                i !== SERVICE_LEVELS.length - 1 && "border-b border-border",
                !level.featured && "hover:bg-surface-900/20"
              )}
            >
              <div className="hidden md:block">
                <span
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-[12px]",
                    level.featured
                      ? "border-accent-400 bg-accent-500/15 text-accent-300 shadow-[var(--shadow-glow-accent)]"
                      : "border-border-strong bg-surface-900 text-fg-subtle"
                  )}
                >
                  {level.n}
                  {!level.featured && (
                    <motion.span
                      aria-hidden
                      style={{ opacity: activation[i] }}
                      className="absolute inset-0 rounded-full border border-accent-400 shadow-[var(--shadow-glow-accent)]"
                    />
                  )}
                </span>
              </div>

              <CardOrPlain featured={level.featured}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 md:hidden">
                    <span className="font-mono text-[12px] text-fg-faint">{level.n}</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
                    {level.tag}
                  </span>
                  <h3 className="font-display text-[28px] leading-[1.08] text-fg md:text-[36px]">
                    {level.name}
                  </h3>
                  <p className="max-w-[42ch] text-[15.5px] leading-[1.7] text-fg-muted">
                    {level.goal}
                  </p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-mono text-[22px] text-fg">{level.priceRange}</span>
                    {level.priceSuffix && (
                      <span className="font-mono text-[14px] text-fg-faint">
                        {level.priceSuffix}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <ul className="flex flex-col gap-3.5">
                    {level.outcomes.slice(0, 3).map((o) => (
                      <li key={o} className="flex items-start gap-3 text-[14.5px] text-fg-muted">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-400" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Button
                      href={level.ctaHref}
                      variant={level.featured ? "primary" : "secondary"}
                      icon
                    >
                      {level.ctaLabel}
                    </Button>
                  </div>
                </div>
              </CardOrPlain>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface-900/40 p-8 md:flex-row md:items-center md:p-10"
        >
          <motion.p variants={revealUp()} className="max-w-[46ch] text-[16px] text-fg-muted">
            ¿No sabe en qué nivel empezar? La auditoría se lo dice con datos, no con
            suposiciones.
          </motion.p>
          <motion.div variants={revealUp()}>
            <Button href="/servicios" variant="secondary" icon>
              Ver todos los servicios
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
