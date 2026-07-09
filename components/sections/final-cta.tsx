"use client";

import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { staggerContainer, revealUp, viewportOnce } from "@/lib/motion";

export function FinalCta() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-40 md:py-56 lg:min-h-[100vh]">
      <AmbientBackground />
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-[760px] flex-col items-center gap-8 text-center"
        >
          <motion.div variants={revealUp()}>
            <Eyebrow>El siguiente paso</Eyebrow>
          </motion.div>

          <motion.h2
            variants={revealUp()}
            className="font-display max-w-[16ch] text-[42px] font-normal leading-[1.03] text-fg sm:text-[58px] md:text-[72px]"
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
