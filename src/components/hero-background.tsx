"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./hero-background.css";

gsap.registerPlugin(useGSAP);

const columns = 36;
const rows = 20;
const dots = Array.from({ length: columns * rows }, (_, index) => ({
  x: (index % columns + .5) / columns,
  y: (Math.floor(index / columns) + .5) / rows,
}));

export function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const field = root.current;
    const hero = field?.closest(".hero");
    if (!field || !hero) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const elements = Array.from(field.querySelectorAll<HTMLElement>(".hero-background-dot"));
      const glow = field.querySelector<HTMLElement>(".hero-background-glow")!;
      // Reuse the hero's easing; only nearby dots receive updates.
      const options = { duration: .5, ease: "power3.out" };
      const movers = elements.map(element => ({
        x: gsap.quickTo(element, "x", options),
        y: gsap.quickTo(element, "y", options),
        active: false,
      }));
      const glowX = gsap.quickTo(glow, "x", options);
      const glowY = gsap.quickTo(glow, "y", options);
      const glowOpacity = gsap.quickTo(glow, "opacity", { duration: .25, ease: "power3.out" });

      const settle = () => {
        movers.forEach(mover => {
          if (!mover.active) return;
          mover.x(0);
          mover.y(0);
          mover.active = false;
        });
        glowOpacity(0);
      };

      const move = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const bounds = field.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        glowX(x);
        glowY(y);
        glowOpacity(1);

        movers.forEach((mover, index) => {
          const dx = dots[index].x * bounds.width - x;
          const dy = dots[index].y * bounds.height - y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 180);
          if (influence > 0) {
            const displacement = influence * influence * 16 / Math.max(distance, 1);
            mover.x(dx * displacement);
            mover.y(dy * displacement);
            mover.active = true;
          } else if (mover.active) {
            mover.x(0);
            mover.y(0);
            mover.active = false;
          }
        });
      };

      const resize = new ResizeObserver(settle);
      resize.observe(field);
      hero.addEventListener("pointermove", move as EventListener);
      hero.addEventListener("pointerleave", settle);
      window.addEventListener("scroll", settle, { passive: true });
      window.addEventListener("blur", settle);

      return () => {
        resize.disconnect();
        hero.removeEventListener("pointermove", move as EventListener);
        hero.removeEventListener("pointerleave", settle);
        window.removeEventListener("scroll", settle);
        window.removeEventListener("blur", settle);
      };
    });

    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className="hero-background" aria-hidden="true">
    <div className="hero-background-glow" />
    {dots.map((dot, index) => <span
      className="hero-background-dot"
      key={index}
      style={{ left: `${dot.x * 100}%`, top: `${dot.y * 100}%` }}
    />)}
  </div>;
}
