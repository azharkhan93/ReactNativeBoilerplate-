export interface Provider {
    id: string;
    name: string;
    imageUrl?: string;
    rating?: number;
    distanceKm?: number;
    services?: string[];
    latitude: number;
    longitude: number;
}

export const MOCK_PROVIDERS: Provider[] = [
    {
        id: "1",
        name: "Sparkle Car Wash",
        imageUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        distanceKm: 1.2,
        services: ["Exterior", "Interior", "Wax"],
        latitude: 25.276987,
        longitude: 55.296249,
    },
    {
        id: "2",
        name: "Shine & Go",
        imageUrl: "https://images.unsplash.com/photo-1605610816744-13c4752fea01?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        distanceKm: 2.0,
        services: ["Exterior", "Detailing"],
        latitude: 25.266987,
        longitude: 55.306249,
    },
    {
        id: "3",
        name: "Elite Auto Spa",
        imageUrl: "https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        distanceKm: 0.8,
        services: ["Full Detail", "Ceramic Coating"],
        latitude: 25.286987,
        longitude: 55.286249,
    },
    {
        id: "4",
        name: "Quick Wash Central",
        imageUrl: "https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&w=800&q=80",
        rating: 4.2,
        distanceKm: 3.5,
        services: ["Express Exterior"],
        latitude: 25.256987,
        longitude: 55.316249,
    },
];
