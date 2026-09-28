"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    let revealed = false;
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduce) { revealed = true; return; }
      if (revealed) return;
      const desktop = context.conditions?.desktop;
      const planes = root.current!.querySelectorAll("[data-hero-plane]");
      const details = root.current!.querySelectorAll("[data-booking-detail]");
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: () => { revealed = true; },
        scrollTrigger: { trigger: root.current!.querySelector(".booking-scene"), start: "top 85%", once: true },
      });
      // Only decorative UI moves. Project copy, caption and link are always at rest.
      planes.forEach((plane, index) => {
        timeline.fromTo(plane, {
          x: desktop ? [-26, 20, 12][index] : 0,
          y: desktop ? [12, -12, 22][index] : 10,
          scale: desktop ? [.97, .95, .98][index] : 1,
        }, { x: 0, y: 0, scale: 1, duration: desktop ? .56 : .38, clearProps: "transform" }, index * .07);
      });
      if (desktop) {
        timeline.fromTo(details, { x: -6, opacity: .35 }, {
          x: 0, opacity: 1, duration: .3, stagger: .065, clearProps: "transform,opacity",
        }, .35);
      }
    });
    return () => mm.revert();
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
