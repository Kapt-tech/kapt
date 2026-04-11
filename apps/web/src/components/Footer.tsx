"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Instagram, Linkedin } from "lucide-react";

const navLinks = [
  { name: "COBERTURAS", href: "/" },
  { name: "BLOG", href: "/blog" },
  { name: "SOBRE", href: "/sobre" },
];

export function Footer() {
  const pathname = usePathname();
  const normalizedPath = pathname ? pathname.replace(/\/$/, "") || "/" : "/";

  const baseNavClasses =
    "relative inline-block w-fit self-start text-left text-zinc-200 text-[11px] font-bold tracking-widest uppercase pb-2 whitespace-nowrap transition-[color,transform] duration-[180ms] ease-out after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:bg-transparent after:transition-colors after:duration-[180ms]";
  const hoverNavClasses = "hover:text-actionVolt/80 hover:-translate-y-0.5 hover:after:bg-actionVolt/60";
  const activeNavClasses =
    "text-actionVolt cursor-default pointer-events-none after:bg-transparent !text-actionVolt";

  return (
    <footer className="bg-asphaltBlack border-t border-white/20">
      <div className="max-w-[1440px] mx-auto px-0 md:px-1 py-12 grid grid-cols-1 gap-12 md:grid-cols-3 font-mono justify-between">
        <div className="space-y-4 md:justify-self-start">
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-zinc-400 whitespace-nowrap">
            Mapa do site
          </p>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const normalizedHref = link.href === "/" ? "/" : link.href.replace(/\/$/, "");
              const isActive =
                normalizedPath === normalizedHref ||
                (normalizedHref !== "/" && normalizedPath.startsWith(`${normalizedHref}/`));

              if (isActive) {
                return (
                  <span key={link.name} className={`${baseNavClasses} ${activeNavClasses}`}>
                    {link.name}
                  </span>
                );
              }

              return (
                <Link key={link.name} href={link.href} className={`${baseNavClasses} ${hoverNavClasses}`}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-t border-[#3a3a3a] w-full" />
          <a
            href="/fotografar"
            className="inline-flex items-center gap-2 rounded-lg border border-actionVolt px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-actionVolt transition-all duration-200 hover:bg-actionVolt hover:text-black hover:shadow-[0_0_18px_rgba(206,255,0,0.35)] whitespace-nowrap"
          >
            <Camera size={14} className="text-current" />
            Quer fotografar?
          </a>
        </div>

        <div className="space-y-4 md:flex md:flex-col md:items-start md:text-left md:justify-self-center">
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-zinc-400 whitespace-nowrap">
            Siga-nos nas redes sociais
          </p>
          <div className="flex flex-col gap-3 text-[12px] text-zinc-200">
            <Link
              href="https://instagram.com/kapt.life"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-actionVolt/80 transition-colors whitespace-nowrap"
            >
              <Instagram size={14} className="text-actionVolt" />
              @kapt.life
            </Link>
            <Link
              href="https://linkedin.com/company/kapt"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-actionVolt/80 transition-colors whitespace-nowrap"
            >
              <Linkedin size={14} className="text-actionVolt" />
              Kapt
            </Link>
          </div>
        </div>

        <div className="space-y-4 md:flex md:flex-col md:items-center md:text-center md:justify-self-end md:ml-auto">
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-zinc-400 whitespace-nowrap">
            Precisa de ajuda?
          </p>
          <a
            href="https://wa.me/00000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-[#1f7a4e] bg-[#0b130f] px-5 py-3 text-[12px] font-bold uppercase tracking-widest text-white shadow-[0_0_0_1px_rgba(31,122,78,0.25),0_12px_40px_-20px_rgba(31,122,78,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(31,122,78,0.45),0_18px_55px_-20px_rgba(31,122,78,0.6)] whitespace-nowrap"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center text-[#2bd66f]">
              <svg
                viewBox="0 0 32 32"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M16 3.2c-7.06 0-12.8 5.5-12.8 12.28 0 2.16.6 4.26 1.74 6.1L3 29l7.7-1.96c1.77.96 3.77 1.46 5.3 1.46 7.06 0 12.8-5.5 12.8-12.28S23.06 3.2 16 3.2zm0 22.32c-1.34 0-3.1-.5-4.7-1.5l-.34-.2-4.58 1.16 1.22-4.4-.22-.34c-1.04-1.6-1.56-3.3-1.56-4.98 0-5.18 4.52-9.4 10.18-9.4s10.18 4.22 10.18 9.4S21.66 25.52 16 25.52zm5.72-6.86c-.32-.16-1.9-.92-2.2-1.02-.3-.1-.52-.16-.74.16-.22.32-.86 1.02-1.06 1.24-.2.22-.4.24-.72.08-.32-.16-1.34-.48-2.54-1.52-.94-.8-1.58-1.8-1.76-2.1-.18-.32-.02-.5.14-.66.14-.14.32-.32.48-.5.16-.18.22-.3.34-.5.12-.2.06-.38-.02-.54-.08-.16-.74-1.72-1.02-2.36-.26-.62-.54-.54-.74-.54h-.64c-.22 0-.56.08-.86.38-.3.3-1.12 1.08-1.12 2.62 0 1.54 1.14 3.02 1.3 3.24.16.22 2.24 3.5 5.48 4.78.76.32 1.36.5 1.82.64.76.22 1.46.2 2.02.12.62-.1 1.9-.74 2.16-1.46.26-.72.26-1.34.18-1.46-.08-.12-.3-.2-.62-.36z"
                />
              </svg>
            </span>
            Suporte via WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="max-w-[1440px] mx-auto px-0 md:px-1 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-zinc-400">
          <span>© Kapt 2026.</span>
          <div className="flex items-center gap-2">
            <Link
              href="/politica-de-privacidade"
              className="text-zinc-300 transition-colors hover:text-actionVolt"
            >
              Política de Privacidade
            </Link>
            <span className="opacity-40">•</span>
            <Link
              href="/termos-de-uso"
              className="text-zinc-300 transition-colors hover:text-actionVolt"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
