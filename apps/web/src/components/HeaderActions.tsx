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
        className="text-zinc-400 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest border border-pavementGray/80 px-3 py-2 rounded-md transition-colors hover:text-actionVolt hover:border-actionVolt whitespace-nowrap"
      >
        Quer fotografar?
      </a>
    </div>
  );
}
