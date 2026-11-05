import styles from "@/components/portfolio-visuals.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import { BookingConcept } from "@/components/booking-concept";
import CaseStudy from "@/content/salon-booking.mdx";

export const metadata: Metadata = {
  title: "Salon Booking — Personal project",
  description:
    "How I built a private salon booking project with calculated availability, reliable appointment reservations, and configurable presentation.",
};

export default function ProjectPage() {
  return (
    <main id="main" className={`wrap case-page py-[3rem_8rem] ${styles.visual}`}>
      <Link href="/#work" className="case-back text-link text-muted">
        <span aria-hidden="true">↖</span> Back to work
      </Link>
      <header className="case-intro py-[clamp(5rem,_8vw,_9rem)_clamp(3rem,_5vw,_5rem)]">
        <p className="eyebrow accent">Personal project / In progress</p>
        <h1 className="case-title display text-[clamp(3rem,_9vw,_9rem)] leading-[0.9] m-[1.5rem_0_2rem] wrap-[anywhere]">
          Salon Booking<span className="accent">.</span>
        </h1>
        <p className="case-lede max-w-168 text-[clamp(1.15rem,_2vw,_1.55rem)] leading-[1.55] text-muted">
          A service booking flow for different kinds of salons, built around clear availability and
          reliable appointment reservations.
        </p>
        <dl className="case-facts [&_dt]:text-accent [&_dt]:text-[0.7rem] [&_dt]:font-bold [&_dt]:tracking-[0.14em] [&_dt]:uppercase [&_dd]:mt-[0.65rem] [&_dd]:text-case-ink [&_dd]:leading-[1.5] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-6 mt-12 py-6 [border-block:1px_solid_var(--color-line)] [@media(max-width:767px)]:grid-cols-[1fr] [@media(max-width:767px)]:gap-[1.1rem]">
          <div>
            <dt>Role</dt>
            <dd>Independent design and development</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>Next.js, TypeScript, Supabase, Postgres</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Working private project; no public demo</dd>
          </div>
        </dl>
      </header>
      <div className="case-visual min-h-[610px] grid place-items-center p-[clamp(1.5rem,_5vw,_5rem)] [background:radial-gradient(_circle_at_50%_44%,_var(--palette-case-glow),_var(--color-surface)_62%_)] [border:1px_solid_var(--color-line)] [@media(max-width:767px)]:min-h-[340px] [@media(max-width:767px)]:p-4">
        <BookingConcept placement="case-study" />
      </div>
      <article className="case-content w-[min(100%,_760px)] m-[5rem_auto_0] [@media(max-width:767px)]:mt-8">
        <CaseStudy />
      </article>
      <Link href="/#work" className="text-link case-end mt-20">
        ← Return to selected work
      </Link>
    </main>
  );
}
