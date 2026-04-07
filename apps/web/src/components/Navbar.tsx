"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "COBERTURAS", href: "/" },
    { name: "BLOG", href: "/blog" },
    { name: "SOBRE", href: "/sobre" },
];

export function Navbar() {
    const pathname = usePathname();
    const normalizedPath = pathname ? pathname.replace(/\/$/, "") || "/" : "/";

    return (
        // flex gap-8 ensures items are spaced but the container remains flush with the right edge
        <nav className="flex items-center justify-end gap-8 font-mono w-full">
            {navLinks.map((link) => {
                const normalizedHref = link.href === "/" ? "/" : link.href.replace(/\/$/, "");
                const isActive =
                    normalizedPath === normalizedHref ||
                    (normalizedHref !== "/" && normalizedPath.startsWith(`${normalizedHref}/`));
                const baseClasses =
                    "relative inline-block text-zinc-200 text-[11px] font-bold tracking-widest uppercase pb-2 whitespace-nowrap transition-[color,transform] duration-[180ms] ease-out after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:bg-transparent after:transition-colors after:duration-[180ms]";
                const hoverClasses = "hover:text-actionVolt/80 hover:-translate-y-0.5 hover:after:bg-actionVolt/60";
                const activeClasses =
                    "text-actionVolt cursor-default pointer-events-none after:bg-transparent !text-actionVolt";

                if (isActive) {
                    return (
                        <span key={link.name} className={`${baseClasses} ${activeClasses}`}>
                            {link.name}
                        </span>
                    );
                }

                return (
                    <Link key={link.name} href={link.href} className={`${baseClasses} ${hoverClasses}`}>
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}
