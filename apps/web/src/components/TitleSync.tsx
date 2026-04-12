"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TITLE_MAP: Record<string, string> = {
  "/": "Coberturas",
  "/sobre": "Sobre Nós",
  "/blog": "Blog",
  "/minha-area": "Minha Área",
  "/fotografar": "Quero Fotografar?",
};

function toTitleCase(input: string) {
  return input
    .split("-")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
    .join(" ");
}

export function TitleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const normalized = pathname ? pathname.replace(/\/$/, "") || "/" : "/";
    const direct = TITLE_MAP[normalized];
    if (direct) {
      document.title = `Kapt | ${direct}`;
      return;
    }

    const parts = normalized.split("/").filter(Boolean);
    const last = parts.at(-1) ?? "Coberturas";
    const label = toTitleCase(last);
    document.title = `Kapt | ${label}`;
  }, [pathname]);

  return null;
}
