// Footer.tsx — Global 3-column footer for the Kapt platform.
// Columns: (1) Brand & tagline | (2) Navigation | (3) Legal & social links

import Link from "next/link";

// Primary navigation links — mirrors Header nav
const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Coberturas", href: "/coberturas" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
];

// Social / legal links — placeholder hrefs until social profiles are live
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/kaptoficial" },
  { label: "LinkedIn", href: "https://linkedin.com/company/kapt" },
];

export function Footer() {
  // Dynamic year keeps copyright always current
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-pavement bg-asphalt">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* ── 3-Column Grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Column 1 — Brand & Tagline */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="w-fit font-mono text-lg font-black italic tracking-tight text-white transition-colors duration-kapt ease-kapt hover:text-volt"
              aria-label="Kapt — página inicial"
            >
              KAPT
            </Link>
            <p className="max-w-[200px] text-xs leading-relaxed text-zinc-500">
              Conectando emoção e performance através da fotografia esportiva.
            </p>
          </div>

          {/* Column 2 — Page Navigation */}
          <div className="flex flex-col gap-1">
            <p className="mb-3 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
              Navegação
            </p>
            <nav className="flex flex-col gap-2" aria-label="Links de navegação do rodapé">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs font-medium text-zinc-400 transition-colors duration-kapt ease-kapt hover:text-volt"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Legal & Social */}
          <div className="flex flex-col gap-1">
            <p className="mb-3 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
              Social
            </p>
            <nav className="flex flex-col gap-2" aria-label="Links sociais">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-zinc-400 transition-colors duration-kapt ease-kapt hover:text-volt"
                >
                  {label} ↗
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Copyright Bar ── */}
        <div className="mt-10 border-t border-pavement/50 pt-6">
          <p className="font-mono text-[11px] tracking-wide text-zinc-600">
            © {year} Kapt. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
