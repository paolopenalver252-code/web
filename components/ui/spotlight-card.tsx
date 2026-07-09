"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A material surface that softly acknowledges the cursor —
 * an ambient highlight, never a spotlight. Reactive Motion, Level 3.
 */
export function SpotlightCard({
  children,
  className,
  tilt = false,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const background = useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%, rgba(126,227,232,0.14), transparent 70%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    mx.set(px);
    my.set(py);
    if (tilt) {
      ry.set(((px - 50) / 50) * 4);
      rx.set(((50 - py) / 50) * 4);
    }
  }

  function handleLeave() {
    if (tilt) {
      rx.set(0);
      ry.set(0);
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={cn(
        "group/spotlight glass-panel relative overflow-hidden rounded-3xl",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
