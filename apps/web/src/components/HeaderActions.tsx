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
        className="bg-actionVolt text-black text-[10px] md:text-xs font-black px-8 py-3 rounded-md uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,255,0,0.4)] hover:shadow-[0_0_25px_rgba(212,255,0,0.6)] whitespace-nowrap"
      >
        Entrar
      </button>
      <a
        href="/fotografar"
        className="group relative inline-flex items-center px-3 py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 whitespace-nowrap border-2 border-transparent transition-transform duration-200 ease-out hover:-translate-y-0.5"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-actionVolt">
          Quer fotografar?
        </span>
        <span className="pointer-events-none absolute inset-[-2px] rounded-md border-2 border-actionVolt [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 ease-out group-hover:[clip-path:inset(0_0_0_0)]" />
      </a>
    </div>
  );
}
