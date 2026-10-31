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
    <section id="work" className="wrap section-pad section-line" aria-labelledby="work-title">
      <div className="work-top">
        <div>
          <p className="eyebrow accent">01 / Selected work</p>
          <h2 id="work-title" className="work-title display">
            Work with
            <br />
            intention.
          </h2>
        </div>
        <p className="work-intro">
          A few stories from client work at EPAM Systems. Different products, shared attention to
          the interfaces people use every day.
        </p>
      </div>
      <div className="work-list-heading eyebrow">
        <span>Selected client engagements</span>
        <span>Latest first / 2026 — 2025</span>
      </div>
      <ol className="work-stories" role="list" aria-label="Client work, newest first">
        {selectedWork.map((work) => (
          <li key={work.id} className="work-entry">
            <div className="work-date">
              <p className="work-year display">{work.year}</p>
              <p className="work-period">{work.period}</p>
              <span className="sr-only">
                <time dateTime={work.start}>{work.start}</time> to{" "}
                <time dateTime={work.end}>{work.end}</time>
              </span>
            </div>
            <article
              className={`work-story work-story--${work.id}`}
              aria-labelledby={`${work.id}-title`}
            >
              <div className="work-story-heading">
                <div className="work-logo-panel">
                  <Image
                    className="work-logo"
                    src={work.logo}
                    width={work.logoWidth}
                    height={work.logoHeight}
                    alt=""
                    sizes="(max-width: 767px) 180px, 220px"
                  />
                </div>
                <h3 id={`${work.id}-title`} className="work-client display">
                  {work.client}
                </h3>
                <p className="work-role">{work.role}</p>
              </div>
              <div className="work-story-detail">
                <p className="work-focus eyebrow">{work.focus}</p>
                <p className="work-story-title display">{work.title}</p>
                <p className="work-summary">{work.summary}</p>
                <p className="work-contribution">{work.contribution}</p>
              </div>
              <div className="work-stack">
                <p className="eyebrow">Built with</p>
                <ul className="work-technologies" aria-label={`${work.client} tech stack`}>
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
