import { SERVICE_CATEGORIES } from '@/utils/constants';

export interface FilterValues {
  categoryId: string | null;
  priceRange: string | null;
  sortBy: string | null;
}

export interface ServiceProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
  category?: string;
  imageUrl?: string;
}

export type BaseServiceItem = ServiceProductItem;

export const getFeaturedServices = (): ServiceProductItem[] => {
  return [];
};

export const getNearbyServices = (): ServiceProductItem[] => {
  return [];
};

export const getRecommendedServices = (): ServiceProductItem[] => {
  return [];
};


export const filterAndSortServices = <T extends BaseServiceItem>(
  services: readonly T[],
  activeFilters: FilterValues | null | undefined,
): T[] => {
  if (!activeFilters) return [...services];
  let list = [...services];

 
  if (activeFilters.categoryId) {
    const cat = SERVICE_CATEGORIES.find(c => c.id === activeFilters.categoryId);
    if (cat) {
      const catNameLower = cat.name.toLowerCase();
      const filtered = list.filter(
        s =>
          s.category?.toLowerCase() === catNameLower ||
          s.category?.toLowerCase().includes(catNameLower) ||
          catNameLower.includes(s.category?.toLowerCase() || ''),
      );
      if (filtered.length > 0) {
        list = filtered;
      }
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
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
  }

  return list;
};
