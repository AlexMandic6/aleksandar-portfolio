# Aleksandar Mandić — Portfolio MVP handoff

Prepared: 2026-09-23. Destination: the user's local VS Code / Codex workspace.

## Start here

This document preserves a design conversation and supplies a proposed, executable MVP plan. The user selected a dark creative-developer portfolio, typography-led composition, layered product UI as the signature visual, and Tailwind CSS. They want to continue in VS Code and build an MVP. The exact tokens, fonts and reduced MVP scope below are implementation recommendations, not an already reviewed visual mockup.

Read the whole document before implementation. Inspect existing workspace instructions and files first. Do not recreate a project, replace unrelated work or restart the design discovery without a concrete conflict. Implement locally when the user supplies the implementation prompt below. No deployment, external accounts, production access or paid services are needed.

The first deliverable is a running, visually coherent portfolio prototype. It is not automatically ready for public job applications: project evidence and contact assets need owner verification.

## VS Code entry prompt

Paste this into Codex with this file at the repository root:

```text
Read PORTFOLIO_MVP_HANDOFF.md completely and inspect the repository and applicable instructions. This continues our portfolio planning conversation. I approve this handoff as the working MVP specification and implementation plan, including its proposed scope reduction. Build the local MVP described in it.

Use Next.js App Router, TypeScript, Tailwind CSS and GSAP. Preserve the dark creative-developer direction: oversized typography, warm black, ivory, restrained orange, asymmetry and layered product UI. Visual quality is a core acceptance criterion. Do not substitute a generic portfolio template or component-library landing page.

Implement the milestones sequentially in this workspace. Use applicable installed skills; do not install additional skills, plugins or MCP servers. Do not delegate to subagents unless I explicitly request it. Do not deploy, push or access production projects. Preserve unrelated work. Ask only about a genuine blocker or a material design conflict; otherwise use the documented defaults.

Render synthetic product visuals as clearly labelled concepts. Do not invent metrics, customer adoption, screenshots, achievements, project URLs or contact data. Missing assets should not block the local prototype.

Run the documented checks. If browser tools are available, inspect actual desktop and mobile renders and fix visual issues. Do not claim checks were run when they were not. Finish with the local preview URL, implemented scope, verification results, remaining publication blockers and the next smallest improvement. Update the milestone checklist and README so another Codex session can continue.
```

## Local setup

If starting from scratch, run from the parent directory in the VS Code terminal:

```sh
npx create-next-app@latest aleksandar-portfolio --typescript --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*" --yes
cd aleksandar-portfolio
code .
```

Then put this document at the new repository root and paste the prompt above into Codex. If `code` is unavailable, use VS Code's File > Open Folder. If an existing project already exists, open it and skip scaffolding. Do not scaffold into a directory containing user work.

Use stable compatible releases, not canary/beta; retain the generated lockfile. Check Node compatibility using the selected Next version's current documentation and package engines. Use one package manager, npm for a new project. Respect an existing lockfile in an established project.

---

# Part A — Design specification

## Purpose and audience

Show a frontend/software engineer's product thinking, React/TypeScript work and craft to recruiters and engineering hiring managers. Make identity, selected work and professional background understandable immediately. Animation demonstrates frontend skill while preserving access to information.

Known context supplied by the user: Aleksandar Mandić; React and TypeScript; Salesforce Commerce Cloud and LWC experience; enterprise and e-commerce work; a personal project named `saloon-booking`, distinct from Sminkoteka. Prior discussion mentions EPAM and a telecom internal application, but precise current tenure, client identities and publishable results have not been verified for this site. Do not extrapolate dates or public permissions.

## Global constraints

- Stack: Next.js App Router, strict TypeScript, Tailwind CSS, GSAP and @gsap/react.
- Style: dark creative-developer portfolio; typography-led, warm black, ivory and restrained orange.
- Language: English.
- Scope: local MVP only; no deployment, external writes, production data or paid dependencies.
- Content: no invented achievements, metrics, screenshots, customer adoption, URLs or personal contact data.
- Accessibility: semantic HTML, keyboard access, visible focus, reduced-motion support and readable content without JavaScript.
- Motion: GSAP owns animated transforms; do not apply competing Tailwind transform utilities to the same animated node.
- Workflow: sequential implementation; no unsolicited subagent delegation or extra skill installations.

## MVP scope

Included:

