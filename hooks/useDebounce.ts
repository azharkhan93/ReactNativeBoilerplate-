import { useEffect, useState } from 'react';

/**
 * Debounce a value by a given delay.
 * Returns the debounced value that updates only after the delay has passed without changes.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
