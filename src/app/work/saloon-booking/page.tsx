import type { Metadata } from "next";
import Link from "next/link";
import { BookingConcept } from "@/components/booking-concept";
import CaseStudy from "@/content/saloon-booking.mdx";

export const metadata: Metadata = {
  title: "saloon-booking — Project in progress",
  description: "A personal project exploring a clearer service booking experience. Case study and synthetic UI concept.",
};

export default function ProjectPage() {
  return <main id="main" className="wrap case-page">
    <Link href="/#work" className="case-back text-link"><span aria-hidden="true">↖</span> Back to work</Link>
    <header className="case-intro">
      <p className="eyebrow accent">Personal project / In progress</p>
      <h1 className="case-title display">saloon-booking<span className="accent">.</span></h1>
      <p className="case-lede">Exploring a clearer path from selecting a service to choosing an appointment time.</p>
    </header>
    <div className="case-visual"><BookingConcept variant="project" /></div>
    <article className="case-content"><CaseStudy /></article>
    <Link href="/#work" className="text-link case-end">← Return to selected work</Link>
  </main>;
}
