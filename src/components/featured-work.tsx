import Link from "next/link";
import { BookingConcept } from "./booking-concept";

export function FeaturedWork() {
  return <section id="work" className="wrap section-pad section-line" aria-labelledby="work-title">
    <div className="work-top"><div><p className="eyebrow accent">01 / Selected work</p><h2 id="work-title" className="work-title display">Work with<br/>intention.</h2></div><p className="work-intro">One project in progress. A closer look at product thinking, interface structure and the details that shape an experience.</p></div>
    <div className="work-panel"><div className="work-art"><BookingConcept placement="featured" /></div><div className="work-bottom"><div><p className="eyebrow accent">Personal project · In progress</p><h3 className="project-name display">saloon-booking</h3><p className="work-summary">Exploring a clearer booking flow for services, availability and appointment details.</p></div><Link href="/work/saloon-booking" className="text-link">View project <span className="arrow" aria-hidden="true">↗</span></Link></div></div>
  </section>;
}
