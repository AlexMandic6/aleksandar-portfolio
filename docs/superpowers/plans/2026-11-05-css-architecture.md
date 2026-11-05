# CSS Architecture Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development for this integrated migration. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the three approved CSS architecture improvements without changing the portfolio's rendered appearance or behavior.

**Architecture:** Use Tailwind utilities for ordinary presentation across both routes, retain scoped CSS for complex visuals, and keep shared foundations global. Keep `src/styles/colors.ts` authoritative for named Tailwind color tokens, inline SVG, favicon, and WebGL. Consolidate the hand-curated Tech stack showcase metadata.

**Tech Stack:** Next.js 16.4.3, React 19, Tailwind 4, TypeScript, GSAP, Playwright, pnpm.

**Spec:** `docs/adr/0001-portfolio-presentation-ownership.md`

## Global Constraints

- Preserve current appearance, responsive layouts, accessibility, content, and motion on both routes.
- Preserve the existing user edit `mouseStrength={0.3}` in `src/components/hero-background.tsx`.
- Retain `colors.ts` as the single editable palette; expose named Tailwind tokens without copying raw colors.
- Remove unused shadcn and tw-animate-css setup and dependencies; retain Tailwind Preflight and accessibility utilities.
- Use the installed Next.js CSS guide before editing code.
- Keep GSAP property ownership and stable motion/test hooks; private selector migration must update dependent consumers.
- Preserve exact Tech stack coordinates, paths, ordering, colors, and responsive geometry.
- Work in the supplied checkout; leave changes uncommitted for user review. Do not publish, push, or modify GitHub issues.

## Review Focus

- CSS cascade: unlayered custom rules can override Tailwind utilities; removed defaults may affect borders, fonts, and controls.
- Responsive transitions: preserve exact 767/768 and 1023/1024 behavior and existing small-screen overrides.
- Interaction states: keyboard focus, pointer hover, touch press, reduced motion, and contrast preferences remain functional.
- Rendering: both routes remain legible without JavaScript; route navigation must not leak private styles.
- Diagram identity: each node, connection, and animated pulse retain their association without separate positional arrays.

## Task 1: Integrated styling migration

**Files:** Modify `src/app/globals.css`, relevant `src/app/**/*.tsx`, `src/components/**/*.tsx`, local CSS, `src/mdx-components.tsx`, `src/styles/colors.ts` only as needed, `package.json`, and `pnpm-lock.yaml`. Retain/introduce scoped CSS only for complex visuals. Existing tests in `tests/` are the verification surface; update hooks only where necessary.

**Interfaces:** Keep exported React module props, semantic markup, route paths, stable data hooks, and `colors` / `colorVariables` consumers compatible. Consolidate tech identity, labels, node position, path, and color in one record collection; runtime coordinates may enter scoped CSS through typed custom properties.

- [x] Capture before renders and computed presentation for both routes using stable fonts and reduced motion (controller owns baseline capture).
- [x] Reconcile theme ownership: keep original effective colors/fonts, expose palette-backed named theme tokens, remove shadcn scaffolding, and remove its unused dependencies with pnpm.
- [x] Migrate ordinary layout, spacing, typography, and states to static Tailwind class names across both routes. Preserve exact values with arbitrary utilities where needed. Shared primitives may remain global; avoid a new abstraction library or bulk `@apply` masquerading as migration.
- [x] Keep complex visual CSS scoped. Preserve motion and test hooks deliberately; keep GhostFibers vendor implementation intact.
- [x] Consolidate the Tech stack showcase metadata without recomputing its hand-designed curves or placements.
- [x] Run formatting on modified files, typecheck, lint, and production build. Run existing Playwright portfolio, visual, motion, hero-background, and tech-stack checks; use focused checks while iterating. No implementation-mirroring tests are needed for this behavior-preserving refactor.
- [x] Compare before/after screenshots and computed styles; fix material differences before completion. Verify production CSS order as well as development rendering.
- [x] Self-review and report changed files, command outcomes, unresolved concerns, and baseline comparisons to the controller. Leave all changes uncommitted.

## Verification Outcome

- Final development and production renders are pixel-identical to the original baseline on both routes at 320, 360, 390, 768, 1024, and 1440px. Node counts and geometry match; no overflow or page errors.
- Final production build, typecheck, changed-file ESLint, formatting, and independent review pass.
- Browser suite: 23 scenarios passed at default settings. Desktop motion passed an isolated retry with a 60-second test budget; the tech pulse screenshot test passed with a 20-second expectation budget. Their original default-timeout failures remain documented; repository tests and production motion were not altered to mask them.
- Full lint still reports the pre-existing `react-hooks/refs` violation in `ghost-fibers.tsx:748`; its content is identical to HEAD.

## Execution Rulings

- User approved implementation and model delegation after completing the design interview; proceed without another plan approval round.
- One integrated implementer uses GPT-6.1 Sol medium because the files and cascade are coupled. A separate final reviewer checks the whole diff; avoid duplicated per-pass review seats.
- Keep the user's existing checkout and running dev server. Creating a second worktree would require copying uncommitted work and dependencies without improving this local review workflow.
