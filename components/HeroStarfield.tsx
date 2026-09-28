"use client";

import { useEffect, useRef } from 'react';

/* The hero backdrop: a pale blue wash with a soft diagonal bloom, plus a field of twinkling
   white motes that lean towards the visitor's cursor. Everything is painted into one canvas so
   the whole backdrop costs a single composited layer instead of hundreds of animated nodes. */

/** Roughly one mote per this many CSS pixels of hero area. */
const AREA_PER_STAR = 5600;
const MIN_STARS = 60;
const MAX_STARS = 190;

/* Cursor influence: motes closer than this lean towards the pointer, harder the closer they
   are. The ease is exponential rather than a spring, so the drift stays calm and never
   overshoots. Simulated over a 1216x300 hero, these numbers gather roughly half of the field
   from a mean 135px away down to about 30px, and let it all drift home again in ~2s. */
const PULL_RADIUS = 380;
/** Rate of the lean, in e-folds per second, at the very centre of the cursor. */
const PULL_RATE = 7;
/** Rate at which motes drift back to their resting spot once the cursor is gone. */
const RETURN_RATE = 0.8;

type Star = {
  /** Resting position in the hero's own coordinate space. */
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  /** Core radius in CSS pixels. */
  radius: number;
  /** Random offset so the motes never blink in unison. */
  phase: number;
  /** Radians per second of the twinkle cycle. */
  speed: number;
  /** Only the larger motes get the extra soft halo. */
  halo: boolean;
};

/** The backdrop is painted in fixed units so it never depends on the hero's own size. */
const BG_WIDTH = 1200;
const BG_HEIGHT = 420;

/* Light blue with the light falling from the top; the soft halos below bloom it into a glow. */
const BASE_STOPS: Array<[number, string]> = [
  [0, '#d8e8fb'],
  [0.5, '#cee0f9'],
  [1, '#c1d8f6'],
];

/** x, y, radius, "r, g, b" and centre alpha of each soft light halo. */
const HALOS: Array<[number, number, number, string, number]> = [
  [BG_WIDTH * 0.72, -BG_HEIGHT * 0.3, BG_WIDTH * 0.5, '255, 255, 255', 0.6],
  [BG_WIDTH * 0.08, BG_HEIGHT * 1.1, BG_WIDTH * 0.4, '231, 243, 255', 0.45],
  [BG_WIDTH * 0.8, BG_HEIGHT * 0.95, BG_WIDTH * 0.36, '214, 234, 254', 0.3],
];

/** Corners that sit just outside the bloom take a touch more blue, which gives the panel depth. */
const EDGE_DEPTH = { colour: '47, 111, 208', alpha: 0.09 };

function drawBackdrop(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);

  const base = ctx.createLinearGradient(0, 0, 0, BG_HEIGHT);
  for (const [stop, colour] of BASE_STOPS) base.addColorStop(stop, colour);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const depth = ctx.createRadialGradient(
    BG_WIDTH * 0.55,
    BG_HEIGHT * 0.3,
    BG_WIDTH * 0.16,
    BG_WIDTH * 0.55,
    BG_HEIGHT * 0.3,
    BG_WIDTH * 0.76,
  );
  depth.addColorStop(0, `rgba(${EDGE_DEPTH.colour}, 0)`);
  depth.addColorStop(1, `rgba(${EDGE_DEPTH.colour}, ${EDGE_DEPTH.alpha})`);
  ctx.fillStyle = depth;
  ctx.fillRect(0, 0, width, height);

  for (const [x, y, radius, colour, alpha] of HALOS) {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, `rgba(${colour}, ${alpha})`);
    glow.addColorStop(1, `rgba(${colour}, 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }
}

export default function HeroStarfield({
  pointerX,
  pointerY,
  className = '',
}: {
  /** Cursor position in CSS pixels relative to the hero, or null while it is outside. */
  pointerX?: number | null;
  pointerY?: number | null;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /* The loop reads the pointer through a ref, so moving it never restarts the animation. */
  const pointer = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const stars = useRef<Star[]>([]);
  const size = useRef({ width: 0, height: 0 });

  useEffect(() => {
    pointer.current = { x: pointerX ?? null, y: pointerY ?? null };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** Size the bitmap, create or remap the motes, and lay down the backdrop. */
    const layout = (width: number, height: number) => {
      const previous = size.current;
      size.current = { width, height };

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (previous.width === 0 || previous.height === 0) {
        const count = Math.round(
          Math.min(MAX_STARS, Math.max(MIN_STARS, (width * height) / AREA_PER_STAR)),
        );
        stars.current = Array.from({ length: count }, () => {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const radius = 0.8 + Math.random() * 1.5;
          return {
            homeX: x,
            homeY: y,
            x,
            y,
            radius,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.7,
            halo: radius > 1.5,
          };
        });
      } else {
        /* A resize keeps the field's composition instead of reshuffling it. */
        const scaleX = width / previous.width;
        const scaleY = height / previous.height;
        for (const star of stars.current) {
          star.homeX *= scaleX;
          star.homeY *= scaleY;
          star.x *= scaleX;
          star.y *= scaleY;
        }
      }

      drawBackdrop(ctx, width, height);
    };

    const rect = canvas.getBoundingClientRect();
    layout(Math.max(1, rect.width), Math.max(1, rect.height));

    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver((entries) => {
            const box = entries[0]?.contentRect;
            if (!box) return;
            layout(Math.max(1, box.width), Math.max(1, box.height));
          });
    observer?.observe(canvas);
    /* Rotation or zoom can change devicePixelRatio without changing the CSS box. */
    const relayout = () => {
      const box = canvas.getBoundingClientRect();
      layout(Math.max(1, box.width), Math.max(1, box.height));
    };
    window.addEventListener('resize', relayout);

    const draw = (time: number, delta: number) => {
      const { width, height } = size.current;
      if (!width || !height) return;
      drawBackdrop(ctx, width, height);

      const target = pointer.current;
      const hasTarget = target.x !== null && target.y !== null;
      const step = Math.min(delta, 0.05);
      const seconds = time / 1000;

      for (const star of stars.current) {
        if (hasTarget) {
          const dx = (target.x as number) - star.x;
          const dy = (target.y as number) - star.y;
          const distance = Math.hypot(dx, dy);
          if (distance < PULL_RADIUS) {
            /* Quadratic falloff: barely any lean at the edge of the field, firm near the cursor. */
            const falloff = 1 - distance / PULL_RADIUS;
            const lean = 1 - Math.exp(-PULL_RATE * falloff * falloff * step);
            star.x += dx * lean;
            star.y += dy * lean;
          }
        }

        /* Whatever the pull leaves behind drifts back to its resting spot. */
        const back = 1 - Math.exp(-RETURN_RATE * step);
        star.x += (star.homeX - star.x) * back;
        star.y += (star.homeY - star.y) * back;

        /* Two staggered waves per mote, so the blinking never reads as a single pulse. */
        const twinkle = 0.5 + 0.5 * Math.sin(seconds * star.speed + star.phase);
        const alpha = 0.3 + 0.7 * twinkle * twinkle;
        const radius = star.radius * (0.7 + 0.4 * twinkle);

        if (star.halo && alpha > 0.4) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 0.3).toFixed(3)})`;
          ctx.arc(star.x, star.y, radius * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* Motion-sensitive visitors get the same hero, just frozen mid-twinkle. */
    if (reducedMotion) {
      draw(700, 0);
      return () => {
        observer?.disconnect();
        window.removeEventListener('resize', relayout);
      };
    }

    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - previous) / 1000);
      previous = now;
      draw(now, delta);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', relayout);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
