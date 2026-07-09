"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { HeroAtmosphere } from "@/components/sections/hero-atmosphere";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { HeroDashboard } from "@/components/sections/hero-dashboard";
import { EASE_SIGNATURE, SPRING_HEAVY, SPRING_LIGHT } from "@/lib/motion";
import { useScrollDrift } from "@/lib/parallax";

const TRUST = [
  { value: "6 años", label: "en marketing sanitario" },
  { value: "40+", label: "clínicas gestionadas" },
  { value: "<2h", label: "tiempo de respuesta" },
  { value: "4.9/5", label: "valoración media" },
];

// The opening sequence: light first, then the message wakes up one line at
// a time. Slower and quieter than a normal section reveal — this is the
// only scene in the product that gets to take its time.
const WAKE = {
  eyebrow: 1.0,
  headline: 1.2,
  subhead: 1.55,
  ctas: 1.8,
  trust: 2.0,
  panel: 2.3,
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useScrollDrift(scrollYProgress, [0, 30], SPRING_LIGHT);
  const panelY = useScrollDrift(scrollYProgress, [0, 100], SPRING_HEAVY);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // The floating panel answers to the cursor — the control-center feels
  // aware of you, not the other way around. Kept tiny and slow on purpose.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), SPRING_HEAVY);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), SPRING_HEAVY);

  function handlePointerMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handlePointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-24 md:pt-36 md:pb-20"
    >
      <HeroAtmosphere />

      {/* a few slow particles — the only continuous motion besides the light itself */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.span
          className="animate-drift-slow absolute left-[6%] top-[22%] size-1.5 rounded-full bg-accent-400/40 blur-[1px]"
          style={{ y: textY }}
        />
        <motion.span
          className="animate-drift absolute left-[12%] bottom-[30%] size-1 rounded-full bg-accent-300/30 blur-[1px]"
          style={{ y: textY }}
        />
      </div>

      <Container className="relative">
        {/* the message — full width, nothing shares this space with it */}
        <motion.div
          style={{ y: textY, opacity: fade }}
          className="flex flex-col items-start gap-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: WAKE.eyebrow, ease: EASE_SIGNATURE }}
          >
            <Eyebrow>Para clínicas y centros de bienestar</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: WAKE.headline, ease: EASE_SIGNATURE }}
            className="font-display text-[46px] font-normal leading-[0.98] tracking-[-0.015em] text-fg sm:text-[64px] lg:text-[84px] xl:text-[100px]"
          >
            El sistema que{" "}
            <span className="text-gradient-accent font-normal italic">
              llena la agenda
            </span>{" "}
            de su clínica.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: WAKE.subhead, ease: EASE_SIGNATURE }}
            className="max-w-[50ch] text-[17px] leading-[1.75] text-fg-muted lg:text-[19px]"
          >
            Visibilidad local, automatización de reservas y reputación digital,
            combinadas en un solo sistema que trabaja mientras usted atiende a sus
            pacientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: WAKE.ctas, ease: EASE_SIGNATURE }}
            className="mt-2 flex flex-wrap items-center gap-4"
          >
            <Button href="/contacto" size="lg" icon>
              Reservar mi auditoría
            </Button>
            <Button href="/#proceso" variant="ghost" size="lg">
              Ver cómo funciona
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: WAKE.trust, ease: EASE_SIGNATURE }}
            className="mt-4 grid w-full max-w-[560px] grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-4"
          >
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col gap-1">
                <span className="font-mono text-[19px] text-fg">{t.value}</span>
                <span className="text-[12px] leading-tight text-fg-faint">{t.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* the system, glimpsed — a supporting fragment, not a competing focal point */}
      <motion.div
        style={{ y: panelY, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: WAKE.panel, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute -right-10 bottom-[6%] hidden w-[300px] opacity-90 lg:block xl:right-[-2%] xl:w-[340px]"
      >
        <div className="pointer-events-auto">
          <HeroDashboard />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.6, duration: 1.2 } }}
        className="absolute inset-x-0 bottom-6 hidden justify-center [@media(min-height:820px)]:md:flex"
      >
        <div className="flex flex-col items-center gap-2 text-fg-faint">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Descubra el sistema</span>
          <span className="relative h-9 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-accent-400"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
