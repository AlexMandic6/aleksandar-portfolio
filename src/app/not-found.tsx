import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="wrap not-found [&_h1]:text-[clamp(3rem,_7vw,_7rem)] [&_h1]:leading-none [&_h1]:m-[2rem_0] [&_p:not(.eyebrow)]:text-muted [&_p:not(.eyebrow)]:mb-8 min-h-[65vh] py-36"
    >
      <p className="eyebrow accent">404 / Page not found</p>
      <h1 className="display">There’s nothing here.</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <Link href="/" className="text-link">
        Return home{" "}
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
    </main>
  );
}
