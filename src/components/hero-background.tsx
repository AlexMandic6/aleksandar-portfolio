"use client";

import { useSyncExternalStore } from "react";
import { colors } from "@/styles/colors";
import GhostFibers from "./ghost-fibers";
import "./hero-background.css";

const animatedBackgroundQuery = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribeToAnimationPreference(onChange: () => void) {
  const media = window.matchMedia(animatedBackgroundQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const canAnimate = () => window.matchMedia(animatedBackgroundQuery).matches;
const serverCanAnimate = () => false;

export function HeroBackground() {
  const animated = useSyncExternalStore(
    subscribeToAnimationPreference,
    canAnimate,
    serverCanAnimate,
  );

  return (
    <div className="hero-background" aria-hidden="true" data-effect="ghost-fibers">
      <div className="hero-background-fallback" />
      {animated && (
        <GhostFibers
          className="hero-background-ghost"
          glowColor={colors["hero-fiber-glow"]}
          lineColor={colors["hero-fiber-line"]}
          secondaryColor={colors["hero-fiber-secondary"]}
          layers={2}
          dpr={1.5}
          speed={0.1}
        />
      )}
    </div>
  );
}
