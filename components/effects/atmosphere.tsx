/**
 * The environment the camera always sits inside.
 * Fixed to the viewport — never scrolls — so every scene shares the same
 * light instead of resetting at each section boundary. Per-section <Glow />
 * layers add local emphasis on top of this constant, barely-there base.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="animate-drift-slow absolute left-[-10%] top-[-10%] h-[70vh] w-[70vh] rounded-full opacity-[0.05] blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(79,209,224,0.9) 0%, rgba(79,209,224,0) 65%)",
        }}
      />
      <div
        className="animate-drift absolute right-[-15%] bottom-[-15%] h-[60vh] w-[60vh] rounded-full opacity-[0.045] blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(167,176,195,0.8) 0%, rgba(167,176,195,0) 65%)",
        }}
      />
      <div className="bg-noise absolute inset-0 opacity-60" />
    </div>
  );
}
