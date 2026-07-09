"use client";

import { motion } from "framer-motion";

/**
 * The opening scene's environment — built only for the Hero, never shared.
 * The system is not loading. It is waking up: darkness first, then a slow
 * breath of light before anything else is allowed to appear.
 */
export function HeroAtmosphere() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* primary light source — large, slow, barely there */}
      <div
        className="animate-hero-breathe absolute left-1/2 top-[-30%] h-[85vw] w-[85vw] max-h-[1100px] max-w-[1100px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{
          background: "radial-gradient(circle, rgba(79,209,224,0.85) 0%, rgba(79,209,224,0) 68%)",
        }}
      />
      {/* secondary source, offset phase, so the light never feels like one pulse */}
      <div
        className="animate-hero-breathe-slow absolute right-[-15%] bottom-[-25%] h-[60vw] w-[60vw] max-h-[760px] max-w-[760px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(79,209,224,0.7) 0%, rgba(79,209,224,0) 70%)",
          animationDelay: "-7s",
        }}
      />

      {/* depth wash — keeps the upper scene darker, so light reads as emerging */}
      <div
        className="absolute inset-x-0 top-0 h-[70%] opacity-70"
        style={{
          background: "linear-gradient(180deg, rgba(15,21,34,0.6) 0%, rgba(5,7,11,0) 100%)",
        }}
      />

      {/* vignette — holds the eye centrally, deepest at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 15%, transparent 35%, rgba(5,7,11,0.78) 100%)",
        }}
      />

      {/* grain — moving almost imperceptibly, the one thing that never sits still */}
      <div className="animate-hero-grain absolute inset-[-10%] opacity-[0.05] mix-blend-overlay">
        <div className="bg-noise absolute inset-0" />
      </div>
    </motion.div>
  );
}
