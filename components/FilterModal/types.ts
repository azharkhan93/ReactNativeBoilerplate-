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
