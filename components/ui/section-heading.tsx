"use client";

import { motion } from "framer-motion";
import { revealUp, viewportOnce } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          variants={revealUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <motion.h2
        variants={revealUp(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={cn(
          "font-display text-fg max-w-[22ch] font-normal leading-[1.08] text-balance",
          size === "lg" ? "text-[40px] md:text-[56px]" : "text-[32px] md:text-[42px]"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={revealUp(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            "max-w-[52ch] text-[17px] leading-[1.65] text-fg-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
