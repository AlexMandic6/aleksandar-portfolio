export function About() {
  return (
    <section
      id="about"
      className="wrap section-pad section-line section-split grid grid-cols-[1fr_1fr] gap-12 [@media(max-width:767px)]:block"
      aria-labelledby="about-title"
    >
      <div>
        <p className="eyebrow accent">02 / About</p>
        <h2
          id="about-title"
          className="about-statement display text-[clamp(2rem,_4vw,_4.5rem)] leading-[1.1] max-w-[16ch] m-[2rem_0_0]"
        >
          Building for the people on the other side of the screen.
        </h2>
      </div>
      <div className="about-detail [&_p_+_p]:mt-[1.4rem] [&_.eyebrow]:text-ink [&_.eyebrow]:leading-[1.8] max-w-128 self-end leading-[1.8] text-muted text-[1.08rem] [@media(max-width:767px)]:mt-8">
        <p>
          I’m Aleksandar Mandić, a frontend engineer working with React and TypeScript across
          enterprise and e-commerce interfaces.
        </p>
        <p>
          My experience also includes Salesforce Commerce Cloud and Lightning Web Components. I care
          about clear structure, considered interaction and interfaces that feel good to use.
        </p>
        <p className="eyebrow">React / TypeScript / Salesforce Commerce Cloud / LWC</p>
      </div>
    </section>
  );
}