1. `/`: header, hero, one featured project, short background section, configured contact links and footer.
2. `/work/saloon-booking`: one honest project-in-progress case study, sourced from local MDX.
3. A bespoke synthetic booking UI illustration, reused coherently between the hero and project section.
4. Two motion sequences: hero composition and a restrained project reveal. Simple link/focus interactions use CSS.
5. Responsive layout, reduced-motion rendering, metadata, error/404 handling and targeted browser checks.

Deferred to iteration two: interactive booking logic, additional case studies, elaborate route transitions, scroll-pinned storytelling, CMS, blog, theme toggle, analytics, contact backend, custom cursor, Lenis, Motion, WebGL, production deployment. The earlier discussion included these as potential directions, not requirements for the first local MVP.

## Page composition

Header: text wordmark `AM`, links `Work`, `About`, `Contact`. These anchor links must also work from the project page using `/#work`, `/#about`, `/#contact`. Keep navigation visible and simple on mobile; three short links do not require a modal menu. Add a skip link to `#main`.

Hero: h1 `Aleksandar Mandić`, role `Frontend Engineer`, short description `React, TypeScript, enterprise and e-commerce interfaces.` Main action `View selected work` links to `#work`. Optional CV link renders only when a real local file is configured. Avoid unverified employment status or "available for work" claims.

Desktop layout at 1024px and above: a 12-column grid, headline across approximately eight columns, layered booking illustration occupying the right five with deliberate overlap into the typography's negative space. Keep the role and primary action clear of the artwork. The surname can occupy a separate line but must not be clipped. The hero is roughly a viewport composition, not a forced full-height panel.

Mobile: name first, role and description next, primary action next, simplified illustration below. Use 24px gutters, increasing to 48–64px on wide screens; content maximum around 1440px. Test 360px width as a first-class layout, not a scaled-down desktop.

Work section: visible label `Selected work`, project name `saloon-booking`, status `Personal project · In progress`, one concise summary, large bespoke visual and a `View project` link. Use one strong project rather than fabricated filler entries. No generic three-column card grid.

About section: brief factual copy about frontend work across React, TypeScript, Salesforce Commerce Cloud and LWC. Technologies appear as readable text, not skill percentages or a logo marquee. Do not publish the telecom client or corporate screenshots.

Contact section: GitHub, LinkedIn, email and CV only if supplied and validated. If none are configured, the local prototype displays `Contact details will be added before launch.` as plain text, with no disabled-looking fake CTA. Record this as a publication blocker. Existing profile links are not guessed from the user's name.

Project page: title, status, short overview, concept illustration, `Problem`, `Product direction`, `My role`, `Current status`, and a return link. `My role` can say `Personal project` until exact responsibility and production implementation evidence are verified. Describe owner-controlled availability and treatment duration as intended product behavior, not shipped guarantees. Clearly label the visual `UI concept — synthetic data` outside any aria-hidden artwork.

## Visual tokens and typography

Suggested starting tokens, subject to visual tuning within the approved direction:

```css
@import "tailwindcss";

@theme {
  --color-canvas: #10100f;
  --color-surface: #1a1a17;
  --color-ink: #f2eee6;
  --color-muted: #b4b0a7;
  --color-accent: #ff6b35;
  --color-line: #3b3b34;
}
```

Use background/text pairs deliberately: dark text on orange buttons; ivory body text on canvas; muted text must meet contrast for its size. Decorative lines may be subtle, but control boundaries/focus must remain visible.

Typography recommendation: Space Grotesk for the name/display, Manrope for body. Use only necessary weights and Latin/Latin Extended coverage, through `next/font` where build networking permits; use licensed local WOFF2 files if available. If font downloads are blocked, use CSS system fallbacks and document the limitation rather than adding unlicensed files or blocking the build. No third decorative monospace font in MVP; system monospace is sufficient for labels.

Suggested desktop display scale: clamp(3.5rem, 9vw, 9rem), tight but readable leading and modest negative tracking. Mobile uses a separate clamp around 2.7–4.5rem and intentional line breaks. Body: 16–18px, approximately 1.6 line-height. Case-study text measure: about 65–72 characters.

No purple/blue neon gradients, floating blobs, fake code terminals, giant generic bento grids, technology marquees, excessive glass panels, stock futuristic 3D objects or looping decoration. Orange is a small accent, not a page-sized glow.

## Visual asset strategy

