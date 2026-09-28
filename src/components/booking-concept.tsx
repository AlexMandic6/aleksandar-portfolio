export function BookingConcept({ variant }: { variant: "hero" | "project" }) {
  return <figure className="booking-figure">
    <div className={`booking-scene booking-scene--${variant}`} aria-hidden="true">
      <div className="booking-plane booking-service" data-hero-plane><div className="booking-surface">
        <div className="booking-bar"><i/><i/><i/></div>
        <div className="booking-inner">
          <div className="booking-kicker">01 / Select a service</div>
          <div className="booking-title">A moment for you.</div>
          <div className="service-row selected" data-booking-detail><strong>Signature cut</strong><small>45 min ↗</small></div>
          <div className="service-row"><strong>Color consultation</strong><small>30 min</small></div>
          <div className="service-row"><strong>Styling</strong><small>60 min</small></div>
        </div>
      </div></div>
      <div className="booking-plane booking-calendar" data-hero-plane><div className="booking-surface">
        <div className="booking-bar"><i/><i/><i/></div>
        <div className="booking-inner">
          <div className="booking-kicker">02 / Choose a time</div>
          <div className="booking-title">September 2026</div>
          <div className="calendar-grid">{["M","T","W","T","F","S","S","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","1","2","3","4"].map((day, index) => <span data-booking-detail={day === "25" ? "" : undefined} className={day === "25" ? "picked" : ""} key={index}>{day}</span>)}</div>
        </div>
      </div></div>
      <div className="booking-plane booking-summary" data-hero-plane><div className="booking-surface">
        <div className="booking-inner">
          <div className="booking-kicker">03 / Your appointment</div>
          <div className="booking-title">The details</div>
          <div className="summary-line" data-booking-detail><span>Signature cut</span><strong>45 min</strong></div>
          <div className="summary-line" data-booking-detail><span>25 Sep</span><strong>10:30</strong></div>
        </div>
      </div></div>
    </div>
    <figcaption className="concept-label eyebrow">UI concept — synthetic data<span className="sr-only">. An illustrative service selector, calendar and appointment summary.</span></figcaption>
  </figure>;
}
