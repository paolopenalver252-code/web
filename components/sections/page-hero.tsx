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
    <section className="relative flex min-h-[74vh] flex-col justify-end overflow-hidden pt-40 pb-24 md:pb-32">
      <AmbientBackground variant="hero" />
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
          className={
            align === "center"
              ? "mx-auto flex max-w-[820px] flex-col items-center gap-7 text-center"
              : "flex max-w-[720px] flex-col items-start gap-7"
          }
        >
          <motion.div variants={revealUp()}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={revealUp()}
            className="font-display max-w-[15ch] text-[44px] font-normal leading-[1.0] text-fg sm:text-[60px] md:text-[76px]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={revealUp()}
              className="max-w-[44ch] text-[17px] leading-[1.75] text-fg-muted"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
