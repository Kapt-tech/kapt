interface HeaderActionsProps {
  onAuthClick: () => void;
}

export function HeaderActions({ onAuthClick }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-6 ml-auto">
      <span className="text-white text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] opacity-60 hidden sm:inline whitespace-nowrap">
        1 ATIVO
      </span>
      <button
        onClick={onAuthClick}
        className="group relative overflow-hidden rounded-md border border-white/20 bg-white/5 px-7 py-2.5 text-[10px] md:text-xs font-mono font-semibold uppercase tracking-widest text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white/80 hover:shadow-[0_0_14px_rgba(255,255,255,0.2)] whitespace-nowrap cursor-not-allowed"
      >
        <span className="relative z-10">Entrar</span>
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/20 [animation:kapt-marquee_2.4s_linear_infinite]" />
        </span>
      </button>
      <a
        href="/fotografar"
        className="group relative inline-flex items-center px-6 py-3.5 text-[12px] md:text-sm font-mono font-bold uppercase tracking-widest text-actionVolt whitespace-nowrap rounded-md bg-[#0b0b0b] border border-actionVolt/40 shadow-[0_0_55px_rgba(206,255,0,0.85)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(206,255,0,0.85)]"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
          Quer fotografar?
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-md bg-actionVolt/10 transition-opacity duration-300 group-hover:opacity-0" />
        <span className="pointer-events-none absolute inset-0 rounded-md border border-actionVolt/70 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 ease-out group-hover:[clip-path:inset(0_0_0_0)]" />
        <span className="pointer-events-none absolute inset-0 rounded-md bg-actionVolt opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </a>
    </div>
  );
}
