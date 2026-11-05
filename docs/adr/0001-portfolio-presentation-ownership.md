# Portfolio presentation ownership

Use Tailwind as the portfolio's primary styling approach rather than expanding CSS Modules as the default. This places ordinary styling beside the markup that uses it; the migration must preserve the current appearance, responsive layouts, accessibility, and motion.

Apply Tailwind to layout, spacing, typography, and interaction states across both routes. Retain small scoped stylesheets for complex artwork, selectors, and animation-specific rules where CSS is clearer; keep genuinely shared foundations global.

Keep `src/styles/colors.ts` as the authoritative editable palette for CSS, inline SVG, the favicon, and WebGL. Tailwind consumes this palette through named theme tokens so that changing a color remains a single edit.

Remove the unused shadcn setup. The portfolio's styling should express its own visual design without a competing generated theme.

Keep the Tech stack showcase deliberately composed. Consolidate each technology's identity, position, connection curve, and color association while preserving the existing composition; placement remains explicitly designed when technologies change.
