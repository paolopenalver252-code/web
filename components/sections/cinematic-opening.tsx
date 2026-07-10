"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "potenaris-intro-seen-v1";

// Exact Hero copy, split into words so the accent segment ("llena la
// agenda") can keep its styling while every character still animates in
// reading order. Never edit this without checking hero.tsx stays in sync —
// this is the same sentence, generated instead of blurred-in.
const HEADLINE_WORDS: { text: string; accent?: boolean }[] = [
  { text: "El" },
  { text: "sistema" },
  { text: "que" },
  { text: "llena", accent: true },
  { text: "la", accent: true },
  { text: "agenda", accent: true },
  { text: "de" },
  { text: "su" },
  { text: "clínica." },
];

const SUBTITLE =
  "Visibilidad local, automatización de reservas y reputación digital, combinadas en un solo sistema que trabaja mientras usted atiende a sus pacientes.";

// ---------------------------------------------------------------------------
// Should this play at all? Decided once per tab session, and instantly for
// anyone who prefers reduced motion. useSyncExternalStore (not an effect)
// so the client's real answer applies before first paint instead of
// flashing the wrong state and correcting a frame later.
// ---------------------------------------------------------------------------

let cachedDecision: "playing" | "dismissed" | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function dismiss() {
  if (cachedDecision === "dismissed") return;
  cachedDecision = "dismissed";
  listeners.forEach((l) => l());
}

function getSnapshot(): "playing" | "dismissed" {
  if (cachedDecision) return cachedDecision;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    cachedDecision = "dismissed";
    return cachedDecision;
  }
  try {
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    if (!seen) sessionStorage.setItem(SESSION_KEY, "1");
    cachedDecision = seen ? "dismissed" : "playing";
  } catch {
    cachedDecision = "playing";
  }
  return cachedDecision;
}

function getServerSnapshot(): "playing" | "dismissed" {
  return "dismissed";
}

// ---------------------------------------------------------------------------
// Particle network — a canvas, not DOM nodes. ~55 nodes arranged as a
// deliberate lattice (never a sphere, never noise), rotating slowly on a
// simple perspective projection so it reads as real 3D depth without WebGL.
// ---------------------------------------------------------------------------

type Particle = {
  x: number;
  y: number;
  z: number; // base position, normalized-ish units
  appearAt: number; // seconds
  bobPhase: number;
  bobSpeed: number;
};

type Edge = { a: number; b: number };

type Pulse = { edge: number; start: number; duration: number; reverse: boolean };

function buildNetwork(cols: number, rows: number) {
  const particles: Particle[] = [];
  const spanX = 620;
  const spanY = 380;
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.hypot(cx, cy);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const jitterX = (Math.random() - 0.5) * (spanX / cols) * 0.55;
      const jitterY = (Math.random() - 0.5) * (spanY / rows) * 0.55;
      const x = (c - cx) * (spanX / cols) + jitterX;
      const y = (r - cy) * (spanY / rows) + jitterY;
      const z = (Math.random() - 0.5) * 260;
      const dist = Math.hypot(c - cx, r - cy) / maxDist;
      particles.push({
        x,
        y,
        z,
        appearAt: 0.15 + dist * 2.1 + Math.random() * 0.5,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.4 + Math.random() * 0.5,
      });
    }
  }

  // connect each node to its nearest grid neighbours — a lattice, not noise
  const edges: Edge[] = [];
  const index = (r: number, c: number) => r * cols + c;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1 && Math.random() > 0.12) edges.push({ a: index(r, c), b: index(r, c + 1) });
      if (r < rows - 1 && Math.random() > 0.35) edges.push({ a: index(r, c), b: index(r + 1, c) });
      if (r < rows - 1 && c < cols - 1 && Math.random() > 0.78) {
        edges.push({ a: index(r, c), b: index(r + 1, c + 1) });
      }
    }
  }

  return { particles, edges };
}