Build `BookingConcept` with HTML/CSS and small inline SVG only when useful. Use three interface planes: a service selector, a small calendar and a summary. Sample data can show fictional services and a sample date, with no real phone numbers or customer names. These are illustrations, not functioning form controls: render them as decorative markup and provide a nearby text description. Do not introduce focusable fake buttons.

The same component supports `variant: 'hero' | 'project'`; hero has mild perspective, project is flatter and readable. Mark synthetic visuals visibly. Real screenshots can replace this later with owner permission; the MVP must not impersonate an existing screen.

## Motion contract

Hero: one 600–900ms total entry sequence. Animate name lines by a small y offset and the three illustration planes from slightly separated positions into the final composition. No loader, blocked navigation or forced wait. Preserve text in server HTML. Initial CSS must show final readable content; GSAP enhances from that state. Wait for font readiness before text splitting; if font readiness or JS fails, leave the static composition usable.

Use `SplitText` only for the display heading and revert it on cleanup. If it causes a hydration/accessibility problem, use two manually wrapped heading lines instead and record the choice. Accessible heading text must remain exactly one coherent name.

Project reveal: a short opacity/translate animation once on entering the viewport, without pinning or scroll hijacking. Keep the project text and link immediately available.

Pointer response: optional after the two sequences pass QA, limited to fine pointers with hover and at most about 3 degrees of tilt. No device-motion permissions. On pointer exit, return to rest; no permanent RAF loop after idle.

Respect `(prefers-reduced-motion: reduce)` on initial load and when toggled: show final states, no splitting/entrance motion/parallax. Use `gsap.matchMedia()` plus `useGSAP` scoped refs and cleanup. Repeated route navigation and resize must not duplicate animations. Hidden tabs must not run decorative continuous loops.

Native scrolling is retained. Tailwind styles the base layout; GSAP receives dedicated wrapper elements where transform ownership would conflict. Animate transform/opacity first and avoid continuously animating layout measurements.

## Architecture and content

Pages and copy remain Server Components. Client boundaries are limited to animated wrappers. No global state library, backend or database. Local MDX imports only, no untrusted remote MDX. Use Next Link for internal navigation and provide useful 404 handling.

Central profile contract:

```ts
export type Profile = {
  name: string;
  role: string;
  summary: string;
  links: { email?: string; github?: string; linkedin?: string; cvPath?: string };
};

export const profile: Profile = {
  name: 'Aleksandar Mandić',
  role: 'Frontend Engineer',
  summary: 'React, TypeScript, enterprise and e-commerce interfaces.',
  links: {},
};
```

Unspecified link fields are intentionally absent. Render only nonempty, valid configured values; reject malformed URLs rather than exposing broken anchors. External profile links must be HTTPS; email must be a valid address; CV must resolve to a supplied local asset.

Metadata: title and description for both routes. Do not invent a production domain for canonical URLs or social metadata. Add domain-dependent metadata only when the owner supplies the deployment URL. A favicon with the initials is sufficient for MVP. Production-ready OG artwork is a later improvement.

## Definition of done

- Both routes render and internal navigation works.
- The first viewport has clear identity, role, action and a bespoke layered visual.
- No overflow at 360, 390, 768 and 1440px widths; readable at 200% zoom.
- No fake links, downloadable CV placeholders, unsupported claims or unlabeled synthetic visuals.
- Keyboard flow and focus are usable; skip link works; content remains accessible without JavaScript.
- Reduced motion eliminates moving sequences and leaves all content readable.
- Production build, TypeScript and lint pass; browser checks report actual results.
- Actual desktop/mobile screenshots are inspected when tools permit; no "visual QA passed" claim from code inspection alone.
- The README lists setup, current scope, verification and exact missing owner assets.

Performance goals: no mandatory video/WebGL; defer GSAP to interactive boundaries; no unnecessary client hydration of content. Target good Core Web Vitals after publication (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75). Local measurements are diagnostic, not proof of real-user results.

---

# Part B — Portfolio MVP Implementation Plan

> For agentic workers: use the applicable `superpowers:executing-plans` skill if installed to execute sequentially. This handoff does not authorize subagents or skill installation. Respect workspace instructions and the user's current request.

**Goal:** A distinctive, locally running dark portfolio with one honest project case study and polished responsive motion.

**Architecture:** Next Server Components supply content and MDX. Small client wrappers own GSAP sequences. Typed local content controls optional links and project status.

**Tech stack:** Next.js App Router, TypeScript, Tailwind, GSAP, @gsap/react, @next/mdx, Playwright and axe.

