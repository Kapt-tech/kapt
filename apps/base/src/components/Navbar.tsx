"use client";

export function Navbar() {
    const navLinks = [
        { name: 'Coberturas', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Sobre', href: '#' }
    ];

    return (
        // flex gap-8 ensures items are spaced but the container remains flush with the right edge
        <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    className="relative text-zinc-200 hover:text-volt/80 hover:-translate-y-0.5 text-[11px] font-bold tracking-widest uppercase transition-[color,transform] duration-[180ms] ease-out after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-volt/40 after:scale-x-0 after:origin-center after:transition-transform after:duration-[180ms] after:ease-out after:delay-[50ms] hover:after:scale-x-100"
                >
                    {link.name}
                </a>
            ))}
        </nav>
    );
}