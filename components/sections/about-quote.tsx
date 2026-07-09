"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/effects/glow";
import { revealUp, viewportOnce } from "@/lib/motion";

export function AboutQuote() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-32 md:py-48 lg:min-h-[90vh]">
      <Glow position="top-center" size="lg" tone="faint" />
      <Container>
        <motion.blockquote
          variants={revealUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-[880px] flex-col items-center gap-9 text-center"
        >
          <p className="font-display text-[30px] font-normal italic leading-[1.3] text-fg sm:text-[40px] md:text-[48px]">
            No creemos en agencias que prometen resultados en una semana. Creemos en
            sistemas que, mes a mes, hacen que su agenda dependa cada vez menos de la
            suerte.
          </p>
          <footer className="font-mono text-[12px] uppercase tracking-[0.16em] text-fg-faint">
            — Equipo POTENARIS
          </footer>
        </motion.blockquote>
      </Container>
    </section>
  );
}
