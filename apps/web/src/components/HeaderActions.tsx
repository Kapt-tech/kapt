interface HeaderActionsProps {
  onAuthClick: () => void;
}

export function HeaderActions({ onAuthClick }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-white text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] opacity-60 hidden sm:inline">
        1 ATIVO
      </span>
      <button
        onClick={onAuthClick}
        className="bg-actionVolt text-black text-[10px] md:text-xs font-black px-8 py-3 rounded-md uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,255,0,0.4)] hover:shadow-[0_0_25px_rgba(212,255,0,0.6)]"
      >
        Entrar
      </button>
    </div>
  );
}