import type { Profile } from "@/content/profile";
import { existsSync } from "node:fs";
import { join } from "node:path";

function validHttps(value?: string) {
  try {
    return value && new URL(value).protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}
function validEmail(value?: string) {
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}
function validPhone(value?: string) {
  return value && /^\+[1-9]\d{6,14}$/.test(value) ? value : undefined;
}
function validCv(value?: string) {
  if (!value || !/^\/[\w/-]+\.pdf$/i.test(value) || value.includes("..")) return undefined;
  return existsSync(join(process.cwd(), "public", value.slice(1))) ? value : undefined;
}

export function Contact({ links }: { links: Profile["links"] }) {
  const email = validEmail(links.email);
  const phone = validPhone(links.phone);
  const github = validHttps(links.github);
  const linkedin = validHttps(links.linkedin);
  const cv = validCv(links.cvPath);
  const items = [
    { label: "Email", detail: email, href: email ? `mailto:${email}` : undefined },
    { label: "Phone", detail: "+381 65 378 1461", href: phone ? `tel:${phone}` : undefined },
    { label: "GitHub", detail: "AlexMandic6", href: github },
    { label: "LinkedIn", detail: "View profile", href: linkedin },
    { label: "CV", detail: "View PDF", href: cv },
  ].filter((item): item is { label: string; detail: string; href: string } => Boolean(item.href));
  return (
    <section id="contact" className="wrap section-pad section-line" aria-labelledby="contact-title">
      <p className="eyebrow accent">03 / Contact</p>
      <h2
        id="contact-title"
        className="contact-heading display text-[clamp(3.2rem,_8vw,_8.6rem)] leading-[0.95] m-[2rem_0_3rem]"
      >
        Let’s make
        <br />
        <span className="accent">something good.</span>
      </h2>
      {items.length ? (
        <ul className="contact-links [&_li]:min-w-0 [&_li]:[border-top:1px_solid_var(--color-line)] grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-[0_clamp(1.5rem,_5vw,_5rem)] [@media(max-width:767px)]:grid-cols-[1fr]">
          {items.map((item) => (
            <li key={item.label}>
              <a
                className="contact-link [&:is(:hover,:focus-visible)_.contact-link-detail]:text-accent grid grid-cols-[minmax(0,_1fr)_auto] items-center gap-[0.6rem_1rem] p-[1.6rem_0_1.8rem]"
                href={item.href}
                {...(item.href.startsWith("https:")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="eyebrow contact-link-label [grid-column:1] text-muted">
                  {item.label}
                </span>
                <span className="contact-link-detail [grid-column:1] min-w-0 text-[clamp(1.15rem,_2vw,_1.8rem)] font-semibold tracking-[-0.045em] wrap-[anywhere] [transition:color_0.2s]">
                  {item.detail}
                </span>
                <span
                  className="contact-link-arrow [grid-column:2] [grid-row:1_/_3] self-center text-accent text-[1.5rem] [transition:transform_0.2s]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="contact-note text-muted leading-[1.7]">
          Contact details will be added before launch.
        </p>
      )}
    </section>
  );
}
