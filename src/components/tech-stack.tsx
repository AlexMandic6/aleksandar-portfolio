"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "./tech-stack.module.css";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

type TechNodeStyle = CSSProperties & {
  "--node-x": string;
  "--node-y": string;
  "--brand": string;
};

// Each point and curve is hand-composed; keep identity and geometry together.
const technologies = [
  {
    key: "react",
    name: "React",
    detail: "UI & interaction",
    x: "60.244921%",
    y: "11.765436%",
    path: "M231.34 45.179 Q192 108 192 192",
    color: "var(--palette-tech-react)",
  },
  {
    key: "typescript",
    name: "TypeScript",
    detail: "Typed components",
    x: "88.234564%",
    y: "39.755079%",
    path: "M338.821 152.66 Q264 144 192 192",
    color: "var(--palette-tech-typescript)",
  },
  {
    key: "nextjs",
    name: "Next.js",
    detail: "React framework",
    x: "22.010357%",
    y: "22.010357%",
    path: "M84.52 84.52 Q160 104 192 192",
    color: "var(--color-ink)",
  },
  {
    key: "supabase",
    name: "Supabase",
    detail: "Data & authentication",
    x: "77.989643%",
    y: "77.989643%",
    path: "M299.48 299.48 Q216 264 192 192",
    color: "var(--palette-tech-supabase)",
  },
  {
    key: "salesforce",
    name: "Salesforce",
    detail: "Commerce Cloud",
    x: "11.765436%",
    y: "60.244921%",
    path: "M45.179 231.34 Q120 248 192 192",
    color: "var(--palette-tech-salesforce)",
  },
  {
    key: "lwc",
    name: "LWC",
    detail: "Lightning Web Components",
    x: "39.755079%",
    y: "88.234564%",
    path: "M152.66 338.821 Q192 276 192 192",
    color: "var(--palette-tech-lwc)",
  },
];

function TechSymbol({ technology }: { technology: string }) {
  if (technology === "react")
    return (
      <svg viewBox="0 0 100 90" fill="none" aria-hidden="true">
        <circle cx="50" cy="45" r="6" fill="currentColor" />
        {[0, 60, 120].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="45"
            rx="43"
            ry="16"
            stroke="currentColor"
            strokeWidth="3.5"
            transform={`rotate(${angle} 50 45)`}
          />
        ))}
      </svg>
    );
  if (technology === "typescript")
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <rect x="10" y="10" width="80" height="80" rx="12" fill="currentColor" />
        <text
          x="50"
          y="67"
          textAnchor="middle"
          fill="var(--color-canvas)"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="42"
        >
          TS
        </text>
      </svg>
    );
  if (technology === "salesforce")
    return (
      <svg viewBox="0 0 100 90" aria-hidden="true">
        <path
          d="M24 72a21 21 0 0 1-5-41 24 24 0 0 1 42-12 20 20 0 0 1 30 26 16 16 0 0 1-13 27Z"
          fill="currentColor"
        />
        <text
          x="51"
          y="54"
          textAnchor="middle"
          fill="var(--color-canvas)"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="24"
        >
          SF
        </text>
      </svg>
    );
  if (technology === "nextjs")
    return (
      <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" />
        <path
          d="M32 69V31l45 52M66 31v26"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (technology === "supabase")
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M53 10 16 57h37Z" fill="currentColor" />
        <path d="M47 90 84 43H47Z" fill="currentColor" opacity=".6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="m57 12-30 43h22l-6 33 30-43H51Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="m22 28-12 22 12 22m56-44 12 22-12 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TechStack() {
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const pulses = root.current?.querySelectorAll<SVGGElement>("[data-tech-pulse]");
        if (!root.current || !pulses) return;
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.9, paused: true });
        pulses.forEach((pulse, index) => {
          const start = index * 0.65;
          timeline.fromTo(pulse, { opacity: 0 }, { opacity: 0.9, duration: 0.25 }, start);
          timeline.fromTo(
            pulse,
            { motionPath: { path: technologies[index].path, start: 0, end: 0 } },
            {
              motionPath: { path: technologies[index].path },
              duration: 2.4,
              ease: "none",
            },
            start,
          );
          timeline.to(pulse, { opacity: 0, duration: 0.25 }, start + 2.15);
        });
        let inView = false;
        const sync = () => timeline.paused(!inView || document.hidden);
        const observer = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          sync();
        });
        observer.observe(root.current);
        document.addEventListener("visibilitychange", sync);
        return () => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", sync);
        };
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={`tech-showcase relative z-2 min-w-0 w-[min(100%,_24rem)] m-[3.5rem_auto_0] text-ink [@media(min-width:1024px)]:w-full [@media(min-width:1024px)]:m-[0.15rem_0_0] ${styles.showcase}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="tech-caption flex items-center justify-between gap-3 text-muted">
        <h2 id={`${id}-title`} className="eyebrow">
          Tech stack
        </h2>
        <span className="tech-captionDetail text-[0.65rem] whitespace-nowrap">
          Connected by craft
        </span>
      </div>
      <div className={styles.diagram}>
        <svg className={styles.connections} viewBox="0 0 384 384" aria-hidden="true">
          {technologies.map((technology) => (
            <path key={technology.path} d={technology.path} className={styles.path} />
          ))}
          {technologies.map((technology) => (
            <g
              key={technology.path}
              className={styles.pulse}
              data-tech-pulse
              fill={technology.color}
            >
              <circle r="9" opacity=".12" />
              <circle r="3" />
            </g>
          ))}
        </svg>
        <div className={styles.hub} aria-hidden="true">
          <span>&lt;/&gt;</span>
        </div>
        <ul className="tech-nodes p-0 m-0 list-none" aria-label="Technologies I work with">
          {technologies.map((technology) => (
            <li
              className={styles.node}
              key={technology.key}
              data-technology={technology.key}
              style={
                {
                  "--node-x": technology.x,
                  "--node-y": technology.y,
                  "--brand": technology.color,
                } as TechNodeStyle
              }
              data-highlighted={highlighted === technology.key ? "" : undefined}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHighlighted(technology.key);
              }}
              onPointerLeave={() => setHighlighted(null)}
              onPointerDown={() => setHighlighted(technology.key)}
              onPointerUp={(event) => {
                if (event.pointerType === "touch") setHighlighted(null);
              }}
              onPointerCancel={() => setHighlighted(null)}
            >
              <div className={styles.symbol}>
                <TechSymbol technology={technology.key} />
              </div>
              <h3 className="mt-[clamp(0.4rem,_2.9167cqi,_0.7rem)] [font-family:'Space_Grotesk',_'Segoe_UI',_sans-serif] text-[clamp(0.75rem,_3.75cqi,_0.9rem)] font-[500] leading-[1.25] tracking-[-0.025em]">
                {technology.name}
              </h3>
              <p className="max-w-[16ch] m-[0.2rem_auto_0] text-muted text-[clamp(0.6rem,_2.7083cqi,_0.65rem)] leading-[1.5] [transition:color_180ms_ease]">
                {technology.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="tech-footer flex flex-wrap items-center justify-between gap-[0.6rem_1rem] mt-18 pt-4 [border-top:1px_solid_var(--color-line)]">
        <p className="tech-context text-muted [font:0.55rem_ui-monospace,_monospace]">
          Frontend / Enterprise / Commerce
        </p>
      </div>
    </section>
  );
}
