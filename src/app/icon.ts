import { colors } from "@/styles/colors";

export const size = { width: 64, height: 64 };
export const contentType = "image/svg+xml";

export default function Icon() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="${colors.canvas}"/>
      <path d="M10 44 25 18h7l15 26h-8l-3-6H21l-3 6h-8Zm14-12h9l-4.5-8L24 32Z" fill="${colors.ink}"/>
      <circle cx="51" cy="42" r="4" fill="${colors.accent}"/>
    </svg>`,
    { headers: { "Content-Type": contentType } },
  );
}
