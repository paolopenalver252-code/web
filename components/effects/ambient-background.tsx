export function AmbientBackground({
  variant = "default",
}: {
  variant?: "default" | "hero";
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 01 — base void, set by page background */}

      {/* Layer 02 — large ambient gradients, the invisible light source */}
      <div
        className="animate-drift-slow absolute -top-[20%] left-1/2 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(79,209,224,0.9) 0%, rgba(79,209,224,0) 65%)",
        }}
      />
      <div
        className="animate-drift absolute top-[30%] -right-[10%] h-[45vw] w-[45vw] max-h-[600px] max-w-[600px] rounded-full opacity-[0.10] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(79,209,224,0.8) 0%, rgba(79,209,224,0) 70%)",
        }}
      />

      {variant === "hero" && (
        <div
          className="absolute inset-x-0 top-0 h-[60%] opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,32,51,0.5) 0%, rgba(5,7,11,0) 100%)",
          }}
        />
      )}

      {/* Layer 03 — vignette to hold focus centrally */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(5,7,11,0.7) 100%)",
        }}
      />

      {/* Layer 04 — noise, removes digital perfection */}
      <div className="bg-noise absolute inset-0" />
    </div>
  );
}
