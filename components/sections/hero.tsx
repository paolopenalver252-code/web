"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { HeroDashboard } from "@/components/sections/hero-dashboard";
import { staggerContainer, revealUp, EASE_SIGNATURE } from "@/lib/motion";

const TRUST = [
  { value: "6 años", label: "en marketing sanitario" },
  { value: "40+", label: "clínicas gestionadas" },
  { value: "<2h", label: "tiempo de respuesta" },
  { value: "4.9/5", label: "valoración media" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center pt-36 pb-24 md:pt-44 md:pb-16"
    >
      <AmbientBackground variant="hero" />

      {/* floating abstract elements — Layer 03 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.div
          className="animate-drift absolute left-[2.5%] top-[16%] size-2 rounded-full bg-accent-400/50 blur-[1px]"
          style={{ y: textY }}
        />
        <motion.div className="animate-drift-slow absolute left-[1.5%] bottom-[14%] size-1.5 rounded-full bg-accent-300/40 blur-[1px]" />
        <svg
          className="animate-drift-slow absolute right-[6%] bottom-[10%] opacity-[0.35]"
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
        >
          <circle cx="70" cy="70" r="69" stroke="var(--color-border-strong)" />
          <circle cx="70" cy="70" r="46" stroke="var(--color-border-strong)" />
        </svg>
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-20 lg:grid-cols-[1fr_0.92fr] lg:gap-6">
        <motion.div
          style={{ y: textY, opacity: fade }}
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-8"
        >
          <motion.div variants={revealUp()}>
            <Eyebrow>Para clínicas y centros de bienestar</Eyebrow>
          </motion.div>

          <motion.h1
            variants={revealUp()}
            className="font-display max-w-[13ch] text-[50px] font-normal leading-[0.98] tracking-[-0.015em] text-fg sm:text-[68px] lg:text-[76px] xl:text-[88px]"
          >
            El sistema que{" "}
            <span className="text-gradient-accent font-normal italic">
              llena la agenda
            </span>{" "}
            de su clínica.
          </motion.h1>

          <motion.p
            variants={revealUp()}
            className="max-w-[40ch] text-[17px] leading-[1.75] text-fg-muted lg:text-[18px]"
          >
            Visibilidad local, automatización de reservas y reputación digital,
            combinadas en un solo sistema que trabaja mientras usted atiende a sus
            pacientes.
          </motion.p>

          <motion.div variants={revealUp()} className="mt-2 flex flex-wrap items-center gap-4">
            <Button href="/contacto" size="lg" icon>
              Reservar mi auditoría
            </Button>
            <Button href="/#proceso" variant="ghost" size="lg">
              Ver cómo funciona
            </Button>
          </motion.div>

          <motion.div
            variants={revealUp()}
            className="mt-6 grid w-full grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-7 sm:grid-cols-4"
          >
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col gap-1">
                <span className="font-mono text-[19px] text-fg">{t.value}</span>
                <span className="text-[12px] leading-tight text-fg-faint">{t.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 0.6, ease: EASE_SIGNATURE } }}
          className="relative flex justify-center lg:justify-end lg:translate-x-4 xl:translate-x-12 2xl:translate-x-20"
        >
          <HeroDashboard />
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2, duration: 1 } }}
        className="absolute inset-x-0 bottom-8 hidden justify-center md:flex"
      >
        <div className="flex flex-col items-center gap-2 text-fg-faint">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Descubra el sistema</span>
          <span className="relative h-9 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-accent-400"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
