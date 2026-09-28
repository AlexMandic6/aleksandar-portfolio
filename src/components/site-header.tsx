import Link from "next/link";

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="wrap site-header">
      <Link href="/" aria-label="Aleksandar Mandić, home" className="wordmark display">AM<span className="accent">.</span></Link>
      <nav aria-label="Primary"><Link href="/#work">Work</Link><Link href="/#about">About</Link><Link href="/#contact">Contact</Link></nav>
    </header>
  </>;
}
