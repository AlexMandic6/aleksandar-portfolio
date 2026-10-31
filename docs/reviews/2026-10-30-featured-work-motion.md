# Selected work: motion opportunities

Scope: `FeaturedWork` and its styles, inspected on 2026-10-30. This is a read-only motion assessment; it does not implement animation.

## Opportunities

| #   | Location | Today | Purpose | Frequency | Suggested motion |
| --- | -------- | ----- | ------- | --------- | ---------------- |

No candidate passes all four gates. This section presents static work stories, without state changes, controls, overlays or gestures. It has no interaction that needs motion feedback. Existing GSAP hero motion provides the page's introduction; no additional dependency is needed.

## Rejected candidates

- `src/components/featured-work.tsx`, project cards: hover lift or press scale. Frequency would be occasional, and 160ms would fit the budget, but **purpose fails**: the cards are not links or controls. Motion would suggest an unavailable action.
- `src/components/featured-work.tsx`, technology badges: stagger, bounce or hover scaling. These appear once per visit, but **function fails**: technologies are information visitors need to scan, not interactive elements.
- `src/app/globals.css`, date rail: animated line drawing. Rare exposure qualifies for the frequency budget, but **purpose fails**: movement would add no explanation to an already labelled chronological list.
- `src/components/featured-work.tsx`, client logos: looping shimmer or rotation. **Function fails**: a continuous effect would compete with the work descriptions and brand identification.
- `src/components/featured-work.tsx`, card entrance: opacity and translation stagger. Rare exposure would allow delight, and a 240ms entrance would fit the speed budget, but **function fails here**: the stories already arrive naturally through scrolling, and hiding their initial state adds no useful information.

## Verdict

This section needs visual hierarchy more than motion. Dates, consistent logo panels, stronger titles and readable stack badges improve the presentation while keeping the content stable. There is no motion handoff to implement. If an expandable case study is added later, assess that state transition separately with `improve-animations plan <suggestion>`.
