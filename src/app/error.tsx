"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className="wrap not-found"><p className="eyebrow accent">Something went wrong</p><h1 className="display">This page could not load.</h1><p>Try again, or return to the home page.</p><div className="error-actions"><button className="text-link" onClick={reset}>Try again <span className="arrow" aria-hidden="true">↗</span></button><Link href="/" className="text-link">Return home <span className="arrow" aria-hidden="true">↗</span></Link></div></main>;
}
