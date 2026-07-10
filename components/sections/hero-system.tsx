"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { CalendarCheck, TrendingUp, MapPin } from "lucide-react";
import { LiveDot } from "@/components/ui/live-dot";
import { SPRING_HEAVY, SPRING_MEDIUM, SPRING_LIGHT } from "@/lib/motion";
import { useScene, useLayer } from "@/lib/parallax";

const weeklyBars = [38, 52, 44, 61, 58, 74, 68];

/**
 * A cluster of independent modules, not one dashboard screenshot — the
 * closest thing to glancing at the actual product running behind the
 * headline. Hero-only; not reused elsewhere, so free to stay this specific.
 *
 * Depth model: the reservations module is nearest (sharpest, largest,
 * heaviest scroll parallax, biggest cursor response). The visibility module
 * sits a step back (slightly smaller, softer shadow, lighter parallax). The
 * notification is a near, fast, transient signal — small and quick.
 */
export function HeroSystem() {
  const { ref, progress } = useScene<HTMLDivElement>();

  const reservationsY = useLayer(progress, 26, SPRING_HEAVY);
  const visibilityY = useLayer(progress, 14, SPRING_MEDIUM);
  const notifY = useLayer(progress, 10, SPRING_LIGHT);

  // Cursor presence — one shared reading, weighted differently per module
  // so the nearest panel answers most and the farthest barely moves.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const near = {
    x: useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), SPRING_HEAVY),
    y: useSpring(useTransform(my, [-0.5, 0.5], [-4, 4]), SPRING_HEAVY),
  };
  const far = {
    x: useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), SPRING_MEDIUM),
    y: useSpring(useTransform(my, [-0.5, 0.5], [-2, 2]), SPRING_MEDIUM),
  };
  const closest = {
    x: useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), SPRING_LIGHT),
    y: useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), SPRING_LIGHT),
  };

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-[340px] w-[300px] xl:h-[380px] xl:w-[340px]"
    >
      {/* the network — thin lines connecting every module, signal moving along them */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-70"
      >
        <line x1="96" y1="150" x2="150" y2="204" stroke="var(--color-border-strong)" strokeWidth="1" />
        <line x1="210" y1="40" x2="150" y2="90" stroke="var(--color-border-strong)" strokeWidth="1" />
        <motion.circle
          r="2.5"
          fill="var(--color-accent-400)"
          animate={{ cx: [96, 150], cy: [150, 204], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          r="2"
          fill="var(--color-accent-300)"
          animate={{ cx: [210, 150], cy: [40, 90], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut", delay: 0.6 }}
        />
      </svg>

      {/* module 01 — reservations, nearest, the anchor of the cluster */}
      <motion.div
        style={{ y: reservationsY, x: near.x, translateY: near.y }}
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float-a absolute left-0 top-10 z-30 w-[220px]"
      >
        <div className="glass-panel bg-noise rounded-[22px] p-4 shadow-[var(--shadow-elevated)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-faint">
                Sistema de reservas
              </p>
              <p className="mt-1 font-display text-[15px] text-fg">Clínica Vitalis</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent-400">
              <LiveDot />
              En vivo
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between rounded-2xl border border-border bg-surface-900/60 p-3">
            <div>
              <p className="text-[20px] font-medium leading-none text-fg">128</p>
              <p className="mt-1.5 text-[10.5px] text-fg-muted">reservas / semana</p>
              <p className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] text-accent-400">
                <TrendingUp className="size-2.5" /> +24%
              </p>
            </div>
            <div className="flex h-[42px] items-end gap-1">
              {weeklyBars.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 1.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-[5px] rounded-full ${
                    i === weeklyBars.length - 1 ? "bg-accent-400" : "bg-surface-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* module 02 — local visibility, a step further back */}
      <motion.div
        style={{ y: visibilityY, x: far.x, translateY: far.y }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 0.94 }}
        transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float-b absolute left-[100px] top-[204px] z-20 w-[210px]"
      >
        <div className="glass-panel rounded-[20px] p-3.5 shadow-[var(--shadow-ambient)]">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
              <MapPin className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[11px] text-fg-muted">Visibilidad local</p>
                <p className="font-mono text-[10.5px] text-fg">92/100</p>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.2, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* module 03 — automation event, nearest and quickest to appear */}
      <motion.div
        style={{ y: notifY, x: closest.x, translateY: closest.y }}
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="animate-float-c absolute right-0 top-0 z-40 w-[216px]"
      >
        <div className="glass-panel flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-[var(--shadow-elevated)]">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
            <CalendarCheck className="size-3.5" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[11px] font-medium text-fg">Nueva reserva confirmada</p>
            <p className="font-mono text-[9.5px] text-fg-faint">Automatizada · hace 2 min</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
