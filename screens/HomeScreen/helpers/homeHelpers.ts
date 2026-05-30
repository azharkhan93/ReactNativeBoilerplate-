import { MOCK_SERVICES, SERVICE_CATEGORIES } from '@/utils/constants';

export interface FilterValues {
  categoryId: string | null;
  priceRange: string | null;
  sortBy: string | null;
}

/**
 * Maps MOCK_SERVICES to the format expected by the FlashSale (Special Offers) component.
 */
export const getFeaturedServices = () => {
  return MOCK_SERVICES.map(s => ({
    id: s.id,
    name: s.name,
    price: s.price,
    originalPrice: s.price * 1.2,
    discount: 20,
    rating: 4.8,
    category: s.category,
    imageUrl: s.image,
  }));
};

/**
 * Maps MOCK_SERVICES to the format expected by the BestSellers (Nearby Providers) component.
 */
export const getNearbyServices = () => {
  return MOCK_SERVICES.map(s => ({
    id: s.id,
    name: s.name,
    price: s.price,
    rating: 4.9,
    isFavorite: false,
    category: s.category,
    imageUrl: s.image,
  }));
};

/**
 * Maps a subset of MOCK_SERVICES to the format expected by the NewArrivals (Recommendations) component.
 */
export const getRecommendedServices = () => {
  return MOCK_SERVICES.slice(0, 2).map(s => ({
    id: s.id,
    name: s.name,
    price: s.price,
    rating: 4.7,
    isFavorite: true,
    category: s.category,
    imageUrl: s.image,
  }));
};

/**
 * Helper to filter and sort services based on category, price range, and sorting.
 */
export const filterAndSortServices = (
  services: any[],
  activeFilters: FilterValues | null | undefined,
) => {
  if (!activeFilters) return services;
  let list = [...services];

  // Category Filter
  if (activeFilters.categoryId) {
    const cat = SERVICE_CATEGORIES.find(c => c.id === activeFilters.categoryId);
    if (cat) {
      list = list.filter(s => s.category?.toLowerCase() === cat.name.toLowerCase());
    }
  }

  // Price Filter
  if (activeFilters.priceRange) {
    if (activeFilters.priceRange === 'under-500') {
      list = list.filter(s => s.price <= 35);
    } else if (activeFilters.priceRange === '500-1000') {
      list = list.filter(s => s.price > 35 && s.price <= 80);
    } else if (activeFilters.priceRange === '1000-2000') {
      list = list.filter(s => s.price > 80 && s.price <= 150);
    } else if (activeFilters.priceRange === '2000-above') {
      list = list.filter(s => s.price > 150);
    }
  }

  // Sort Logic
  if (activeFilters.sortBy) {
    if (activeFilters.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sortBy === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    }
  }

  return list;
};
