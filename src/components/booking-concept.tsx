import { BookingConceptMotion } from "./booking-concept-motion";
import styles from "./booking-concept.module.css";

export function BookingConcept({ placement }: { placement: "hero" | "featured" | "case-study" }) {
  const variant = placement === "hero" ? "hero" : "project";
  const motion = placement === "hero" ? "hero" : placement === "featured" ? "reveal" : undefined;
  const content = (
    <>
      <div className={`booking-scene booking-scene--${variant}`} aria-hidden="true">
        <div className="booking-plane booking-service" data-booking-plane>
          <div className="booking-pointer-plane w-full h-full" data-booking-pointer>
            <div className="booking-surface">
              <div className="booking-bar h-[25px] bg-booking-bar flex items-center gap-[5px] px-[12px] [@media(max-width:390px)]:h-[17px]">
                <i className="w-[5px] h-[5px] rounded-[50%] bg-booking-dot" />
                <i className="w-[5px] h-[5px] rounded-[50%] bg-booking-dot" />
                <i className="w-[5px] h-[5px] rounded-[50%] bg-booking-dot" />
              </div>
              <div className="booking-inner p-[clamp(0.7rem,_2vw,_1.35rem)] [@media(max-width:390px)]:p-[0.55rem]">
                <div className="booking-kicker [font:600_0.55rem_ui-monospace,_monospace] tracking-[0.13em] uppercase text-booking-muted">
                  01 / Select a service
                </div>
                <div className="booking-title text-[clamp(0.9rem,_1.7vw,_1.5rem)] font-bold tracking-[-0.05em] m-[0.4rem_0_0.9rem] [@media(max-width:390px)]:m-[0.22rem_0_0.45rem]">
                  A moment for you.
                </div>
                <div
                  className="service-row selected flex justify-between gap-2 p-[0.65rem_0] [border-top:1px_solid_var(--palette-booking-line)] text-[clamp(0.58rem,_0.9vw,_0.74rem)] [@media(max-width:390px)]:p-[0.42rem_0]"
                  data-booking-detail
                >
                  <strong className="font-[650] text-accent-strong">Signature cut</strong>
                  <small className="text-booking-muted whitespace-nowrap">45 min ↗</small>
                </div>
                <div className="service-row flex justify-between gap-2 p-[0.65rem_0] [border-top:1px_solid_var(--palette-booking-line)] text-[clamp(0.58rem,_0.9vw,_0.74rem)] [@media(max-width:390px)]:p-[0.42rem_0]">
                  <strong className="font-[650]">Color consultation</strong>
                  <small className="text-booking-muted whitespace-nowrap">30 min</small>
                </div>
                <div className="service-row flex justify-between gap-2 p-[0.65rem_0] [border-top:1px_solid_var(--palette-booking-line)] text-[clamp(0.58rem,_0.9vw,_0.74rem)] [@media(max-width:390px)]:p-[0.42rem_0]">
                  <strong className="font-[650]">Styling</strong>
                  <small className="text-booking-muted whitespace-nowrap">60 min</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-plane booking-calendar" data-booking-plane>
          <div className="booking-pointer-plane w-full h-full" data-booking-pointer>
            <div className="booking-surface">
              <div className="booking-bar h-[25px] bg-booking-bar flex items-center gap-[5px] px-[12px] [@media(max-width:390px)]:h-[17px]">
                <i className="w-[5px] h-[5px] rounded-[50%] bg-booking-dot" />
                <i className="w-[5px] h-[5px] rounded-[50%] bg-booking-dot" />
                <i className="w-[5px] h-[5px] rounded-[50%] bg-booking-dot" />
              </div>
              <div className="booking-inner p-[clamp(0.7rem,_2vw,_1.35rem)] [@media(max-width:390px)]:p-[0.55rem]">
                <div className="booking-kicker [font:600_0.55rem_ui-monospace,_monospace] tracking-[0.13em] uppercase text-booking-muted">
                  02 / Choose a time
                </div>
                <div className="booking-title text-[clamp(0.9rem,_1.7vw,_1.5rem)] font-bold tracking-[-0.05em] m-[0.4rem_0_0.9rem] [@media(max-width:390px)]:m-[0.22rem_0_0.45rem]">
                  September 2026
                </div>
                <div className="calendar-grid grid grid-cols-[repeat(7,_1fr)] text-center gap-1 text-[clamp(0.45rem,_0.75vw,_0.65rem)]">
                  {[
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                    "S",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "1",
                    "2",
                    "3",
                    "4",
                  ].map((day, index) => (
                    <span
                      data-booking-detail={day === "25" ? "" : undefined}
                      className={`py-[0.32em] ${day === "25" ? "picked bg-accent text-booking-selection-ink rounded-[50%]" : ""}`}
                      key={index}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-plane booking-summary" data-booking-plane>
          <div className="booking-pointer-plane w-full h-full" data-booking-pointer>
            <div className="booking-surface">
              <div className="booking-inner p-[clamp(0.7rem,_2vw,_1.35rem)] [@media(max-width:390px)]:p-[0.55rem]">
                <div className="booking-kicker [font:600_0.55rem_ui-monospace,_monospace] tracking-[0.13em] uppercase text-booking-muted">
                  03 / Your appointment
                </div>
                <div className="booking-title text-[clamp(0.9rem,_1.7vw,_1.5rem)] font-bold tracking-[-0.05em] m-[0.4rem_0_0.9rem] [@media(max-width:390px)]:m-[0.22rem_0_0.45rem]">
                  The details
                </div>
                <div
                  className="summary-line flex justify-between [border-top:1px_solid_var(--palette-booking-line)] p-[0.55rem_0] text-[clamp(0.54rem,_0.82vw,_0.73rem)]"
                  data-booking-detail
                >
                  <span>Signature cut</span>
                  <strong>45 min</strong>
                </div>
                <div
                  className="summary-line flex justify-between [border-top:1px_solid_var(--palette-booking-line)] p-[0.55rem_0] text-[clamp(0.54rem,_0.82vw,_0.73rem)]"
                  data-booking-detail
                >
                  <span>25 Sep</span>
                  <strong>10:30</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="concept-label eyebrow mt-[1.1rem] text-muted text-right">
        UI concept — synthetic data
        <span className="sr-only">
          . An illustrative service selector, calendar and appointment summary.
        </span>
      </figcaption>
    </>
  );

  return motion ? (
    <BookingConceptMotion motion={motion}>{content}</BookingConceptMotion>
  ) : (
    <figure className={`booking-figure w-full ${styles.artwork}`}>{content}</figure>
  );
}
