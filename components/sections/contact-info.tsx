"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { revealUp, staggerContainer, viewportOnce } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Recibimos su solicitud",
    text: "Revisamos su situación actual y el nivel del sistema que mejor encaja.",
  },
  {
    n: "02",
    title: "Respondemos en <2h laborables",
    text: "Le contactamos con disponibilidad concreta, sin cuestionarios eternos.",
  },
  {
    n: "03",
    title: "Hablamos de su clínica",
    text: "Una conversación breve, sin compromiso, para confirmar que podemos ayudar.",
  },
];

const CHANNELS = [
  { icon: Mail, label: "hola@potenaris.ai", href: "mailto:hola@potenaris.ai" },
  { icon: MessageCircle, label: "WhatsApp directo", href: "#" },
];

export function ContactInfo() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-8">
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={revealUp()} className="flex gap-5">
            <span className="font-mono text-[12px] text-fg-faint">{s.n}</span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[15px] font-medium text-fg">{s.title}</h3>
              <p className="max-w-[36ch] text-[14px] leading-[1.6] text-fg-muted">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={revealUp()} className="flex flex-col gap-4 border-t border-border pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
          Contacto directo
        </p>
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="group flex items-center gap-3 text-[15px] text-fg-muted transition-colors hover:text-fg"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-border text-accent-400 transition-colors group-hover:border-border-accent">
              <c.icon className="size-4" />
            </span>
            {c.label}
          </a>
        ))}
        <div className="flex items-center gap-3 text-[14px] text-fg-faint">
          <span className="flex size-9 items-center justify-center rounded-full border border-border">
            <MapPin className="size-4" />
          </span>
          Trabajamos de forma remota con clínicas de toda España
        </div>
      </motion.div>
    </motion.div>
  );
}
