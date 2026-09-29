# Aleksandar Mandić — portfolio MVP

A local, typography-led portfolio prototype for a frontend and full-stack engineer. The original MVP scope and design decisions are in [PORTFOLIO_MVP_HANDOFF.md](PORTFOLIO_MVP_HANDOFF.md).

## Run locally

Requirements: Node.js 20.9+ (verified here with Node 24.21.0) and npm.

```sh
npm install
npm run dev
```

Open **http://localhost:3000**. The case study is at **http://localhost:3000/work/salon-booking**. The former `/work/saloon-booking` URL permanently redirects there.

## Current scope

- Home page with identity, one featured personal project, background and contact section. The supplied email, phone, GitHub and LinkedIn are linked there.
- The supplied one-page CV is available locally at `/Aleksandar_Mandic_CV.pdf`; its copy matches the supplied file byte for byte.
- Local MDX case study for Salon Booking, an independently built private personal project. It explains the working booking flow, Postgres overlap protection, and configurable salon presentation, while identifying unfinished weekly-hours editing and the lack of live business usage.
- Reused, labelled synthetic booking UI concept. It is an illustration, not a screenshot or functioning booking flow.
- GSAP hero entry and one ScrollTrigger project reveal, with reduced-motion cleanup. The heading uses manual line wrappers instead of SplitText to keep its accessible name and server markup stable.
- Responsive layouts, keyboard skip link, metadata, custom favicon, error and 404 pages.
- Space Grotesk and Manrope are served as licensed local font package assets via `@fontsource`.

Stack: Next.js 16.3.6 App Router, React 19.2.8, strict TypeScript, Tailwind CSS 4, GSAP 3.15.0, `@gsap/react` 2.1.2, `@next/mdx` 16.3.6, Playwright 1.63.0 and axe.

## Verification

```sh
npm run lint
npm run typecheck
npm run test:e2e
npm run build
```

On 2026-09-28: lint, TypeScript (also after build) and production build passed; **18/18 Playwright tests passed**. Browser tests cover both routes, 404 recovery, all home anchors from the project page, 360/390/768/1440px overflow, axe WCAG 2 A/AA and 2.1 AA tags, reduced motion, repeated navigation, no-JavaScript navigation, contact destinations and the served PDF, keyboard skip link and GSAP entry/final states. Browser screenshots are captured for both routes at desktop, 390px and 360px under `test-results/visual/` (ignored by Git) and were inspected, including the updated contact section. No browser exceptions or failed asset responses were found in the capture test. A 720px CSS viewport was used as a desktop 200% zoom reflow proxy; browser-native zoom was not separately measured.

The Salon Booking revision added a source-backed case study, an accessible booking diagram, corrected naming and a permanent redirect from the old URL. The private product source was inspected through GitHub; its runtime was not tested here because its local credentials are unavailable. The portfolio's lint, typecheck, build and **20/20 Playwright tests passed**. Fresh desktop and mobile case-study captures are in `test-results/visual/` and were inspected.

The Playwright trace is at `test-results/visual/performance-trace.zip` after a full run. A local diagnostic observed one long task and a layout shift sum of about 0.0174 during the traced dev-server session. These are development diagnostics, not field Core Web Vitals or proof of production performance. The Playwright web server stops after the tests; run `npm run dev` for a persistent preview.

The current browser tests check that the heading, project copy and links remain usable through motion, route changes and resizing. The reduced-motion check compares visible hero renders over time. Animation frames and the performance trace are review artifacts; the trace test also checks that local layout shift stays below 0.1. The 720px screenshot is named `home-viewport-720.png` because viewport narrowing does not exercise browser-native zoom.

## Before publication

The owner has supplied email, phone, GitHub, LinkedIn and a CV for this local prototype. Before publication, still supply or approve:

- Real project screenshots once the private app can run again; the current visual is explicitly a synthetic concept.
- Permission to publish any client details in the CV; the case study makes no client or adoption claims.
- A production domain for canonical and social metadata.

This local MVP is **not yet ready for public job applications**.

## Animation refinement ? 2026-09-28

The hero now settles its two name lines 75ms apart and assembles three opaque booking planes from distinct offsets and scales. Desktop finishes in 820ms; mobile uses 10px travel, no animated scale and finishes in 640ms. The featured illustration repeats that assembly once when its scene reaches 85% of the viewport, then reveals the selected service, date and summary details. Mobile omits the detail sequence. Copy, captions and navigation stay at rest and visible.

GSAP owns the outer plane transforms; the existing static perspective lives on an inner surface. Scoped useGSAP/matchMedia contexts revert timelines and ScrollTriggers on teardown and preference changes. Switching to reduced motion immediately restores final styles; resizing or switching back does not replay an entrance already started. Link arrows use CSS only, with matching keyboard focus and fine-pointer hover movement, disabled for reduced motion. No dependencies were added.

Final checks: lint, production build, post-build typecheck and 18 Chromium tests passed. The tests exercise three home/project/home cycles with motion enabled at 390px and 1440px, preference changes during both sequences, breakpoint resizing, keyboard feedback, no-JavaScript navigation, accessibility and asset/console diagnostics. Early/middle animation frames in `test-results/animation/` and settled renders in `test-results/visual/` were inspected; panel transparency was removed after this review exposed overlapping text during movement. Headless Chromium frames are not a substitute for real-device playback review. Safari/Firefox, native 200% zoom and subjective playback on a physical phone remain unverified.

## Next smallest improvement

Review the home page on a real phone and desktop browser with the owner, then tune the hero spacing and concept readability before adding another project or interaction.
