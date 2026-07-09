"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/effects/glow";
import { revealUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    n: "01",
    title: "Claridad",
    text: "Explicamos qué hacemos y por qué, sin jerga de marketing vacía.",
    offset: "",
  },
  {
    n: "02",
    title: "Sistemas, no parches",
    text: "Cada pieza que construimos se conecta con las demás. Nada queda aislado.",
    offset: "lg:mt-12",
  },
  {
    n: "03",
    title: "Datos sobre opiniones",
    text: "Decidimos con métricas reales, no con intuición ni tendencias de temporada.",
    offset: "lg:mt-4",
  },
  {
    n: "04",
    title: "Resultados medibles",
    text: "Si un resultado no se puede medir, no lo llamamos crecimiento.",
    offset: "lg:mt-20",
  },
];

export function AboutValues() {
  return (
    <section className="relative overflow-hidden border-t border-border py-32 md:py-48">
      <Glow position="bottom-right" size="md" tone="faint" />
      <Container className="flex flex-col gap-20">
        <SectionHeading
          size="lg"
          align="center"
          eyebrow="Cómo trabajamos"
          title="Cuatro principios que no negociamos."
          className="mx-auto"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.n}
              variants={revealUp(i * 0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className={cn("flex flex-col gap-4 border-t border-border pt-6", v.offset)}
            >
              <span className="font-mono text-[12px] text-accent-400">{v.n}</span>
              <h3 className="font-display text-[19px] text-fg">{v.title}</h3>
              <p className="text-[14px] leading-[1.65] text-fg-muted">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
