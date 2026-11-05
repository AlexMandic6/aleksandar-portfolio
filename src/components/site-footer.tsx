export function SiteFooter() {
  return (
    <footer className="wrap site-footer flex flex-wrap justify-between gap-4 [border-top:1px_solid_var(--color-line)] py-[1.8rem] text-muted text-[0.75rem]">
      <span>© {new Date().getFullYear()} Aleksandar Mandić</span>
      <span>Designed and built with care.</span>
    </footer>
  );
}
