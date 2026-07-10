import { cn } from "@/lib/utils";

type GlowProps = {
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "center-left"
    | "center-right";
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "accent" | "faint";
  className?: string;
};

const positions: Record<NonNullable<GlowProps["position"]>, string> = {
  "top-left": "-top-[10%] -left-[10%]",
  "top-right": "-top-[10%] -right-[10%]",
  "top-center": "-top-[20%] left-1/2 -translate-x-1/2",
  "bottom-left": "-bottom-[10%] -left-[10%]",
  "bottom-right": "-bottom-[10%] -right-[10%]",
  "bottom-center": "-bottom-[20%] left-1/2 -translate-x-1/2",
  "center-left": "top-1/2 -left-[15%] -translate-y-1/2",
  "center-right": "top-1/2 -right-[15%] -translate-y-1/2",
};

const sizes: Record<NonNullable<GlowProps["size"]>, string> = {
  sm: "h-[32vw] w-[32vw] max-h-[380px] max-w-[380px]",
  md: "h-[46vw] w-[46vw] max-h-[560px] max-w-[560px]",
  lg: "h-[60vw] w-[60vw] max-h-[760px] max-w-[760px]",
  xl: "h-[75vw] w-[75vw] max-h-[960px] max-w-[960px]",
};

// A cheap, stable hash so every Glow on the page drifts on its own clock —
// two instances with identical props still land on different phases because
// the DOM position/props combination is rarely identical twice, but even if
// it were, the Law of Floating only requires that the *page* never shows a
// synchronized pulse, not that every possible instance be unique forever.
function phaseSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * A single ambient light source — cinematic, never decorative-obvious.
 * One per section, placed off-axis, never centered on the content it lights.
 * Never synchronized with any other Glow on the page: each instance drifts
 * on its own 34–46s cycle, started mid-breath at a different phase.
 */
export function Glow({
  position = "top-right",
  size = "md",
  tone = "accent",
  className,
}: GlowProps) {
  const seed = phaseSeed(`${position}-${size}-${tone}-${className ?? ""}`);
  const duration = 34 + (seed % 13); // 34s–46s, never the same cycle twice
  const delay = -(seed % duration); // negative delay = starts mid-cycle

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[110px]",
        positions[position],
        sizes[size],
        tone === "accent" ? "opacity-[0.13]" : "opacity-[0.07]",
        className
      )}
      style={{
        animation: `drift ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        background:
          tone === "accent"
            ? "radial-gradient(circle, rgba(79,209,224,0.9) 0%, rgba(79,209,224,0) 65%)"
            : "radial-gradient(circle, rgba(167,176,195,0.8) 0%, rgba(167,176,195,0) 65%)",
      }}
    />
  );
}
