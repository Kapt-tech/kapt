export interface Occurrence {
    id: string;
    title: string;
    location: string;
    photoCount: number;
    photographerCount: number;
    data: string;
    images: string[];
    tag?: 'novo' | 'destaque'; // Agora aceita tags opcionais
}

export const MOCK_OCCURRENCES: Occurrence[] = [
    {
        id: '1',
        title: 'Surf Pro Tour 2026',
        location: 'Praia do Meio, São Luís',
        photoCount: 842,
        photographerCount: 12,
        data: '02/03/2026',
        tag: 'novo', // Este é o lançamento
        images: [
            "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1459749411177-042180ce673a?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509191432704-7725df463640?q=80&w=400&auto=format&fit=crop"
        ]
    },
    // ... outros eventos sem tag por enquanto
];