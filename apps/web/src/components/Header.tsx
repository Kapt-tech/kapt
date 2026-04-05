"use client";

import Link from "next/link";
import { Navbar } from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { Title } from "./Title";
import { usePathname } from "next/navigation";

export function Header() {
  const { openAuth } = useAuth();
  const pathname = usePathname();

  let pageTitle = "Coberturas";
  if (pathname?.includes("/sobre")) {
    pageTitle = "Sobre";
  } else if (pathname?.includes("/blog")) {
    pageTitle = "Blog";
  }

  return (
    <header className="mb-12 max-w-7xl mx-auto px-6 border-b border-white/10 pb-8 pt-12">
      <div className="flex flex-row justify-between items-start w-full">
        {/* Left Side: Brand Identity and Tagline */}
        <div className="flex flex-col gap-1">
          <Link href="/" className="group">
            <h1 className="text-actionVolt text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic group-hover:text-actionVolt/90 transition-all duration-300">
              KAPT
            </h1>
          </Link>
          <p className="text-white text-[10px] md:text-xs font-medium tracking-wide">
            Galerias de eventos multiesportivos.
          </p>
        </div>

        {/* Right Side: Navigation and Contextual Info */}
        <div className="flex flex-col items-end text-right">
          <div className="mb-14">
            <Navbar />
          </div>

          {/* Hero context integrated in Header for global consistency */}
          <div className="flex flex-row items-center gap-12">
            <Title text={pageTitle} />

            <div className="flex items-center gap-6">
              <span className="text-white text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] opacity-60 hidden sm:inline">
                1 ATIVO
              </span>
              <button 
                onClick={openAuth}
                className="bg-actionVolt text-black text-[10px] md:text-xs font-black px-8 py-3 rounded-md uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,255,0,0.4)] hover:shadow-[0_0_25px_rgba(212,255,0,0.6)]"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
