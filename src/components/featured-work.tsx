import styles from "./portfolio-visuals.module.css";
import Image from "next/image";

const selectedWork = [
  {
    id: "xsolla",
    client: "Xsolla",
    logo: "/clients/xsolla.svg",
    logoWidth: 141,
    logoHeight: 38,
    start: "2026-03",
    end: "2026-08",
    year: "2026",
    period: "Mar — Aug",
    focus: "Gaming platforms",
    role: "Shared UI & Site Builder",
    title: "Making shared interfaces easier to evolve.",
    summary:
      "Across three repositories, I built shared frontend components with Next.js, React and TypeScript, refactored modal workflows and rewrote styles with vanilla-extract.",
    contribution:
      "I added internationalization support and improved Site Builder settings, laying foundations for future skins and cosmetic updates.",
    technologies: ["Next.js", "React", "TypeScript", "vanilla-extract"],
  },
  {
    id: "villeroy-boch",
    client: "Villeroy & Boch",
    logo: "/clients/villeroy-boch.png",
    logoWidth: 910,
    logoHeight: 446,
    start: "2025-05",
    end: "2025-09",
    year: "2025",
    period: "May — Sep",
    focus: "Consumer commerce",
    role: "Checkout migration",
    title: "A new foundation for checkout.",
    summary:
      "I helped migrate legacy Salesforce Commerce Cloud checkout flows to PWA Kit with React and TypeScript, working closely with architecture and backend teams.",
    contribution:
      "Alongside implementation, I contributed to refinement and code reviews, and presented product demos to client stakeholders.",
    technologies: ["React", "TypeScript", "PWA Kit", "Salesforce Commerce Cloud"],
  },
  {
    id: "electrolux",
    client: "Electrolux Professional",
    logo: "/clients/electrolux-professional.svg",
    logoWidth: 617,
    logoHeight: 142,
    start: "2025-01",
    end: "2025-05",
    year: "2025",
    period: "Jan — May",
    focus: "B2B commerce",
    role: "Frontend ownership",
    title: "Taking ownership of B2B commerce.",
    summary:
      "As the sole frontend engineer in a distributed team, I built Lightning Web Components for B2B checkout flows and product listing and detail pages.",
    contribution:
      "I improved checkout flows, delivered product page features and added Google Analytics tracking across the shopping experience.",
    technologies: ["Lightning Web Components", "Salesforce", "Google Analytics"],
  },
];

