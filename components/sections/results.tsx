"use client";

import { motion } from "framer-motion";
import { Repeat2, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Glow } from "@/components/effects/glow";
import { LiveDot } from "@/components/ui/live-dot";
import { revealUp, viewportOnce, SPRING_HEAVY } from "@/lib/motion";
import { useScene, useLayer } from "@/lib/parallax";

function StatText({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <SpotlightCard className="bg-noise flex h-full flex-col justify-between gap-8 rounded-3xl p-8">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-surface-900/60 text-accent-400">
        <Icon className="size-5" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-medium text-fg">{title}</h3>
        <p className="max-w-[38ch] text-[14px] leading-[1.65] text-fg-muted">{text}</p>
      </div>
    </SpotlightCard>
  );
}

function Stat({
  value,
  title,
  text,
  big = false,
}: {
  value: string;
  title: string;
  text: string;
  big?: boolean;
}) {
  return (
    <SpotlightCard className="bg-noise flex h-full flex-col justify-between gap-8 rounded-3xl p-8">
      <div className="flex flex-col gap-4">
        {big && (
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
            <LiveDot />
            Sistema en vivo
          </span>
        )}
        <span
          className={
            big
              ? "text-gradient-accent font-mono text-[64px] leading-none tracking-tight md:text-[92px]"
              : "text-gradient-fg font-mono text-[40px] leading-none tracking-tight"
          }
        >
          {value}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-medium text-fg">{title}</h3>
        <p className="max-w-[38ch] text-[14px] leading-[1.65] text-fg-muted">{text}</p>
      </div>
    </SpotlightCard>
  );
}

export function Results() {
  const { ref, progress } = useScene<HTMLElement>();
  const glowY = useLayer(progress, 100, SPRING_HEAVY);

  return (
    <section
      ref={ref}
      id="resultados"
      className="relative overflow-hidden py-32 md:py-48"
    >
      <motion.div style={{ y: glowY }}>
        <Glow position="top-left" size="lg" />
      </motion.div>
      <Container className="flex flex-col gap-20 md:gap-24">
        <SectionHeading
          layout="split"
          size="lg"
          eyebrow="Lo que cambia"
          title="No vendemos marketing. Entregamos resultados medibles."
          description="Cada nivel del sistema está diseñado para producir un efecto concreto en el negocio, no solo una mejora estética en su presencia digital."
        />

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <motion.div
              variants={revealUp()}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Stat
                big
                value="+180%"
                title="Más reservas online en 90 días"
                text="Más visibilidad local, más consultas entrantes y más reservas confirmadas — sin depender de quién le recomiende."
              />
            </motion.div>

            <div className="flex flex-col gap-5">
              <motion.div
                variants={revealUp(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex-1"
              >
                <Stat
                  value="−65%"
                  title="Menos trabajo manual"
                  text="Recordatorios, confirmaciones y reservas gestionadas por el sistema, no por usted."
                />
              </motion.div>
              <motion.div
                variants={revealUp(0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex-1"
              >
                <Stat
                  value="92%"
                  title="Renovación del sistema mensual"
                  text="La mayoría de nuestros clientes escala del Nivel 3 al Nivel 4 en menos de seis meses."
                />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <motion.div
              variants={revealUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <StatText
                icon={Repeat2}
                title="Ingresos más predecibles"
                text="Deja de depender de meses buenos y meses flojos: el sistema genera un flujo constante de nuevas reservas."
              />
            </motion.div>
            <motion.div
              variants={revealUp(0.16)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <StatText
                icon={HeartHandshake}
                title="Más pacientes recurrentes"
                text="La reputación cuidada y el seguimiento automático convierten visitas puntuales en pacientes habituales."
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
