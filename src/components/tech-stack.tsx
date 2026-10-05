"use client";

import { useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "./tech-stack.module.css";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const technologies = [
  { key: "react", name: "React", detail: "UI & interaction" },
  { key: "typescript", name: "TypeScript", detail: "Typed components" },
  { key: "nextjs", name: "Next.js", detail: "React framework" },
  { key: "supabase", name: "Supabase", detail: "Data & authentication" },
  { key: "salesforce", name: "Salesforce", detail: "Commerce Cloud" },
  { key: "lwc", name: "LWC", detail: "Lightning Web Components" },
];

const connections = [
  { path: "M231.34 45.179 Q192 108 192 192", color: "#8acfd9" },
  { path: "M338.821 152.66 Q264 144 192 192", color: "#8db6df" },
  { path: "M84.52 84.52 Q160 104 192 192", color: "#f2eee6" },
  { path: "M299.48 299.48 Q216 264 192 192", color: "#91d4b1" },
  { path: "M45.179 231.34 Q120 248 192 192", color: "#96cce4" },
  { path: "M152.66 338.821 Q192 276 192 192", color: "#efbf83" },
];

function TechSymbol({ technology }: { technology: string }) {
  if (technology === "react") return <svg viewBox="0 0 100 90" fill="none" aria-hidden="true">
    <circle cx="50" cy="45" r="6" fill="currentColor" />
    {[0, 60, 120].map(angle => <ellipse key={angle} cx="50" cy="45" rx="43" ry="16" stroke="currentColor" strokeWidth="3.5" transform={`rotate(${angle} 50 45)`} />)}
  </svg>;
  if (technology === "typescript") return <svg viewBox="0 0 100 100" aria-hidden="true">
    <rect x="10" y="10" width="80" height="80" rx="12" fill="currentColor" />
    <text x="50" y="67" textAnchor="middle" fill="#10100f" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="42">TS</text>
  </svg>;
  if (technology === "salesforce") return <svg viewBox="0 0 100 90" aria-hidden="true">
    <path d="M24 72a21 21 0 0 1-5-41 24 24 0 0 1 42-12 20 20 0 0 1 30 26 16 16 0 0 1-13 27Z" fill="currentColor" />
    <text x="51" y="54" textAnchor="middle" fill="#10100f" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24">SF</text>
  </svg>;
  if (technology === "nextjs") return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" />
    <path d="M32 69V31l45 52M66 31v26" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
  if (technology === "supabase") return <svg viewBox="0 0 100 100" aria-hidden="true">
    <path d="M53 10 16 57h37Z" fill="currentColor" />
    <path d="M47 90 84 43H47Z" fill="currentColor" opacity=".6" />
  </svg>;
  return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="m57 12-30 43h22l-6 33 30-43H51Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    <path d="m22 28-12 22 12 22m56-44 12 22-12 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function TechStack() {
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const pulses = root.current?.querySelectorAll<SVGGElement>("[data-tech-pulse]");
      if (!root.current || !pulses) return;
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: .9, paused: true });
      pulses.forEach((pulse, index) => {
        const start = index * .65;
        timeline.fromTo(pulse, { opacity: 0 }, { opacity: .9, duration: .25 }, start);
        timeline.fromTo(pulse, { motionPath: { path: connections[index].path, start: 0, end: 0 } }, {
          motionPath: { path: connections[index].path }, duration: 2.4, ease: "none",
        }, start);
        timeline.to(pulse, { opacity: 0, duration: .25 }, start + 2.15);
      });
      let inView = false;
      const sync = () => timeline.paused(!inView || document.hidden);
      const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
      observer.observe(root.current);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    });
    return () => media.revert();
  }, { scope: root });

  return <section ref={root} className={styles.showcase} aria-labelledby={`${id}-title`}>
    <div className={styles.caption}>
      <h2 id={`${id}-title`} className="eyebrow">Tech stack</h2>
      <span className={styles.captionDetail}>Connected by craft</span>
    </div>
    <div className={styles.diagram}>
      <svg className={styles.connections} viewBox="0 0 384 384" aria-hidden="true">
        {connections.map(connection => <path key={connection.path} d={connection.path} className={styles.path} />)}
        {connections.map(connection => <g key={connection.path} className={styles.pulse} data-tech-pulse fill={connection.color}>
          <circle r="9" opacity=".12" />
          <circle r="3" />
        </g>)}
      </svg>
      <div className={styles.hub} aria-hidden="true"><span>&lt;/&gt;</span></div>
      <ul className={styles.nodes} aria-label="Technologies I work with">
        {technologies.map(technology => <li className={styles.node} key={technology.key} data-technology={technology.key}
          data-highlighted={highlighted === technology.key ? "" : undefined}
          onPointerEnter={event => { if (event.pointerType !== "touch") setHighlighted(technology.key); }}
          onPointerLeave={() => setHighlighted(null)}
          onPointerDown={() => setHighlighted(technology.key)}
          onPointerUp={event => { if (event.pointerType === "touch") setHighlighted(null); }}
          onPointerCancel={() => setHighlighted(null)}>
          <div className={styles.symbol}><TechSymbol technology={technology.key} /></div>
          <h3>{technology.name}</h3>
          <p>{technology.detail}</p>
        </li>)}
      </ul>
    </div>
    <div className={styles.footer}>
      <p className={styles.context}>Frontend / Enterprise / Commerce</p>
    </div>
  </section>;
}
