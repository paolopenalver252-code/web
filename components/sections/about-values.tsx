"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealUp, viewportOnce } from "@/lib/motion";

const VALUES = [
  {
    n: "01",
    title: "Claridad",
    text: "Explicamos qué hacemos y por qué, sin jerga de marketing vacía.",
  },
  {
    n: "02",
    title: "Sistemas, no parches",
    text: "Cada pieza que construimos se conecta con las demás. Nada queda aislado.",
  },
  {
    n: "03",
    title: "Datos sobre opiniones",
    text: "Decidimos con métricas reales, no con intuición ni tendencias de temporada.",
  },
  {
    n: "04",
    title: "Resultados medibles",
    text: "Si un resultado no se puede medir, no lo llamamos crecimiento.",
  },
];

export function AboutValues() {
  return (
    <section className="relative border-t border-border py-28 md:py-40">
      <Container className="flex flex-col gap-16">
        <SectionHeading eyebrow="Cómo trabajamos" title="Cuatro principios que no negociamos." />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.n}
              variants={revealUp(i * 0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col gap-4 border-t border-border pt-6"
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
