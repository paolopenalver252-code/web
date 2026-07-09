"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A signal traveling along a line — the visual proof that information moves
 * through the system instead of sitting still. Horizontal by default.
 */
export function PulseConnector({
  orientation = "horizontal",
  length = 40,
  delay = 0,
  className,
}: {
  orientation?: "horizontal" | "vertical";
  length?: number;
  delay?: number;
  className?: string;
}) {
  const horizontal = orientation === "horizontal";
  return (
    <span
      aria-hidden
      className={cn(
        "relative block bg-border",
        horizontal ? "h-px" : "w-px",
        className
      )}
      style={horizontal ? { width: length } : { height: length }}
    >
      <motion.span
        className={cn(
          "absolute rounded-full bg-accent-400 shadow-[0_0_6px_rgba(79,209,224,0.8)]",
          horizontal ? "top-1/2 size-1 -translate-y-1/2" : "left-1/2 size-1 -translate-x-1/2"
        )}
        animate={
          horizontal
            ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
            : { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "easeInOut",
          delay,
        }}
      />
    </span>
  );
}
