"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HeroAtmosphere } from "@/components/sections/hero-atmosphere";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { HeroSystem } from "@/components/sections/hero-system";
import { EASE_SIGNATURE, SPRING_LIGHT, SPRING_HEAVY } from "@/lib/motion";
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
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useScrollDrift(scrollYProgress, [0, 30], SPRING_LIGHT);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // The camera push: on the very first scroll, the scene advances toward
  // the visitor almost imperceptibly — pulled in, not scrolled past.
  const cameraPush = useSpring(useTransform(scrollYProgress, [0, 0.15], [1, 1.018]), SPRING_HEAVY);

  // The exit: content softens and dissolves well before the section's own
  // edge, so nothing is ever clipped mid-shape — by the time the viewport
  // reaches the next section, the Hero has already receded into the shared
  // atmosphere rather than being cut off.
  const exitBlur = useSpring(useTransform(scrollYProgress, [0.45, 0.8], [0, 10]), SPRING_HEAVY);
  const exitFilter = useTransform(exitBlur, (v) => `blur(${v}px)`);

  // The scene never cuts to the next one — it opens into it. The bottom
  // glow grows as the camera approaches the edge of the Hero, so by the
  // time Problem's own content begins, the light is already continuous.
  const cueOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.55, 1]), SPRING_HEAVY);
  const cueHeight = useSpring(useTransform(scrollYProgress, [0, 1], [176, 340]), SPRING_HEAVY);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-40 pb-32 md:pt-48 md:pb-24"
    >
      <HeroAtmosphere progress={scrollYProgress} />

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
        <motion.div
          style={{ y: textY, opacity: fade, scale: cameraPush, filter: exitFilter }}
          className="flex flex-col"
        >
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

            {/* the system, glimpsed — a living cluster, framed by space */}
            <div className="hidden lg:flex lg:justify-end">
              <HeroSystem />
            </div>
          </div>
        </motion.div>
      </Container>

      {/* continuation cue — the light grows toward the edge as the camera
          approaches it, so the next scene opens rather than cuts in */}
      <motion.div
        aria-hidden
        style={{ opacity: cueOpacity, height: cueHeight }}
        className="pointer-events-none absolute inset-x-0 bottom-0"
      >
        <div
          className="animate-hero-breathe size-full"
          style={{
            background:
              "linear-gradient(0deg, transparent 0%, rgba(79,209,224,0.12) 45%, transparent 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}
