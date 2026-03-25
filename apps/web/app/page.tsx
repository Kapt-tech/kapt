"use client";

import { useState } from 'react';
import { OccurrenceCard } from '../src/components/OccurrenceCard';
import { OTPModal } from '../src/components/OTPModal';
import { MOCK_OCCURRENCES } from '../src/mocks/occurrences';

export default function Page() {
  const [isOTPOpen, setIsOTPOpen] = useState(false);

  const handleAuthSuccess = (token: string) => {
    localStorage.setItem('kapt_token', token);
    setIsOTPOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <OTPModal
        isOpen={isOTPOpen}
        onClose={() => setIsOTPOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Header atualizado com termo expressivo */}
      <header className="mb-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/5 pb-10">
        <div>
          <h1 className="text-volt text-6xl font-black uppercase tracking-tighter leading-none italic">
            KAPT <span className="text-white opacity-20">/</span> SESSÕES
          </h1>
          <p className="text-zinc-500 text-lg mt-3 font-medium tracking-tight">
            Encontre suas melhores manobras nas galerias oficiais.
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex items-center gap-4">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
            {MOCK_OCCURRENCES.length} Galerias disponíveis
          </span>
          <button
            onClick={() => setIsOTPOpen(true)}
            className="bg-volt text-black font-black text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-lg hover:brightness-110 transition-all"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {MOCK_OCCURRENCES.map((occ) => (
          <OccurrenceCard
            key={occ.id}
            title={occ.title}
            location={occ.location}
            photoCount={occ.photoCount}
            photographerCount={occ.photographerCount}
            date={occ.data}
            images={occ.images}
            tag={occ.tag}
          />
        ))}
      </div>
    </main>
  );
}