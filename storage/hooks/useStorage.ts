import { appStorage, StorageInstance } from '@/utils/cache';
import { useState, useCallback, useEffect } from 'react';


export interface UseStorageOptions<T> {
  readonly storage?: StorageInstance;
  readonly initialValue?: T;
}

/**
 * Unified React Hook for Key-Value Storage Management
 * Synchronizes local component state with storage and updates reactively.
 */
export function useStorage<T>(
  key: string,
  options?: UseStorageOptions<T>,
): readonly [
  value: T | null,
  setValue: (val: T) => void,
  remove: () => void,
  refresh: () => void,
] {
  const instance = options?.storage ?? appStorage;
  const initial = options?.initialValue ?? null;

  const readValue = useCallback((): T | null => {
    const storedObj = instance.getObject<T>(key);
    if (storedObj !== null) return storedObj;

    const storedStr = instance.getString(key);
    if (storedStr !== undefined) return storedStr as unknown as T;

    const storedNum = instance.getNumber(key);
    if (storedNum !== undefined) return storedNum as unknown as T;

    const storedBool = instance.getBoolean(key);
    if (storedBool !== undefined) return storedBool as unknown as T;

    return initial;
  }, [instance, key, initial]);

  const [value, setInternalValue] = useState<T | null>(readValue);

  useEffect(() => {
    setInternalValue(readValue());
  }, [readValue]);

  const setValue = useCallback(
    (newValue: T): void => {
      if (typeof newValue === 'object' && newValue !== null) {
        instance.setObject(key, newValue);
      } else if (
        typeof newValue === 'string' ||
        typeof newValue === 'number' ||
        typeof newValue === 'boolean' ||
        newValue instanceof Uint8Array
      ) {
        instance.set(key, newValue);
      }
      setInternalValue(newValue);
    },
    [instance, key],
  );

  const remove = useCallback((): void => {
    instance.delete(key);
    setInternalValue(null);
  }, [instance, key]);

  const refresh = useCallback((): void => {
    setInternalValue(readValue());
  }, [readValue]);

  return [value, setValue, remove, refresh] as const;
}

/**
 * Reactive Hook Alias for MMKV Storage Values
 */
export function useMMKVValue<T = string>(
  key: string,
  storageInstance?: StorageInstance,
): readonly [value: T | null, setValue: (val: T) => void] {
  const [val, setVal] = useStorage<T>(key, { storage: storageInstance });
  return [val, setVal] as const;
}