function useParticleNetwork(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  active: boolean
) {
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isSmall = window.innerWidth < 768;
    const { particles, edges } = buildNetwork(isSmall ? 6 : 10, isSmall ? 5 : 7);
    const pulses: Pulse[] = [];
    let nextPulseAt = 2.6;
    let raf = 0;
    const start = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    function project(x: number, y: number, z: number, elapsed: number) {
      const rot = elapsed * 0.055;
      const xr = x * Math.cos(rot) - z * Math.sin(rot);
      const zr = x * Math.sin(rot) + z * Math.cos(rot);
      const fov = 640;
      const scale = fov / (fov + zr + 260);
      return { x: xr * scale, y: y * scale, scale };
    }

    function frame(now: number) {
      const elapsed = (now - start) / 1000;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const px = dpr;

      // network dims from "forming" to "ambient background" once the text
      // takes over, but never fully vanishes — it keeps breathing underneath
      const networkAlpha = elapsed < 4.7 ? 1 : Math.max(0.22, 1 - (elapsed - 4.7) / 1.6);

      const projected = particles.map((p) => project(p.x * px, p.y * px, p.z * px, elapsed));

      // edges
      ctx.lineWidth = 1 * px;
      for (let i = 0; i < edges.length; i++) {
        const { a, b } = edges[i];
        const pa = particles[a];
        const pb = particles[b];
        if (elapsed < pa.appearAt || elapsed < pb.appearAt) continue;
        const revealStart = Math.max(pa.appearAt, pb.appearAt);
        const reveal = Math.min(1, (elapsed - revealStart) / 0.5);
        if (reveal <= 0) continue;
        const A = projected[a];
        const B = projected[b];
        ctx.strokeStyle = `rgba(79,209,224,${0.16 * reveal * networkAlpha})`;
        ctx.beginPath();
        ctx.moveTo(cx + A.x, cy + A.y);
        ctx.lineTo(cx + B.x, cy + B.y);
        ctx.stroke();
      }

      // spawn pulses along already-revealed edges
      if (elapsed > nextPulseAt && edges.length) {
        const revealedEdges = edges
          .map((e, i) => ({ e, i }))
          .filter(
            ({ e }) => elapsed > Math.max(particles[e.a].appearAt, particles[e.b].appearAt) + 0.5
          );
        if (revealedEdges.length && pulses.length < 9) {
          const pick = revealedEdges[Math.floor(Math.random() * revealedEdges.length)];
          pulses.push({
            edge: pick.i,
            start: elapsed,
            duration: 0.9 + Math.random() * 0.9,
            reverse: Math.random() > 0.5,
          });
        }
        nextPulseAt = elapsed + 0.22 + Math.random() * 0.3;
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const t = (elapsed - pulse.start) / pulse.duration;
        if (t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const tt = pulse.reverse ? 1 - eased : eased;
        const { a, b } = edges[pulse.edge];
        const A = projected[a];
        const B = projected[b];
        const x = A.x + (B.x - A.x) * tt;
        const y = A.y + (B.y - A.y) * tt;
        const fade = Math.sin(Math.min(1, t) * Math.PI);
        ctx.beginPath();
        ctx.fillStyle = `rgba(160,240,245,${0.85 * fade * networkAlpha})`;
        ctx.shadowColor = "rgba(126,227,232,0.9)";
        ctx.shadowBlur = 8 * px;
        ctx.arc(cx + x, cy + y, 2 * px, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (elapsed < p.appearAt) continue;
        const appear = Math.min(1, (elapsed - p.appearAt) / 0.6);
        const bob = Math.sin(elapsed * p.bobSpeed + p.bobPhase) * 3 * px;
        const proj = projected[i];
        const r = (1.6 + proj.scale * 0.6) * px * appear;
        ctx.beginPath();
        ctx.fillStyle = `rgba(126,227,232,${0.75 * appear * networkAlpha})`;
        ctx.shadowColor = "rgba(79,209,224,0.8)";
        ctx.shadowBlur = 6 * px * appear;
        ctx.arc(cx + proj.x, cy + proj.y + bob, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, active]);
}

// ---------------------------------------------------------------------------

// Precomputed once, outside render: each word's characters carry their own
// absolute index so the whole headline generates in one continuous reading
// order, without mutating anything while JSX is being built.
function layoutHeadline() {
  let cursor = 0;
  return HEADLINE_WORDS.map((word) => {
    const chars = word.text.split("").map((ch) => ({ ch, index: cursor++ }));
    cursor += 1; // the space that follows this word
    return { ...word, chars };
  });
}

const HEADLINE_LAYOUT = layoutHeadline();

function GeneratedHeadline({ startDelay }: { startDelay: number }) {
  return (
    <h1 className="font-display text-[38px] font-normal leading-[1.08] tracking-[-0.02em] text-fg sm:text-[54px] md:text-[68px] lg:text-[80px]">
      {HEADLINE_LAYOUT.map((word, wi) => (
        <span
          key={wi}
          className={`inline-block whitespace-nowrap ${
            word.accent ? "text-gradient-accent italic" : ""
          }`}
        >
          {word.chars.map(({ ch, index }) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.4,
                delay: startDelay + index * 0.022,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
          {wi < HEADLINE_LAYOUT.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

function GeneratedSubtitle({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      className="relative"
    >
      <p className="max-w-[46ch] text-[15px] leading-[1.7] text-fg-muted sm:text-[17px]">
        {SUBTITLE}
      </p>
    </motion.div>
  );
}

function ConvergingCta({ delay }: { delay: number }) {
  const offsets = [
    { x: -90, y: -40 },
    { x: 100, y: -30 },
    { x: -70, y: 45 },
    { x: 85, y: 50 },
  ];
  return (
    <div className="relative mt-2 inline-flex items-center justify-center">
      {offsets.map((o, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute size-1 rounded-full bg-accent-300"
          initial={{ x: o.x, y: o.y, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
          transition={{ duration: 0.55, delay: delay + i * 0.04, ease: [0.55, 0, 1, 0.45] }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: [
            "0 0 0px rgba(79,209,224,0)",
            "0 0 46px rgba(79,209,224,0.85)",
            "0 0 0px rgba(79,209,224,0)",
          ],
        }}
        transition={{
          opacity: { duration: 0.4, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.5, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] },
          boxShadow: { duration: 1.1, delay: delay + 0.5, ease: "easeOut" },
        }}
        className="rounded-full"
      >
        <Button href="/contacto" size="lg" icon>
          Reservar mi auditoría
        </Button>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function OpeningScene({ onDismiss }: { onDismiss: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useParticleNetwork(canvasRef, true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(onDismiss, 11400);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(timeout);
    };
  }, [onDismiss]);

  // a light focus trap: while the scene plays, Tab never escapes it
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-label="Presentación de POTENARIS"
      aria-modal="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(18px)", scale: 1.03 }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-void"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(5,7,11,0.85) 100%)",
        }}
      />

      <div className="relative mx-6 flex max-w-[720px] flex-col items-center gap-7 text-center sm:mx-10">
        <GeneratedHeadline startDelay={5.6} />
        <GeneratedSubtitle delay={7.3} />
        <ConvergingCta delay={8.3} />
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint opacity-0 transition-opacity duration-500 hover:text-fg-muted focus-visible:opacity-100"
        style={{ animation: "skip-fade-in 0.6s ease-out 1.5s forwards" }}
      >
        Saltar intro →
      </button>
      <style>{`@keyframes skip-fade-in { to { opacity: 0.55; } }`}</style>
    </motion.div>
  );
}

export function CinematicOpening() {
  const decision = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const playing = decision === "playing";

  return (
    <AnimatePresence>
      {playing && <OpeningScene key="opening" onDismiss={dismiss} />}
    </AnimatePresence>
  );
}
