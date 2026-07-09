import { cn } from "@/lib/utils";

/**
 * The system is running. A small, honest signal — never a decoration.
 * Used anywhere a number or state claims to be live/current.
 */
export function LiveDot({ size = "sm", className }: { size?: "sm" | "md"; className?: string }) {
  const dim = size === "sm" ? "size-1.5" : "size-2";
  return (
    <span className={cn("relative flex", dim, className)}>
      <span className={cn("absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-accent-400")} />
      <span className={cn("relative inline-flex rounded-full bg-accent-400", dim)} />
    </span>
  );
}
