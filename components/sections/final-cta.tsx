"use client";

import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { staggerContainer, revealUp, viewportOnce } from "@/lib/motion";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <AmbientBackground />
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center"
        >
          <motion.div variants={revealUp()}>
            <Eyebrow>El siguiente paso</Eyebrow>
          </motion.div>

          <motion.h2
            variants={revealUp()}
            className="font-display text-[38px] font-normal leading-[1.1] text-fg sm:text-[48px] md:text-[56px]"
          >
            Deje de esperar a que el boca a boca haga su trabajo.
          </motion.h2>

          <motion.p
            variants={revealUp()}
            className="max-w-[48ch] text-[17px] leading-[1.7] text-fg-muted"
          >
            Reserve su auditoría de visibilidad y reservas, y sepa exactamente qué le
            está costando pacientes hoy mismo.
          </motion.p>

          <motion.div variants={revealUp()} className="mt-3">
            <Button href="/contacto" size="lg" icon>
              Reservar mi auditoría
            </Button>
          </motion.div>

          <motion.p variants={revealUp()} className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-faint">
            Desde 29€ · Respuesta en menos de 2h laborables
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
