"use client";

import { useState, useEffect } from 'react';
import { MapPin, Camera, Zap, Calendar } from 'lucide-react';

export interface OccurrenceCardProps {
    title: string;
    location: string;
    photoCount: number;
    photographerCount: number;
    date: string;
    images?: string[];
    tag?: 'novo' | 'destaque' | 'em breve';
}

export const OccurrenceCard = ({
    title,
    location,
    photoCount,
    photographerCount,
    date,
    images = [],
    tag
}: OccurrenceCardProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const displayImages = (images || []).slice(0, 4);

    if (!mounted) {
        return <div className="min-h-[450px] bg-neutral-900 rounded-xl animate-pulse" />;
    }

    return (
        <div className="flex flex-col bg-neutral-900 border border-white/10 rounded-xl overflow-hidden min-h-[450px] w-full group hover:border-volt/50 transition-all duration-300">

            {/* Área do Mosaico com Zoom */}
            <div className="relative h-48 w-full bg-neutral-800 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden">
                {tag && (
                    <span className="absolute top-4 left-4 z-30 bg-volt text-black px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider shadow-lg">
                        {tag}
                    </span>
                )}

                {displayImages.length > 0 ? (
                    displayImages.map((src, i) => (
                        <div key={i} className="overflow-hidden w-full h-full">
                            <img
                                src={src}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt=""
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 row-span-2 flex items-center justify-center text-zinc-600 text-[10px] uppercase">Sem fotos</div>
                )}
            </div>

            {/* Conteúdo */}
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h2 className="text-white text-2xl font-bold tracking-tight leading-tight">{title}</h2>
                        {/* Data com contraste reforçado */}
                        <span className="shrink-0 text-[11px] text-white font-bold font-mono bg-neutral-700 px-2 py-1 rounded border border-white/10 flex items-center">
                            <Calendar size={12} className="mr-1 text-volt" /> {date}
                        </span>
                    </div>
                    <div className="flex items-center text-zinc-300 text-sm">
                        <MapPin size={14} className="mr-2 text-volt" />
                        {location}
                    </div>
                </div>

                {/* Info Grid */}
                <div className="mt-auto pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="flex items-center text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">
                            <Camera size={12} className="mr-2 text-zinc-400" /> Fotos
                        </span>
                        <span className="text-white font-mono text-xl font-black">{photoCount}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="flex items-center text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-semibold">
                            <Zap size={12} className="mr-2 text-volt" /> Creators
                        </span>
                        <span className="text-white font-mono text-xl font-black">{photographerCount}</span>
                    </div>
                </div>

                {/* Botão de ação que surge no hover */}
                <div className="mt-6 overflow-hidden">
                    <div className="flex items-center justify-center bg-white/5 group-hover:bg-volt py-3 rounded-lg transition-all duration-300">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-black transition-colors">
                            Acessar Galeria Completa
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};