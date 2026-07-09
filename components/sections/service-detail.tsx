"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { revealUp, revealScale, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceLevel } from "@/lib/services";

export function ServiceDetail({ level, index }: { level: ServiceLevel; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={level.id}
      className="relative scroll-mt-28 border-t border-border py-24 md:py-32"
    >
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          variants={revealUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn("flex flex-col gap-6", reversed && "lg:order-2")}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-full border font-mono text-[11px]",
                level.featured
                  ? "border-accent-400 bg-accent-500/15 text-accent-300"
                  : "border-border-strong bg-surface-900 text-fg-subtle"
              )}
            >
              {level.n}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
              {level.tag}
            </span>
          </div>

          <h2 className="font-display text-[32px] leading-[1.1] text-fg md:text-[40px]">
            {level.name}
          </h2>

          <p className="max-w-[46ch] text-[17px] leading-[1.7] text-fg-muted">{level.goal}</p>

          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[26px] text-fg">{level.priceRange}</span>
            {level.priceSuffix && (
              <span className="font-mono text-[15px] text-fg-faint">{level.priceSuffix}</span>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-surface-900/40 p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-faint">
              Ideal si
            </p>
            <p className="mt-2 text-[14.5px] leading-[1.65] text-fg-muted">{level.forWhom}</p>
          </div>

          <ul className="flex flex-col gap-3.5">
            {level.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-[15px] text-fg-muted">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <span>{o}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2">
            <Button href={level.ctaHref} variant={level.featured ? "primary" : "secondary"} icon>
              {level.ctaLabel}
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={revealScale(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            "relative flex aspect-[4/3.4] items-center justify-center",
            reversed && "lg:order-1"
          )}
        >
          <LevelGlyph n={level.n} featured={level.featured} />
        </motion.div>
      </Container>
    </section>
  );
}

function LevelGlyph({ n, featured }: { n: string; featured?: boolean }) {
  return (
    <div className="relative flex size-full items-center justify-center">
      <div
        aria-hidden
        className="absolute h-[70%] w-[70%] rounded-full opacity-[0.14] blur-[80px]"
        style={{ background: "radial-gradient(circle, var(--color-accent-500), transparent 70%)" }}
      />
      <svg viewBox="0 0 320 320" className="relative size-[85%] max-w-[360px] opacity-70">
        <circle cx="160" cy="160" r="140" stroke="var(--color-border-strong)" fill="none" />
        <circle cx="160" cy="160" r="100" stroke="var(--color-border)" fill="none" />
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="var(--color-accent-500)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 14"
          opacity={featured ? 0.7 : 0.35}
        />
      </svg>
      <span className="font-display pointer-events-none absolute select-none text-[180px] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-border-strong)] md:text-[220px]">
        {n}
      </span>
      <span
        className={cn(
          "glass-panel absolute bottom-6 right-2 flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] md:right-6",
          featured ? "text-accent-300 border-border-accent" : "text-fg-muted"
        )}
      >
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-accent-400" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
        </span>
        Nivel {n}
      </span>
    </div>
  );
}
