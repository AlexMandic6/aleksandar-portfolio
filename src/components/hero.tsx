import Link from "next/link";
import { profile } from "@/content/profile";
import { HeroMotion } from "./motion/hero-motion";
import { HeroBackground } from "./hero-background";
import { TechStack } from "./tech-stack";

export function Hero() {
  return (
    <HeroMotion>
      <section
        className="hero wrap relative pt-[clamp(4.5rem,_9vw,_9rem)] pb-28 min-h-[min(820px,_92vh)] [@media(max-width:1023px)]:min-h-0 [@media(max-width:767px)]:pt-20 [@media(max-width:767px)]:pb-20"
        aria-labelledby="hero-title"
      >
        <HeroBackground />
        <div className="hero-content relative [@media(min-width:1024px)]:grid [@media(min-width:1024px)]:grid-cols-[minmax(0,_1fr)_clamp(20rem,_28vw,_24rem)] [@media(min-width:1024px)]:gap-[clamp(2rem,_4vw,_4rem)] [@media(min-width:1024px)]:items-start">
          <div className="hero-copy relative z-2 [@media(min-width:1024px)]:min-w-0">
            <p className="hero-index eyebrow flex items-center gap-4 text-muted">
              Portfolio / 2026
            </p>
            <h1
              id="hero-title"
              className="hero-name display text-[clamp(4.5rem,_9.45vw,_9.6rem)] leading-[0.86] m-[2rem_0_2.5rem] whitespace-nowrap [@media(max-width:1023px)]:text-[clamp(4.5rem,_11vw,_7rem)] [@media(max-width:767px)]:text-[clamp(2.7rem,_11.6vw,_5.5rem)] [@media(max-width:767px)]:m-[1.5rem_0_2rem] [@media(max-width:767px)]:whitespace-normal"
              aria-label={profile.name}
            >
              {profile.name.split(" ").map((word, wordIndex, words) => (
                <span data-hero-line aria-hidden="true" key={`${word}-${wordIndex}`}>
                  {Array.from(word).map((letter, index) => (
                    <span data-hero-letter key={index}>
                      {letter}
                    </span>
                  ))}
                  {wordIndex === words.length - 1 && <span data-hero-dot>.</span>}
                </span>
              ))}
            </h1>
            <div className="hero-meta max-w-[660px] mt-16 ml-[clamp(2rem,_6vw,_6rem)] [@media(max-width:767px)]:mt-0 [@media(max-width:767px)]:ml-0">
              <p className="hero-role text-[1.15rem] font-[650]">{profile.role}</p>
              <p className="hero-desc max-w-128 mt-3 text-muted text-[clamp(1rem,_1.4vw,_1.2rem)] leading-[1.65] [@media(max-width:767px)]:mt-[0.7rem]">
                {profile.summary}
              </p>
              <div className="hero-actions flex flex-wrap items-center gap-[1.5rem_2.5rem] mt-8">
                <Link href="#work" className="text-link">
                  View selected work{" "}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                {profile.links.cvPath && (
                  <a
                    href={profile.links.cvPath}
                    download
                    className="text-link hero-cv text-muted border-line"
                  >
                    Download CV{" "}
                    <span className="arrow" aria-hidden="true">
                      ↓
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <TechStack />
        </div>
      </section>
    </HeroMotion>
  );
}
