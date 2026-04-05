export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 py-8 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left - Branding */}
                <div className="flex flex-col items-center md:items-start tracking-tighter">
                    <span className="text-actionVolt font-black italic uppercase text-xs">
                        Kapt The Kinetic Archive
                    </span>
                </div>

                {/* Center - Links */}
                <div className="flex items-center gap-6 text-[9px] md:text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    <a href="#" className="hover:text-actionVolt transition-colors">Privacidade</a>
                    <a href="#" className="hover:text-actionVolt transition-colors">Termos</a>
                    <a href="#" className="hover:text-actionVolt transition-colors">Contato</a>
                </div>

                {/* Right - Copyright */}
                <div className="text-[10px] font-mono tracking-widest text-zinc-600">
                    &copy; 2024 Kapt.
                </div>
            </div>
        </footer>
    );
}
