"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mqHover = window.matchMedia(QUERY);
  const mqReduced = window.matchMedia(REDUCED_QUERY);
  mqHover.addEventListener("change", callback);
  mqReduced.addEventListener("change", callback);
  return () => {
    mqHover.removeEventListener("change", callback);
    mqReduced.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches && !window.matchMedia(REDUCED_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * The interface acknowledges the cursor's presence — never dramatically.
 * A single soft light that trails pointer movement across the page.
 */
export function CursorGlow() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

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
