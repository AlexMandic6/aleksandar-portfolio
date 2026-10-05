import Link from "next/link";
import { profile } from "@/content/profile";
import { HeroMotion } from "./motion/hero-motion";
import { HeroBackground } from "./hero-background";
import { TechStack } from "./tech-stack";

export function Hero() {
  return <HeroMotion><section className="hero wrap" aria-labelledby="hero-title">
    <HeroBackground />
    <div className="hero-content">
      <div className="hero-copy">
        <p className="hero-index eyebrow">Portfolio / 2026</p>
        <h1 id="hero-title" className="hero-name display" aria-label={profile.name}>
          {profile.name.split(" ").map((word, wordIndex, words) => (
            <span data-hero-line aria-hidden="true" key={`${word}-${wordIndex}`}>
              {Array.from(word).map((letter, index) => <span data-hero-letter key={index}>{letter}</span>)}
              {wordIndex === words.length - 1 && <span data-hero-dot>.</span>}
            </span>
          ))}
        </h1>
        <div className="hero-meta">
          <p className="hero-role">{profile.role}</p>
          <p className="hero-desc">{profile.summary}</p>
          <div className="hero-actions">
            <Link href="#work" className="text-link">View selected work <span className="arrow" aria-hidden="true">↗</span></Link>
            {profile.links.cvPath && <a href={profile.links.cvPath} download className="text-link hero-cv">Download CV <span className="arrow" aria-hidden="true">↓</span></a>}
          </div>
        </div>
      </div>
      <TechStack />
    </div>
  </section></HeroMotion>;
}
