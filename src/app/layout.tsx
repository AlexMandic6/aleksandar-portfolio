import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Aleksandar Mandić — Frontend Engineer", template: "%s | Aleksandar Mandić" },
  description: "React, TypeScript, enterprise and e-commerce interfaces. Selected work and background of Aleksandar Mandić.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
