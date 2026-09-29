import type { Metadata } from "next";
import Link from "next/link";
import { BookingConcept } from "@/components/booking-concept";
import CaseStudy from "@/content/salon-booking.mdx";

export const metadata: Metadata = {
  title: "Salon Booking — Personal project",
  description: "How I built a private salon booking project with calculated availability, reliable appointment reservations, and configurable presentation.",
};

export default function ProjectPage() {
  return <main id="main" className="wrap case-page">
    <Link href="/#work" className="case-back text-link"><span aria-hidden="true">↖</span> Back to work</Link>
    <header className="case-intro">
      <p className="eyebrow accent">Personal project / In progress</p>
      <h1 className="case-title display">Salon Booking<span className="accent">.</span></h1>
      <p className="case-lede">A service booking flow for different kinds of salons, built around clear availability and reliable appointment reservations.</p>
      <dl className="case-facts">
        <div><dt>Role</dt><dd>Independent design and development</dd></div>
        <div><dt>Stack</dt><dd>Next.js, TypeScript, Supabase, Postgres</dd></div>
        <div><dt>Status</dt><dd>Working private project; no public demo</dd></div>
      </dl>
    </header>
    <div className="case-visual"><BookingConcept placement="case-study" /></div>
    <article className="case-content"><CaseStudy /></article>
    <Link href="/#work" className="text-link case-end">← Return to selected work</Link>
  </main>;
}
