import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-400",
        className
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-accent-400" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
        </span>
      )}
      {children}
    </span>
  );
}
