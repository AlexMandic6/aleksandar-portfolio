"use client";

import { useEffect, useRef } from "react";
import { createLiquidBackground } from "./motion/liquid-background";
import "./hero-background.css";

export function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const field = root.current;
    const surface = canvas.current;
    const hero = field?.closest<HTMLElement>(".hero");
    if (!field || !surface || !hero) return;

    // Primary pointer capabilities can report touch even when a mouse is in use.
    // The renderer responds to actual pointer input instead of excluding those devices.
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;
    const sync = () => {
      dispose?.();
      dispose = undefined;
      if (media.matches) dispose = createLiquidBackground(surface, hero);
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      dispose?.();
    };
  }, []);

  return <div ref={root} className="hero-background" aria-hidden="true">
    <div className="hero-background-fallback" />
    <canvas ref={canvas} className="hero-background-liquid" />
  </div>;
}
