import { useState, useRef, useCallback } from 'react';
import { FilterValues } from './types';
import { INITIAL_FILTERS } from './constants';

export const useFilterModal = (
  visible: boolean,
  currentFilters: FilterValues,
  onApply: (filters: FilterValues) => void,
) => {
  const [filters, setFilters] = useState<FilterValues>(currentFilters);
  const prevRef = useRef({ visible, currentFilters });

  // Sync state during render pass without extra useState variables or useEffect double-render pass
  if (
    prevRef.current.currentFilters !== currentFilters ||
    (visible && !prevRef.current.visible)
  ) {
    prevRef.current = { visible, currentFilters };
    setFilters(currentFilters);
  }

  const toggleFilter = useCallback((key: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleApply = useCallback(() => {
    onApply(filters);
  }, [filters, onApply]);

  return {
    filters,
    toggleFilter,
    handleClearAll,
    handleApply,
  };
};
