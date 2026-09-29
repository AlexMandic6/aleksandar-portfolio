import Link from "next/link";
import { BookingConcept } from "./booking-concept";
import { profile } from "@/content/profile";
import { HeroMotion } from "./motion/hero-motion";
import { HeroBackground } from "./hero-background";

export function Hero() {
  return <HeroMotion><section className="hero wrap" aria-labelledby="hero-title">
    <HeroBackground />
    <div className="hero-grid">
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
        <div className="hero-meta"><p className="hero-role">{profile.role}</p><div><p className="hero-desc">{profile.summary}</p><Link href="#work" className="text-link hero-cta">View selected work <span className="arrow" aria-hidden="true">↗</span></Link></div></div>
      </div>
      <div className="hero-art"><BookingConcept placement="hero" /></div>
    </div>
  </section></HeroMotion>;
}
