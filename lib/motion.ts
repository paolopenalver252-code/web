import type { Transition, Variants } from "framer-motion";

/**
 * POTENARIS motion primitives.
 * Every curve decelerates like a physical object settling into place —
 * never linear, never robotic, never bouncy.
 */

export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const; // confident, decisive settle
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const; // gentle, ambient
export const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const; // standard exit

export const durations = {
  instant: 0.2,
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  ambient: 2.4,
} as const;

export const revealUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durations.slow,
      delay,
      ease: EASE_SIGNATURE,
    } satisfies Transition,
  },
});

export const revealFade = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.slow, delay, ease: EASE_SOFT } satisfies Transition,
  },
});

export const revealScale = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: durations.slow, delay, ease: EASE_SIGNATURE } satisfies Transition,
  },
});

/** A subtle camera "push in" — used for headings, so scenes feel entered, not pasted. */
export const revealCamera = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20, scale: 0.985, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: durations.slow,
      delay,
      ease: EASE_SIGNATURE,
    } satisfies Transition,
  },
});

export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

/**
 * Spring weight classes — heavier objects lag more and settle slower.
 * Used to give scroll-linked parallax a sense of physical inertia
 * instead of moving in lockstep with the raw scroll value.
 */
export const SPRING_HEAVY = { stiffness: 55, damping: 20, mass: 1.4 } as const;
export const SPRING_MEDIUM = { stiffness: 90, damping: 22, mass: 1 } as const;
export const SPRING_LIGHT = { stiffness: 140, damping: 24, mass: 0.6 } as const;
