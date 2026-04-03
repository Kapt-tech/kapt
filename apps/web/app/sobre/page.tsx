import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

// Static metadata for SEO — page is a Server Component, no "use client" needed
export const metadata: Metadata = {
    title: 'Sobre | Kapt - Conectando Emoção e Performance',
    description: 'A história da plataforma que une biometria e fotografia esportiva de alta performance.',
};

/**
 * About Us (SOBRE) page component for Kapt.
 * Uses tailwind.config.ts tokens: volt, asphalt, pavement, rounded-card.
 */
export default function SobrePage() {
    return (
        <main className="bg-asphalt text-white min-h-screen font-sans">

            {/* --- HERO SECTION: Performance Manifesto --- */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Professional athlete background overlay */}
                <Image
                    src="/images/hero-sobre.jpg"
                    alt="Athlete in motion"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <span className="text-volt uppercase tracking-widest text-sm font-bold">
                        Manifesto de Performance
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase mt-4 leading-tight">
                        A Nossa História: <br />
                        <span className="text-volt">Conectando Emoção</span> <br />
                        e Performance
                    </h1>
                    <p className="max-w-2xl mx-auto mt-8 text-gray-300 text-lg">
                        O Kapt é o arquivo vivo do esporte contemporâneo, unindo a precisão
                        biométrica à arte da fotografia esportiva.
                    </p>
                </div>
            </section>

            {/* --- THE KAPT VIBE: Beach Tennis Section --- */}
            <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                    {/* Neon glow effect using kapt transition tokens */}
                    <div className="absolute -inset-1 bg-volt opacity-20 group-hover:opacity-40 transition-kapt duration-kapt blur rounded-card"></div>
                    <Image
                        src="/images/beach-tennis.jpg"
                        alt="Beach Tennis Action"
                        width={600}
                        height={400}
                        className="relative rounded-card object-cover border border-white/10"
                    />
                    <span className="absolute top-4 left-4 bg-volt text-asphalt text-xs font-bold px-2 py-1 uppercase italic">
                        Vibe Kapt
                    </span>
                </div>
                <div>
                    <h2 className="text-4xl font-black italic uppercase">A Vibe Kapt</h2>
                    <p className="mt-6 text-gray-400 leading-relaxed">
                        Não somos apenas uma plataforma de fotos. Somos o pulso de cada competição,
                        capturando o momento exato em que a técnica encontra a paixão pura.
                    </p>
                    {/* Stats highlighted with volt borders */}
                    <div className="mt-10 flex gap-12 border-l-2 border-volt pl-6">
                        <div>
                            <p className="text-3xl font-bold text-white">12M+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Fotos Capturadas</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">840+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Eventos Cobertos</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PHOTOGRAPHERS: CrossFit Section --- */}
            <section className="py-24 bg-pavement/30">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl font-black italic uppercase leading-tight">
                            Fotógrafos que <br />Respiram Esporte
                        </h2>
                        <p className="mt-6 text-gray-400">
                            Especialistas que preveem o lance e entendem a dinâmica do movimento.
                            Aqui, a estética editorial encontra a performance bruta.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {['Curadoria técnica rigorosa', 'Equipamento de elite', 'Presença global'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                                    <div className="w-5 h-5 rounded-full bg-volt flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-asphalt" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                        <Image
                            src="/images/crossfit.jpg"
                            alt="CrossFit Intensity"
                            width={600}
                            height={400}
                            className="rounded-card grayscale hover:grayscale-0 transition-kapt duration-kapt border-b-4 border-r-4 border-volt"
                        />
                    </div>
                </div>
            </section>

            {/* --- OUR PILLARS SECTION --- */}
            <section className="py-24 container mx-auto px-6 text-center">
                <h2 className="text-3xl font-black italic uppercase mb-16">Nossos Pilares</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { title: 'Rapidez Biométrica', icon: '⚡', desc: 'Sua foto em segundos através de reconhecimento facial.' },
                        { title: 'Qualidade Profissional', icon: '📷', desc: 'Cada clique passa por um rigoroso processo de seleção.' },
                        { title: 'Conexão Segura', icon: '🛡️', desc: 'Privacidade de dados e transações seguras para todos.' },
                    ].map((pilar, idx) => (
                        <div key={idx} className="p-8 bg-pavement/50 rounded-card hover:border-volt border border-transparent transition-kapt duration-kapt">
                            <span className="text-4xl block mb-4 text-volt">{pilar.icon}</span>
                            <h3 className="text-xl font-bold uppercase italic mb-4">{pilar.title}</h3>
                            <p className="text-gray-500 text-sm">{pilar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- FINAL CTA SECTION --- */}
            <section className="py-32 bg-volt text-asphalt text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl font-black italic uppercase mb-8">Faça parte do <br />Arquivo Cinético</h2>
                    {/* CTA link — routes to photographer registration */}
                    <Link
                        href="/fotografos"
                        className="inline-block bg-asphalt text-volt px-12 py-4 font-black uppercase italic text-xl hover:scale-105 transition-kapt duration-kapt rounded-card shadow-xl"
                    >
                        Quero Fotografar
                    </Link>
                </div>
            </section>
        </main>
    );
}