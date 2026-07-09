"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { revealUp, viewportOnce } from "@/lib/motion";

export function AboutNiche() {
  return (
    <section className="relative overflow-hidden border-t border-border py-32 md:py-48">
      <Glow position="top-left" size="md" tone="faint" />
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          size="lg"
          eyebrow="Por qué un solo sector"
          title="La especialización no es una limitación. Es la ventaja."
        />
        <motion.div
          variants={revealUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-6 text-[17px] leading-[1.75] text-fg-muted"
        >
          <p>
            Un centro de bienestar no compite igual que un restaurante. Un paciente no
            reserva una consulta igual que compra un producto online. Por eso trabajamos
            exclusivamente con clínicas privadas, centros de bienestar y profesionales de
            la salud.
          </p>
          <p>
            Conocemos los ciclos de reserva del sector, el lenguaje de confianza que
            necesita un paciente antes de agendar una cita, y las particularidades de la
            reputación en un entorno donde la credibilidad lo es todo.
          </p>
          <p className="text-fg">
            Esa especialización es, precisamente, la razón por la que el sistema
            funciona donde una agencia generalista no llega.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
