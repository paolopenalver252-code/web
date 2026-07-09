"use client";

import { motion } from "framer-motion";
import { CalendarCheck, TrendingUp, MapPin } from "lucide-react";
import { LiveDot } from "@/components/ui/live-dot";

const weeklyBars = [38, 52, 44, 61, 58, 74, 68];

/**
 * A condensed glimpse of the system — not the full product screenshot.
 * Scoped to the Hero only: small enough to frame the headline, never to
 * compete with it. If the full dashboard is ever needed elsewhere, build
 * that as its own component rather than expanding this one.
 */
export function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[300px]">
      {/* floating notification — automation proof */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel animate-breathe absolute -top-5 right-3 z-20 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 shadow-[var(--shadow-elevated)] sm:-right-5 sm:-top-6"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
          <CalendarCheck className="size-3.5" />
        </span>
        <div className="leading-tight">
          <p className="text-[11.5px] font-medium text-fg">Nueva reserva confirmada</p>
          <p className="font-mono text-[10px] text-fg-faint">Automatizada · hace 2 min</p>
        </div>

        {/* the signal — this event is flowing down into the system below */}
        <span
          aria-hidden
          className="absolute -bottom-6 left-7 h-6 w-px bg-gradient-to-b from-accent-400/70 to-transparent"
        >
          <motion.span
            className="absolute left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent-300"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn", delay: 2.3 }}
          />
        </span>
      </motion.div>

      {/* the panel — header, one live stat, one signal. Nothing more. */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel bg-noise relative overflow-hidden rounded-[24px] p-5 shadow-[var(--shadow-elevated)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-faint">
              Sistema de reservas
            </p>
            <p className="mt-1 font-display text-[16px] text-fg">Clínica Vitalis</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-400">
            <LiveDot />
            En vivo
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between rounded-2xl border border-border bg-surface-900/60 p-3.5">
          <div>
            <p className="text-[22px] font-medium leading-none text-fg">128</p>
            <p className="mt-1.5 text-[11px] text-fg-muted">reservas / semana</p>
            <p className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10.5px] text-accent-400">
              <TrendingUp className="size-3" /> +24%
            </p>
          </div>
          <div className="flex h-[48px] items-end gap-1.5">
            {weeklyBars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{
                  duration: 0.8,
                  delay: 1.4 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`w-[6px] rounded-full ${
                  i === weeklyBars.length - 1 ? "bg-accent-400" : "bg-surface-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-surface-900/60 p-3.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
            <MapPin className="size-3.5" />
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] text-fg-muted">Visibilidad local</p>
              <p className="font-mono text-[11px] text-fg">92/100</p>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
