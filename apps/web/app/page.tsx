"use client";

import { OccurrenceCard } from '@/components/OccurrenceCard';
import { MOCK_OCCURRENCES } from '@/mocks/occurrences';

// Presentation Data
const presentation_title = "Treino Coletivo Litorânea Sunset";
const presentation_images = [
  "https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=600&auto=format",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format",
  "https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=600&auto=format",
  "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600&auto=format"
];

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white px-0 md:px-1 py-6 md:py-12">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1440px] mx-auto">
        {MOCK_OCCURRENCES.map((occ) => (
          <OccurrenceCard
            key={occ.id}
            title={presentation_title}
            location={occ.location}
            photoCount={occ.photoCount}
            photographerCount={occ.photographerCount}
            date={occ.data}
            images={presentation_images}
            tag={occ.tag}
          />
        ))}
      </div>
    </main>
  );
}