**Spec:** Part A of this document; keep both parts together.

**Global constraints:** All eight constraints in Part A apply to every task without exception.

## Review focus

1. Narrow viewport / enlarged text: name, nav and illustration must not create horizontal scrolling (Tasks 1, 4).
2. Reduced-motion preference changes: final content remains visible with no transforms left behind (Tasks 3, 4).
3. JS or animation initialization failure: identity and navigation remain available (Tasks 1, 4).
4. Repeated route navigation / resize: no duplicate animation setup or console exceptions (Tasks 3, 4).
5. Missing owner assets: no broken CV/contact links or fabricated evidence (Tasks 2, 4).

## File responsibility map

| File | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Fonts, global metadata, shared header/footer |
| `src/app/globals.css` | Tailwind import, tokens, minimal global accessibility/effect CSS |
| `src/app/page.tsx` | Home page server composition |
| `src/app/work/saloon-booking/page.tsx` | Server-rendered case-study wrapper and route metadata |
| `src/app/not-found.tsx` | Clear recovery link |
| `src/components/site-header.tsx` | Navigation and skip link |
| `src/components/site-footer.tsx` | Short attribution, no fictional social links |
| `src/components/hero.tsx` | Hero content and composition |
| `src/components/booking-concept.tsx` | Decorative synthetic product UI |
| `src/components/featured-work.tsx` | Single project presentation |
| `src/components/about.tsx` | Factual professional context |
| `src/components/contact.tsx` | Optional configured contact links |
| `src/components/motion/hero-motion.tsx` | Isolated hero animation lifecycle |
| `src/components/motion/project-reveal.tsx` | Isolated ScrollTrigger enhancement |
| `src/content/profile.ts` | Profile type and verified copy |
| `src/content/saloon-booking.mdx` | Case-study prose with honest status |
| `src/mdx-components.tsx` | Accessible MDX element styling |
| `next.config.ts` or generated equivalent | MDX integration |
| `playwright.config.ts` | Reproducible local browser checks |
| `tests/portfolio.spec.ts` | Meaningful route/accessibility/responsive checks |
| `README.md` | Setup, results, owner assets and next step |

Use the actual generated config extension; do not create two conflicting Next config files. Add no abstraction without a real consumer.

## Task 1 — Static visual foundation

**Interfaces:** `BookingConcept({ variant }: { variant: 'hero' | 'project' })`; `Hero()`; `SiteHeader()`; `SiteFooter()`; profile contract from Part A.

- [x] Inspect repo, instructions, Node version and lockfile; confirm this workspace has no `.git` directory or Git CLI. Preserve unrelated work.
- [x] Skip scaffolding because this workspace already contained a Next.js app. Keep strict TypeScript.
- [x] Implement the profile contract, Tailwind tokens and global focus/skip-link treatment. Add semantic header/main/footer and the hero composition from Part A.
- [x] Implement the three decorative booking planes, including the visible synthetic-data label outside aria-hidden artwork. No stock image dependency.
- [x] Add minimal Work/About/Contact sections with the specified factual copy so all header anchors resolve immediately.
- [x] Run `npm run dev`; inspect at 1440x1000, 390x844 and 360px. Check a 720px CSS viewport as the 200% desktop zoom reflow equivalent. Fix overlap and clipping rather than hiding overflow at the body level. Native browser zoom remains unverified.
- [x] Confirm content is readable with JavaScript disabled. Use real final-state CSS before adding motion.

This task delivers a usable static home page. Do not polish animation until hierarchy, spacing and mobile composition are coherent.

## Task 2 — Project route and truthful content

**Interfaces:** `FeaturedWork()` links to `/work/saloon-booking`; `Contact({ links }: { links: Profile['links'] })` consumes the central profile. Import local MDX into the project server page.

- [x] Install MDX support with `@next/mdx` matching the installed Next version, plus `@mdx-js/loader`, `@mdx-js/react` and development types `@types/mdx`.
- [x] Wire the generated Next config with `createMDX` and add `src/mdx-components.tsx` as required by App Router. Preserve existing config values.

Example config shape (adapt to the existing extension):

```ts
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
const config: NextConfig = { pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'] };
export default createMDX()(config);
```

