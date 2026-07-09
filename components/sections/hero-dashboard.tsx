"use client";

import { motion } from "framer-motion";
import { CalendarCheck, TrendingUp, MapPin } from "lucide-react";
import { LiveDot } from "@/components/ui/live-dot";

const weeklyBars = [38, 52, 44, 61, 58, 74, 68];

const appointments = [
  { initials: "MA", name: "María A.", service: "Consulta inicial", time: "09:30" },
  { initials: "JL", name: "Javier L.", service: "Seguimiento", time: "11:00" },
  { initials: "CR", name: "Carla R.", service: "Fisioterapia", time: "12:15" },
];

export function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[460px]">
      {/* floating notification — automation proof */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel animate-breathe absolute -top-4 right-2 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[var(--shadow-elevated)] sm:-right-6 sm:-top-8 md:-right-10"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
          <CalendarCheck className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[12.5px] font-medium text-fg">Nueva reserva confirmada</p>
          <p className="font-mono text-[10.5px] text-fg-faint">Automatizada · hace 2 min</p>
        </div>

        {/* the signal — this event is flowing down into the system below */}
        <span
          aria-hidden
          className="absolute -bottom-7 left-8 h-7 w-px bg-gradient-to-b from-accent-400/70 to-transparent"
        >
          <motion.span
            className="absolute left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent-300"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn", delay: 2.2 }}
          />
        </span>
      </motion.div>

      {/* main dashboard panel */}
      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel bg-noise relative overflow-hidden rounded-[28px] p-6 shadow-[var(--shadow-elevated)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-faint">
              Sistema de reservas
            </p>
            <p className="mt-1 font-display text-[19px] text-fg">Clínica Vitalis</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-400">
            <LiveDot />
            En vivo
          </span>
        </div>

        {/* stat + chart row */}
        <div className="mt-6 flex items-end justify-between rounded-2xl border border-border bg-surface-900/60 p-4">
          <div>
            <p className="text-[26px] font-medium leading-none text-fg">128</p>
            <p className="mt-1.5 text-[12px] text-fg-muted">reservas esta semana</p>
            <p className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-accent-400">
              <TrendingUp className="size-3" /> +24%
            </p>
          </div>
          <div className="flex h-[64px] items-end gap-1.5">
            {weeklyBars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{
                  duration: 0.8,
                  delay: 1.3 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`w-2 rounded-full ${
                  i === weeklyBars.length - 1
                    ? "bg-accent-400"
                    : "bg-surface-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* appointments list */}
        <div className="mt-5 flex flex-col gap-1">
          <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
            Próximas citas — hoy
          </p>
          {appointments.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-900/50"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-700 font-mono text-[11px] text-fg-muted">
                {a.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-fg">{a.name}</p>
                <p className="truncate text-[11.5px] text-fg-faint">{a.service}</p>
              </div>
              <span className="font-mono text-[11.5px] text-fg-muted">{a.time}</span>
            </motion.div>
          ))}
        </div>

        {/* visibility gauge */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-surface-900/60 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
            <MapPin className="size-4" />
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[12.5px] text-fg-muted">Visibilidad local</p>
              <p className="font-mono text-[12px] text-fg">92/100</p>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.2, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
