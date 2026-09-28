import type { Profile } from "@/content/profile";
import { existsSync } from "node:fs";
import { join } from "node:path";

function validHttps(value?: string) { try { return value && new URL(value).protocol === "https:" ? value : undefined; } catch { return undefined; } }
function validEmail(value?: string) { return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined; }
function validPhone(value?: string) { return value && /^\+[1-9]\d{6,14}$/.test(value) ? value : undefined; }
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
  return <section id="contact" className="wrap section-pad section-line" aria-labelledby="contact-title">
    <p className="eyebrow accent">03 / Contact</p><h2 id="contact-title" className="contact-heading display">Let’s make<br/><span className="accent">something good.</span></h2>
    {items.length ? <ul className="contact-links">{items.map(item => <li key={item.label}><a className="contact-link" href={item.href} {...(item.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}><span className="eyebrow contact-link-label">{item.label}</span><span className="contact-link-detail">{item.detail}</span><span className="contact-link-arrow" aria-hidden="true">↗</span></a></li>)}</ul> : <p className="contact-note">Contact details will be added before launch.</p>}
  </section>;
}
