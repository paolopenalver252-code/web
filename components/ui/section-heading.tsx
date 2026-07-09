"use client";

import { motion } from "framer-motion";
import { revealUp, revealCamera, viewportOnce } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const sizes = {
  md: "text-[34px] md:text-[46px]",
  lg: "text-[42px] md:text-[62px]",
  xl: "text-[52px] md:text-[84px]",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "md",
  layout = "stack",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  layout?: "stack" | "split";
  className?: string;
  titleClassName?: string;
}) {
  if (layout === "split") {
    return (
      <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6", className)}>
        <div className="flex flex-col gap-5 lg:col-span-7">
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
            variants={revealCamera(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={cn(
              "font-display text-fg max-w-[16ch] font-normal leading-[1.02] text-balance",
              sizes[size],
              titleClassName
            )}
          >
            {title}
          </motion.h2>
        </div>
        {description && (
          <motion.p
            variants={revealUp(0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-[38ch] self-end text-[16.5px] leading-[1.75] text-fg-muted lg:col-span-4 lg:col-start-9"
          >
            {description}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
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
        variants={revealCamera(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={cn(
          "font-display text-fg max-w-[18ch] font-normal leading-[1.04] text-balance",
          sizes[size],
          titleClassName
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
            "max-w-[44ch] text-[16.5px] leading-[1.75] text-fg-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
