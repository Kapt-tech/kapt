"use client";

import { Navbar } from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Brand } from "./Brand";
import { HeaderHero } from "./HeaderHero";

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
        <Brand />

        {/* Right Side: Navigation and Contextual Info */}
        <div className="flex flex-col items-end text-right">
          <div className="mb-14">
            <Navbar />
          </div>

          {/* Hero context integrated in Header for global consistency */}
          <HeaderHero pageTitle={pageTitle} onAuthClick={openAuth} />
        </div>
      </div>
    </header>
  );
}
