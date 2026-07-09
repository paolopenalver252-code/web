"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * The interface acknowledges the cursor's presence — never dramatically.
 * A single soft light that trails pointer movement across the page.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(79,209,224,0.05) 0%, rgba(79,209,224,0) 70%)",
      }}
    />
  );
}
