// Header.tsx — Global sticky navigation bar for the Kapt platform.
// Renders: Logo (left) | Nav links (center) | ENTRAR CTA (right)
// No search bar. Supersedes the partial Navbar.tsx component.

import Link from "next/link";

// Navigation links — PT-BR labels per CLAUDE.md UI standard
const NAV_LINKS = [
  { label: "COBERTURAS", href: "/coberturas" },
  { label: "BLOG", href: "/blog" },
  { label: "SOBRE", href: "/sobre" },
];

export function Header() {
  return (
    // Sticky header with backdrop-blur for a premium feel when scrolling
    <header className="sticky top-0 z-50 w-full border-b border-pavement/40 bg-asphalt/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* ── LEFT: Kapt Logotype ── */}
        <Link
          href="/"
          className="font-mono text-xl font-black italic tracking-tight text-white transition-colors duration-kapt ease-kapt hover:text-volt"
          aria-label="Kapt — página inicial"
        >
          KAPT
        </Link>

        {/* ── CENTER: Navigation Links ── */}
        <nav className="flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={[
                // Base styles
                "relative text-[11px] font-bold tracking-widest text-zinc-200",
                // Hover: color + micro-lift
                "transition-[color,transform] duration-kapt ease-kapt",
                "hover:text-volt hover:-translate-y-0.5",
                // Animated underline via pseudo-element (CSS approach via Tailwind)
                "after:absolute after:bottom-0 after:left-0 after:right-0",
                "after:h-px after:bg-volt/40 after:content-['']",
                "after:origin-center after:scale-x-0",
                "after:transition-transform after:duration-kapt after:delay-[50ms]",
                "hover:after:scale-x-100",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── RIGHT: ENTRAR CTA Button ── */}
        <Link
          href="/auth"
          className={[
            "rounded-card bg-volt px-5 py-2",
            "font-mono text-[11px] font-black tracking-widest text-asphalt uppercase",
            // Hover: invert to outline style
            "border border-volt",
            "transition-[background-color,color] duration-kapt ease-kapt",
            "hover:bg-transparent hover:text-volt",
          ].join(" ")}
        >
          ENTRAR
        </Link>

      </div>
    </header>
  );
}
