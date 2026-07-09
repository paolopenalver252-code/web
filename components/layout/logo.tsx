import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="POTENARIS — Inicio"
      className={cn(
        "group relative inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className="relative flex size-7 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent-400/20 blur-md opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <svg viewBox="0 0 32 32" fill="none" className="relative size-7">
          <circle cx="16" cy="16" r="15" stroke="var(--color-border-strong)" strokeWidth="1" />
          <path
            d="M16 6 L24 16 L16 26 L8 16 Z"
            stroke="var(--color-accent-400)"
            strokeWidth="1.3"
            fill="none"
          />
          <circle cx="16" cy="16" r="2.4" fill="var(--color-accent-400)" />
        </svg>
      </span>
      <span className="font-display text-[19px] tracking-[-0.01em] text-fg">
        POTENARIS
      </span>
    </Link>
  );
}
