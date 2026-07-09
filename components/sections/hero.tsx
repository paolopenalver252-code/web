"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroAtmosphere } from "@/components/sections/hero-atmosphere";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { HeroDashboard } from "@/components/sections/hero-dashboard";
import { EASE_SIGNATURE, SPRING_LIGHT } from "@/lib/motion";
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
  deck: 1.7,
  ctas: 1.9,
  trust: 2.1,
  panel: 2.3,
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useScrollDrift(scrollYProgress, [0, 30], SPRING_LIGHT);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-40 pb-32 md:pt-48 md:pb-24"
    >
      <HeroAtmosphere />

      {/* a couple of slow particles — the only continuous motion besides the light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.span
          className="animate-drift-slow absolute left-[5%] top-[20%] size-1.5 rounded-full bg-accent-400/40 blur-[1px]"
          style={{ y: textY }}
        />
        <motion.span
          className="animate-drift absolute right-[8%] top-[36%] size-1 rounded-full bg-accent-300/30 blur-[1px]"
        />
      </div>

      <Container className="relative">
        <motion.div style={{ y: textY, opacity: fade }} className="flex flex-col">
          {/* the headline — undivided, full width, nothing else shares this space */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: WAKE.eyebrow, ease: EASE_SIGNATURE }}
          >
            <Eyebrow>Para clínicas y centros de bienestar</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: WAKE.headline, ease: EASE_SIGNATURE }}
            className="font-display mt-6 text-[52px] font-normal leading-[1.02] tracking-[-0.02em] text-fg sm:text-[72px] md:text-[92px] lg:text-[116px] xl:text-[136px]"
          >
            El sistema que{" "}
            <span className="text-gradient-accent font-normal italic">
              llena la agenda
            </span>{" "}
            de su clínica.
          </motion.h1>

          {/* the lower band — deliberately asymmetric: a denser left column
              carries the deck, CTA and proof; a lighter, isolated column on
              the right holds the system glimpse. Neither ever touches the
              headline above — they live entirely below it in normal flow. */}
          <div className="mt-16 grid grid-cols-1 items-start gap-14 md:mt-20 lg:mt-28 lg:grid-cols-[1.3fr_1fr] lg:gap-10 xl:gap-16">
            <div className="flex flex-col items-start gap-8 lg:pt-2">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: WAKE.deck, ease: EASE_SIGNATURE }}
                className="max-w-[46ch] text-[17px] leading-[1.75] text-fg-muted lg:text-[18px]"
              >
                Visibilidad local, automatización de reservas y reputación digital,
                combinadas en un solo sistema que trabaja mientras usted atiende a sus
                pacientes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: WAKE.ctas, ease: EASE_SIGNATURE }}
                className="flex flex-wrap items-center gap-5"
              >
                <Button
                  href="/contacto"
                  size="lg"
                  icon
                  className="h-16 px-10 text-[16px] tracking-[0.005em] duration-700"
                >
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
                className="mt-6 grid w-full max-w-[520px] grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-4"
              >
                {TRUST.map((t) => (
                  <div key={t.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[18px] text-fg">{t.value}</span>
                    <span className="text-[11.5px] leading-tight text-fg-faint">{t.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* the system, glimpsed — framed by space, not overlapping anything */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: WAKE.panel, ease: EASE_SIGNATURE }}
              className="hidden lg:flex lg:justify-end"
            >
              <div className="relative pl-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-[calc(100%-8px)] w-px bg-gradient-to-b from-border via-border to-transparent"
                />
                <HeroDashboard />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* continuation cue — a breathing light at the edge, never an icon */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 2.8 }}
        className="animate-hero-breathe pointer-events-none absolute inset-x-0 bottom-0 h-44"
        style={{
          background:
            "linear-gradient(0deg, rgba(79,209,224,0.09) 0%, rgba(79,209,224,0) 100%)",
        }}
      />
    </section>
  );
}
