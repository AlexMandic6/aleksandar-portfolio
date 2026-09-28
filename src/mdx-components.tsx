import type { MDXComponents } from "mdx/types";

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => <h2 className="case-heading display">{children}</h2>,
  p: ({ children }: { children?: React.ReactNode }) => <p className="case-paragraph">{children}</p>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
