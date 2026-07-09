"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Label, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EASE_SIGNATURE } from "@/lib/motion";

type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  return (
    <SpotlightCard className="bg-noise rounded-[32px] p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SIGNATURE }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
              <CheckCircle2 className="size-7" />
            </span>
            <h3 className="font-display text-[24px] text-fg">Solicitud recibida</h3>
            <p className="max-w-[38ch] text-[15px] leading-[1.65] text-fg-muted">
              Gracias. Responderemos a su solicitud en menos de 2 horas laborables con
              disponibilidad para hablar sobre su clínica.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="clinic">Nombre de la clínica o centro</Label>
                <Input id="clinic" name="clinic" required />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="phone" optional>
                  Teléfono
                </Label>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Label htmlFor="interest">Qué le interesa</Label>
              <Select id="interest" name="interest" defaultValue="auditoria" required>
                <option value="auditoria">Auditoría de visibilidad y reservas</option>
                <option value="presencia">Presencia digital profesional</option>
                <option value="automatizacion">Sistema de reservas automatizado</option>
                <option value="crecimiento">Sistema de crecimiento mensual</option>
                <option value="no-seguro">Aún no lo tengo claro</option>
              </Select>
            </div>

            <div className="flex flex-col gap-2.5">
              <Label htmlFor="message" optional>
                Cuéntenos brevemente su situación
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Ej. Recibimos pocas reservas nuevas y no sabemos si es un problema de visibilidad o de proceso..."
              />
            </div>

            <div className="mt-2 flex flex-col items-start gap-4">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
              </Button>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                Respondemos en menos de 2h laborables · Sin compromiso
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}
