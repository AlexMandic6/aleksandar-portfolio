"use client";

import { useSyncExternalStore } from "react";
import GhostFibers from "./ghost-fibers";
import styles from "./hero-background.module.css";

const animatedBackgroundQuery = "(prefers-reduced-motion: no-preference)";

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
    <div
      className={`hero-background ${styles.background}`}
      aria-hidden="true"
      data-effect="ghost-fibers"
    >
      <div className={`hero-background-fallback ${styles.fallback}`} />
      {animated && <GhostFibers className={`hero-background-ghost ${styles.ghost}`} />}
    </div>
  );
}
