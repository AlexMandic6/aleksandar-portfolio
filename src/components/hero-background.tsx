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

    const media = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
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
