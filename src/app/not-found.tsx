import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="wrap not-found"><p className="eyebrow accent">404 / Page not found</p><h1 className="display">There’s nothing here.</h1><p>The page may have moved, or the address may be incorrect.</p><Link href="/" className="text-link">Return home <span className="arrow" aria-hidden="true">↗</span></Link></main>;
}