- [x] Write the MDX sections specified in Part A with conservative language. Include this status text: `This personal project is in progress. The visual shown here is a UI concept using synthetic data.` Do not claim overlap rejection, reminders, customer usage or deployed functionality without inspected evidence.
- [x] Render the project page with metadata, a breadcrumb/back link and the `BookingConcept` project variant.
- [x] Render configured contact links only. With the initial empty links object, show the specified local-prototype message. Add a useful not-found page.
- [x] Verify direct loading of the project URL and navigation back to all three home anchors. Verify there are no dead href="#" controls or missing PDF requests.

## Task 3 — Motion enhancement

**Interfaces:** `HeroMotion({ children }: { children: React.ReactNode })` scopes elements marked `data-hero-line` and `data-hero-plane`; `ProjectReveal({ children }: { children: React.ReactNode })` scopes its own root. Keep selectors local.

- [x] Install `gsap` and `@gsap/react` with compatible stable versions and retain the lockfile.
- [x] Implement the hero timeline with `useGSAP`, refs and `gsap.matchMedia`. Total entry sequence stays under 900ms. A final readable state exists before animation initialization.
- [x] Add SplitText to the heading only if its accessible name, font readiness and cleanup work correctly. Otherwise use manual line wrappers as permitted in the spec.
- [x] Implement one project reveal with ScrollTrigger. Avoid pinned sections and off-screen hiding of essential links.
- [x] Add reduced-motion handling for both wrappers, including preference changes, and confirm cleanup when unmounted. Use `contextSafe` for delayed/event-created GSAP animations where needed.
- [x] Exercise home -> project -> home three times, then resize. Confirm no duplicate wrappers, leftover inline transforms or browser errors. Check the same flow with reduced motion.
- [x] Inspect the actual animation in a browser. Static screenshots alone cannot establish motion quality. If browser execution is unavailable, report that verification gap explicitly.

Do not add Lenis, Motion, WebGL or route-transition systems. Optional pointer tilt is not a completion requirement.

## Task 4 — Verification and local handoff

**Interfaces:** npm scripts `lint`, `typecheck`, `test:e2e`; Playwright uses a localhost dev server at port 3000. Reuse existing equivalents if present.

- [x] Install dev dependencies `@playwright/test` and `@axe-core/playwright`; install the Chromium browser using `npx playwright install chromium` when allowed by the local environment.
- [x] Configure `testDir: './tests'`, `use.baseURL: 'http://localhost:3000'`, and a `webServer` running `npm run dev -- --port 3000`. Reuse a running server only outside CI.
- [x] Add or preserve script equivalents: `lint: eslint .`, `typecheck: tsc --noEmit`, `test:e2e: playwright test`. Do not use deprecated `next lint` assumptions.
- [x] Add these core behavior checks to `tests/portfolio.spec.ts`; run them, then fix the specific failures:

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('identity, project and return navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aleksandar Mandić');
  await page.getByRole('link', { name: 'View project', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/saloon-booking$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('saloon-booking');
  await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
});

test('narrow layouts do not overflow on either route', async ({ page }) => {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/work/saloon-booking']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflows = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      );
      expect(overflows, `${route} at ${width}px`).toBe(false);
    }
  }
});

test('reduced motion and repeat navigation stay usable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (let i = 0; i < 3; i++) {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aleksandar Mandić');
    await page.getByRole('link', { name: 'View project', exact: true }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aleksandar Mandić');
  expect(errors).toEqual([]);
});

test('no dead anchors or fabricated downloads when links are unconfigured', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('a[download]')).toHaveCount(0);
  await expect(page.getByText('Contact details will be added before launch.', { exact: true })).toBeVisible();
});

test('basic accessibility on both routes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/work/saloon-booking']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
  }
});