export function FeaturedWork() {
  return (
    <section
      id="work"
      className={`wrap section-pad section-line ${styles.visual}`}
      aria-labelledby="work-title"
    >
      <div className="work-top [&_>_div]:[grid-column:1_/_8] grid grid-cols-[repeat(12,_1fr)] gap-8 items-end mb-12 [@media(max-width:767px)]:block">
        <div>
          <p className="eyebrow accent">01 / Selected work</p>
          <h2
            id="work-title"
            className="work-title display text-[clamp(3.2rem,_6vw,_6.7rem)] leading-[0.92] m-[1.6rem_0_0]"
          >
            Work with
            <br />
            intention.
          </h2>
        </div>
        <p className="work-intro [grid-column:9_/_13] text-muted leading-[1.65] max-w-76 [@media(max-width:767px)]:mt-6">
          A few stories from client work at EPAM Systems. Different products, shared attention to
          the interfaces people use every day.
        </p>
      </div>
      <div className="work-list-heading eyebrow flex flex-wrap justify-between gap-[0.75rem_2rem] py-5 [border-top:1px_solid_var(--color-line)] text-muted text-[0.62rem] leading-[1.6]">
        <span>Selected client engagements</span>
        <span>Latest first / 2026 — 2025</span>
      </div>
      <ol
        className="work-stories grid gap-6 list-none m-0 p-0 [@media(max-width:767px)]:gap-8"
        role="list"
        aria-label="Client work, newest first"
      >
        {selectedWork.map((work) => (
          <li
            key={work.id}
            className="work-entry grid grid-cols-[7.5rem_minmax(0,_1fr)] gap-[clamp(1.5rem,_3vw,_3rem)] [@media(max-width:767px)]:grid-cols-[minmax(0,_1fr)] [@media(max-width:767px)]:gap-4"
          >
            <div className="work-date relative pt-8 [@media(max-width:767px)]:flex [@media(max-width:767px)]:items-baseline [@media(max-width:767px)]:gap-3 [@media(max-width:767px)]:pt-2">
              <p className="work-year display m-0 text-[2rem] leading-none tracking-[-0.05em] tabular-nums [@media(max-width:767px)]:text-[1.25rem]">
                {work.year}
              </p>
              <p className="work-period mt-[0.65rem] text-muted [font-family:ui-monospace,_'SFMono-Regular',_monospace] text-[0.75rem] [@media(max-width:767px)]:m-0">
                {work.period}
              </p>
              <span className="sr-only">
                <time dateTime={work.start}>{work.start}</time> to{" "}
                <time dateTime={work.end}>{work.end}</time>
              </span>
            </div>
            <article
              className={`work-story [--work-tint:var(--palette-work-tint)] grid grid-cols-[minmax(0,_0.85fr)_minmax(0,_1.5fr)] gap-[2rem_clamp(2rem,_4vw,_4rem)] min-w-0 p-[clamp(1.5rem,_3vw,_3rem)] [border:1px_solid_var(--palette-work-border)] rounded-[1.25rem] bg-work-surface [box-shadow:inset_0_1px_0_color-mix(in_srgb,_var(--palette-white)_2.352941%,_transparent)] [@media(max-width:767px)]:grid-cols-[minmax(0,_1fr)] [@media(max-width:767px)]:gap-7 work-story--${work.id}`}
              aria-labelledby={`${work.id}-title`}
            >
              <div className="work-story-heading [@media(max-width:767px)]:grid [@media(max-width:767px)]:grid-cols-[5rem_minmax(0,_1fr)] [@media(max-width:767px)]:gap-[0.5rem_1rem] [@media(max-width:767px)]:items-center">
                <div className="work-logo-panel grid place-items-center h-30 p-6 [border:1px_solid_color-mix(in_srgb,_var(--palette-white)_5.098039%,_transparent)] rounded-[0.75rem] bg-logo-surface [@media(max-width:767px)]:[grid-row:1_/_3] [@media(max-width:767px)]:h-18 [@media(max-width:767px)]:p-2">
                  <Image
                    className="work-logo block w-full max-w-52 h-auto [max-height:5rem] object-contain"
                    src={work.logo}
                    width={work.logoWidth}
                    height={work.logoHeight}
                    alt=""
                    sizes="(max-width: 767px) 180px, 220px"
                  />
                </div>
                <h3
                  id={`${work.id}-title`}
                  className="work-client display m-[1.25rem_0_0] text-[clamp(1.4rem,_2vw,_2rem)] leading-[1.15] tracking-[-0.045em] text-balance [@media(max-width:767px)]:m-0 [@media(max-width:767px)]:self-end [@media(max-width:767px)]:text-[1.3rem]"
                >
                  {work.client}
                </h3>
                <p className="work-role mt-[0.55rem] text-muted text-[0.8rem] leading-[1.5] [@media(max-width:767px)]:m-0 [@media(max-width:767px)]:self-start [@media(max-width:767px)]:text-[0.72rem]">
                  {work.role}
                </p>
              </div>
              <div className="work-story-detail min-w-0 max-w-160">
                <p className="work-focus eyebrow [color:var(--work-tint)] text-[0.62rem]">
                  {work.focus}
                </p>
                <p className="work-story-title display mt-4 text-[clamp(1.5rem,_2.4vw,_2.35rem)] leading-[1.15] tracking-[-0.04em] text-balance [@media(max-width:767px)]:mt-3">
                  {work.title}
                </p>
                <p className="work-summary mt-5 text-text-secondary text-[0.92rem] leading-[1.8]">
                  {work.summary}
                </p>
                <p className="work-contribution mt-[0.85rem] text-muted text-[0.92rem] leading-[1.8]">
                  {work.contribution}
                </p>
              </div>
              <div className="work-stack [&_>_.eyebrow]:shrink-0 [&_>_.eyebrow]:text-muted [&_>_.eyebrow]:text-[0.6rem] [grid-column:1_/_-1] flex items-baseline gap-[1rem_2rem] pt-6 [border-top:1px_solid_var(--palette-work-border)] [@media(max-width:767px)]:flex-col [@media(max-width:767px)]:gap-[0.85rem]">
                <p className="eyebrow">Built with</p>
                <ul
                  className="work-technologies [&_li]:p-[0.55rem_0.8rem] [&_li]:[border:1px_solid_var(--palette-tag-border)] [&_li]:rounded-[0.45rem] [&_li]:bg-tag-surface [&_li]:text-tag-ink [&_li]:text-[0.78rem] [&_li]:font-semibold [&_li]:leading-[1.4] flex flex-wrap gap-2 m-0 p-0 list-none"
                  aria-label={`${work.client} tech stack`}
                >
                  {work.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
