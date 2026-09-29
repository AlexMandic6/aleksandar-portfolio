"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "./site-header.css";

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

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header ref={headerRef} className="wrap site-header">
      <Link href="/" aria-label="Aleksandar Mandić, home" className="wordmark display">AM<span className="accent">.</span></Link>
      <nav aria-label="Primary">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="header-contact">Contact</Link>
      </nav>
    </header>
  </>;
}
