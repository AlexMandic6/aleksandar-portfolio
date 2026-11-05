import type { MDXComponents } from "mdx/types";

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="case-heading display text-[clamp(2rem,_3.7vw,_3.3rem)] leading-[1.1] m-[4rem_0_1rem] pt-6 [border-top:1px_solid_var(--color-line)]">
      {children}
    </h2>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="case-paragraph [&_+_.case-paragraph]:mt-4 max-w-[70ch] text-muted text-[1.05rem] leading-[1.8]">
      {children}
    </p>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
