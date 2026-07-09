"use client";

import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { staggerContainer, revealUp } from "@/lib/motion";

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      <AmbientBackground variant="hero" />
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
          className={
            align === "center"
              ? "mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center"
              : "flex max-w-[680px] flex-col items-start gap-6"
          }
        >
          <motion.div variants={revealUp()}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={revealUp()}
            className="font-display text-[38px] font-normal leading-[1.08] text-fg sm:text-[48px] md:text-[56px]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={revealUp()}
              className="max-w-[54ch] text-[17px] leading-[1.7] text-fg-muted"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
