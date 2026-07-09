"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { revealUp, viewportOnce } from "@/lib/motion";

export function AboutQuote() {
  return (
    <section className="relative py-28 md:py-40">
      <Container>
        <motion.blockquote
          variants={revealUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-[820px] flex-col items-center gap-8 text-center"
        >
          <p className="font-display text-[28px] font-normal italic leading-[1.35] text-fg md:text-[38px]">
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
