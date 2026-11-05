"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      className="wrap not-found [&_h1]:text-[clamp(3rem,_7vw,_7rem)] [&_h1]:leading-none [&_h1]:m-[2rem_0] [&_p:not(.eyebrow)]:text-muted [&_p:not(.eyebrow)]:mb-8 min-h-[65vh] py-36"
    >
      <p className="eyebrow accent">Something went wrong</p>
      <h1 className="display">This page could not load.</h1>
      <p>Try again, or return to the home page.</p>
      <div className="error-actions flex flex-wrap gap-8">
        <button className="text-link" onClick={reset}>
          Try again{" "}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </button>
        <Link href="/" className="text-link">
          Return home{" "}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </main>
  );
}
