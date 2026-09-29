"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Motion = "hero" | "reveal";

export function BookingConceptMotion({ children, motion }: { children: React.ReactNode; motion: Motion }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    let started = false;
    let entranceFinished = motion !== "hero";

    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (started || context.conditions?.reduce) {
        if (context.conditions?.reduce) started = true;
        entranceFinished = true;
        return;
      }

      const scene = root.current!.querySelector(".booking-scene");
      const planes = root.current!.querySelectorAll("[data-booking-plane]");
      const details = root.current!.querySelectorAll("[data-booking-detail]");
      const desktop = context.conditions?.desktop;
      const offsets = motion === "hero"
        ? { x: [-24, 18, 10], y: [18, -14, 24], scale: [.97, .94, .98], duration: .58, mobileDuration: .4 }
        : { x: [-26, 20, 12], y: [12, -12, 22], scale: [.97, .95, .98], duration: .56, mobileDuration: .38 };
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        ...(motion === "hero" ? { onComplete: () => { entranceFinished = true; } } : {}),
        ...(motion === "reveal" ? {
          onStart: () => { started = true; },
          scrollTrigger: { trigger: scene, start: "top 85%", once: true },
        } : {}),
      });

      if (motion === "hero") started = true;
      planes.forEach((plane, index) => {
        timeline.fromTo(plane, {
          x: desktop ? offsets.x[index] : 0,
          y: desktop ? offsets.y[index] : 10,
          scale: desktop ? offsets.scale[index] : 1,
        }, {
          x: 0, y: 0, scale: 1,
          duration: desktop ? offsets.duration : offsets.mobileDuration,
          clearProps: "transform",
        }, (motion === "hero" ? .1 : 0) + index * .07);
      });

      if (motion === "reveal" && desktop) {
        timeline.fromTo(details, { x: -6, opacity: .35 }, {
          x: 0, opacity: 1, duration: .3, stagger: .065, clearProps: "transform,opacity",
        }, .35);
      }
    });

    if (motion === "hero") {
      mm.add("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const scene = root.current!.querySelector<HTMLElement>(".booking-scene");
        const planes = Array.from(root.current!.querySelectorAll<HTMLElement>("[data-booking-pointer]"));
        if (!scene) return;

        const movers = planes.map((plane, index) => ({
          x: gsap.quickTo(plane, "x", { duration: .35, ease: "power3.out" }),
          y: gsap.quickTo(plane, "y", { duration: .35, ease: "power3.out" }),
          rotateX: gsap.quickTo(plane, "rotationX", { duration: .35, ease: "power3.out" }),
          rotateY: gsap.quickTo(plane, "rotationY", { duration: .35, ease: "power3.out" }),
          depth: [1, .65, .85][index],
        }));

        const move = (event: PointerEvent) => {
          if (!entranceFinished) return;
          const bounds = scene.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
          const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
          movers.forEach((mover) => {
            mover.x(x * 8 * mover.depth);
            mover.y(y * 6 * mover.depth);
            mover.rotateX(-y * 2 * mover.depth);
            mover.rotateY(x * 2 * mover.depth);
          });
        };
        const settle = () => {
          movers.forEach((mover) => {
            mover.x(0);
            mover.y(0);
            mover.rotateX(0);
            mover.rotateY(0);
          });
        };
        scene.addEventListener("pointermove", move);
        scene.addEventListener("pointerleave", settle);
        return () => {
          scene.removeEventListener("pointermove", move);
          scene.removeEventListener("pointerleave", settle);
          gsap.killTweensOf(planes);
          gsap.set(planes, { clearProps: "transform" });
        };
      });
    }

    return () => mm.revert();
  }, { scope: root });

  return <figure ref={root} className="booking-figure">{children}</figure>;
}
