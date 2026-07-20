import { ArrowUpDown, Star } from 'lucide-react-native';
import { PriceRangeOption, SortOption, FilterValues } from './types';

export const INITIAL_FILTERS: FilterValues = {
  categoryId: null,
  priceRange: null,
  sortBy: null,
};

export const PRICE_RANGES: readonly PriceRangeOption[] = [
  { label: 'Under ₹500', value: 'under-500' },
  { label: '₹500 - ₹1,000', value: '500-1000' },
  { label: '₹1,000 - ₹2,000', value: '1000-2000' },
  { label: '₹2,000+', value: '2000-above' },
] as const;

export const SORT_OPTIONS: readonly SortOption[] = [
  { label: 'Price: Low to High', value: 'price-asc', icon: ArrowUpDown },
  { label: 'Price: High to Low', value: 'price-desc', icon: ArrowUpDown },
  { label: 'Top Rated first', value: 'rating-desc', icon: Star },
] as const;
