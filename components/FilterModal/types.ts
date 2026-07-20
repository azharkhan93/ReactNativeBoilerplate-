import { ComponentType } from 'react';

export interface FilterValues {
  categoryId: string | null;
  priceRange: string | null;
  sortBy: string | null;
}

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  currentFilters: FilterValues;
}

export interface PriceRangeOption {
  label: string;
  value: string;
}

export interface SortOption {
  label: string;
  value: string;
  icon: ComponentType<{ size?: number; color?: string }>;
}