test('core content and links survive without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aleksandar Mandić');
  await page.getByRole('link', { name: 'View project', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('saloon-booking');
  await context.close();
});
```

These checks do not prove visual/motion quality. Manually inspect the final no-motion state, keyboard focus, skip link, 200% zoom, touch layout and font wrapping. Update the missing-link test when real owner links are supplied; do not remove the requirement for valid links.

- [x] Run `npm run lint`, `npm run typecheck`, `npm run test:e2e`, `npm run build`. Re-run typecheck after build if the installed Next version relies on generated types. Report failures accurately; fix within scope.
- [x] Inspect at least one actual desktop and one actual mobile screenshot per route. Check rendering after all font loads. Review runtime console errors and failed asset requests.
- [x] Use a browser performance trace to check for long animation tasks and obvious layout shifts. Optional Lighthouse is diagnostic; do not spend the MVP budget chasing a score of 100 or claim field INP from a lab score.
- [x] Document the working local URL, scripts, actual test results, selected dependency versions and next actions in README. Mark milestones complete only with evidence.
- [x] List owner inputs still needed for publication: real email/GitHub/LinkedIn, CV PDF, approved project screenshots, verified role/outcomes and production domain.

Do not push or publish. Local commits may be made only when allowed by the user's workspace instructions; stage exact task files and preserve unrelated changes. The final response must distinguish "local MVP works" from "public portfolio ready".

## Future iteration, after visual review

First review the home page on desktop and phone. Adjust composition, typography or motion before expanding scope. Then add a self-contained synthetic booking interaction, verified case-study evidence and one additional approved project. Public hosting is a separate explicit task.

## Local implementation record — 2026-09-25

- Milestones 1–4 were implemented sequentially in the existing Next.js workspace. No scaffold, deployment, push, production access, subagent, skill install or plugin install was used.
- This directory has no `.git` metadata and the Git CLI is unavailable, so no status, commit or branch operation could be performed.
- The heading uses manual line wrappers; SplitText was unnecessary. The entry frames were inspected in Chromium. An initial low-opacity heading was corrected so the name stays legible during motion.
- Browser captures of both routes at 1440px, 390px and 360px are generated in ignored `test-results/visual/`. A 720 CSS-pixel viewport was inspected as a 200% desktop zoom reflow proxy; native browser zoom could not be changed by the headless Chromium shortcut.
- The local performance trace is generated at `test-results/visual/performance-trace.zip`. One long task and a layout shift sum of about 0.017 were observed in the dev-server trace; these are diagnostic values only.
- Final verification: `npm run lint`, `npm run typecheck` (including after build), `npm run build` and all 14 Playwright browser tests passed on 2026-09-25. The build statically prerendered both routes.
- Contact links and a CV remain absent by design. Publication still needs verified owner contact details, a real CV, approved project evidence, confirmed role and outcomes, and a production domain.

## Contact amendment — 2026-09-28

The owner supplied an email address, phone number, LinkedIn URL, GitHub URL and CV for this local portfolio. The contact section now renders validated links for all five; `Profile.links` includes an optional phone number. The supplied one-page PDF was copied byte for byte to `public/Aleksandar_Mandic_CV.pdf` and linked from the page. The CV contains client and employment details that were not added to the site copy. Before deployment, review any client-disclosure restrictions in the CV; project evidence and a production domain remain outstanding.

Verification on 2026-09-28: lint, production build, post-build TypeScript check and all 14 Playwright tests passed. Desktop and phone contact renders were inspected. Browser-native 200% zoom remains unverified; a 720px CSS viewport proxy passed.

## Documentation references

Consult current official documentation if implementation APIs differ. These were checked while preparing this handoff; the selected installed versions remain authoritative.

- Next scaffold: https://nextjs.org/docs/app/api-reference/cli/create-next-app
- Next server/client boundaries: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next MDX: https://nextjs.org/docs/app/guides/mdx
- Tailwind theme tokens: https://tailwindcss.com/docs/theme
- GSAP React integration: https://github.com/greensock/react
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP SplitText: https://gsap.com/docs/v3/Plugins/SplitText/
- Playwright accessibility: https://playwright.dev/docs/accessibility-testing
- Core Web Vitals: https://web.dev/articles/vitals


## Animation refinement ? 2026-09-28

Refined the existing HeroMotion and ProjectReveal boundaries, BookingConcept markup and global interaction CSS without changing content, typography or page layout. Hero timing is 820ms desktop / 640ms mobile; independent opaque planes assemble with restrained offsets and desktop depth via scale. The featured scene uses one unpinned ScrollTrigger and follows with selected service/date/summary detail reveals on desktop. Project text and navigation do not animate. CSS perspective and GSAP transforms now belong to separate elements. Keyboard-focus feedback matches link hover; reduced motion removes movement immediately and media changes do not replay completed entrances.

Verification: lint, build, post-build TypeScript and all 18 Playwright Chromium tests passed. Added tests cover motion-enabled repeated navigation at desktop/mobile widths, interruption by reduced motion, breakpoint changes and focus feedback. Intermediate browser frames and settled desktop/mobile renders were inspected; a transient panel-transparency issue was corrected. No console errors were recorded by the lifecycle tests. Physical-device playback, other browser engines and native browser 200% zoom remain visual-review gaps. No deployment or publication was performed. See README for capture paths and timing details.
