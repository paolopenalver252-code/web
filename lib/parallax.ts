"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { SPRING_MEDIUM } from "@/lib/motion";

type SpringConfig = { stiffness: number; damping: number; mass: number };

/**
 * Tracks a section's position relative to the viewport as the user scrolls
 * through it — the raw signal the "camera" reads to drive every layer inside.
 */
export function useScene<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, progress: scrollYProgress };
}

/**
 * Derives a scroll-linked vertical drift with physical inertia (a spring,
 * not a 1:1 scroll tie). Respects prefers-reduced-motion by collapsing the
 * range to zero — MotionConfig's reducedMotion setting only degrades
 * declarative animate/whileInView animations, never manual scroll values,
 * so parallax has to check it explicitly.
 */
export function useScrollDrift(
  progress: MotionValue<number>,
  range: [number, number],
  spring: SpringConfig = SPRING_MEDIUM
) {
  const reduced = useReducedMotion();
  const effectiveRange: [number, number] = reduced ? [0, 0] : range;
  const raw = useTransform(progress, [0, 1], effectiveRange);
  return useSpring(raw, spring);
}

/**
 * Symmetric depth layer: travels `distance` px each direction across the
 * scene. Heavier springs lag behind lighter ones, so layers separate from
 * each other instead of moving as one flat plane.
 */
export function useLayer(
  progress: MotionValue<number>,
  distance: number,
  spring: SpringConfig = SPRING_MEDIUM
) {
  return useScrollDrift(progress, [distance, -distance], spring);
}
