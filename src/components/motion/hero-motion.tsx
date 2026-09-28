"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    // Local to this setup: media changes settle the entrance; remounts get a fresh one.
    let entered = false;
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (entered || context.conditions?.reduce) { entered = true; return; }
      entered = true;
      const desktop = context.conditions?.desktop;
      const lines = root.current!.querySelectorAll("[data-hero-line]");
      const planes = root.current!.querySelectorAll("[data-hero-plane]");
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      // No CSS-hidden starting state: identity and navigation survive failed JS.
      lines.forEach((line, index) => {
        timeline.fromTo(line.querySelectorAll("[data-hero-letter]"), {
          yPercent: desktop ? 80 : 40,
          rotationX: desktop ? -75 : -35,
          rotationZ: desktop ? -5 : -2,
          opacity: 0,
        }, {
          yPercent: 0, rotationX: 0, rotationZ: 0, opacity: 1,
          duration: desktop ? .78 : .58,
          stagger: desktop ? .035 : .025,
          ease: "power4.out",
          clearProps: "transform,opacity",
        }, index * .17);
      });
      timeline.fromTo(root.current!.querySelector("[data-hero-dot]"), {
        yPercent: -90, scale: .35, opacity: 0,
      }, {
        yPercent: 0, scale: 1, opacity: 1, duration: .45,
        ease: "back.out(2)", clearProps: "transform,opacity",
      }, desktop ? .72 : .5);
      planes.forEach((plane, index) => {
        timeline.fromTo(plane, {
          x: desktop ? [-24, 18, 10][index] : 0,
          y: desktop ? [18, -14, 24][index] : 10,
          scale: desktop ? [.97, .94, .98][index] : 1,
        }, { x: 0, y: 0, scale: 1, duration: desktop ? .58 : .4, clearProps: "transform" }, .1 + index * .07);
      });
    });
    return () => mm.revert();
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
