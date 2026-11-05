"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./site-header.module.css";

const navigationLinkClassName =
  "inline-flex items-center justify-center gap-2.5 min-h-11 px-4 rounded-[0.875rem] text-muted touch-manipulation [-webkit-tap-highlight-color:transparent] [transition:color_160ms_ease-out,_background-color_160ms_ease-out,_transform_100ms_ease-out] active:[background:color-mix(in_srgb,_var(--color-ink)_14%,_transparent)] active:text-ink [@media(hover:hover)_and_(pointer:fine)]:hover:[background:color-mix(in_srgb,_var(--color-ink)_7%,_transparent)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink [@media(prefers-reduced-motion:no-preference)]:active:[transform:scale(0.97)] [@media(max-width:480px)]:px-2.5 focus-visible:[outline-offset:3px]";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateSurface = () => {
      if (headerRef.current) {
        headerRef.current.dataset.scrolled = String(window.scrollY > 24);
      }
    };
    updateSurface();
    window.addEventListener("scroll", updateSurface, { passive: true });
    return () => window.removeEventListener("scroll", updateSurface);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={`wrap site-header sticky [top:max(1rem,_env(safe-area-inset-top))] z-50 flex items-center justify-between gap-4 min-h-16 mt-4 p-[0.5rem_0.625rem_0.5rem_1.25rem] rounded-[1.25rem] [@media(max-width:480px)]:gap-2 [@media(max-width:480px)]:pl-3.5 ${styles.surface}`}
      >
        <Link
          href="/"
          aria-label="Aleksandar Mandić, home"
          className="wordmark display inline-flex items-center min-h-11 text-[1.5rem] leading-none tracking-[-0.055em] focus-visible:[outline-offset:3px]"
        >
          AM<span className="accent">.</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-1.5 text-[0.8125rem] font-semibold [@media(max-width:480px)]:gap-0.5"
        >
          <Link href="/#work" className={navigationLinkClassName}>
            Work
          </Link>
          <Link href="/#about" className={navigationLinkClassName}>
            About
          </Link>
          <Link
            href="/#contact"
            className="header-contact inline-flex items-center justify-center gap-2.5 min-h-11 px-4 rounded-[0.875rem] text-canvas touch-manipulation [-webkit-tap-highlight-color:transparent] [transition:color_160ms_ease-out,_background-color_160ms_ease-out,_transform_100ms_ease-out] active:bg-contact-pressed active:text-canvas [@media(hover:hover)_and_(pointer:fine)]:hover:bg-contact-hover [@media(hover:hover)_and_(pointer:fine)]:hover:text-canvas [@media(prefers-reduced-motion:no-preference)]:active:[transform:scale(0.97)] [@media(max-width:480px)]:px-2.5 ml-2 bg-ink font-bold [@media(max-width:480px)]:ml-0.5 [@media(max-width:480px)]:gap-1.5 focus-visible:[outline-offset:3px]"
          >
            Contact
          </Link>
        </nav>
      </header>
    </>
  );
}
