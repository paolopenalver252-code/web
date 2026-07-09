import { cn } from "@/lib/utils";
import { LiveDot } from "@/components/ui/live-dot";

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
      {dot && <LiveDot />}
      {children}
    </span>
  );
}
