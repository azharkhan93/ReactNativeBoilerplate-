import { createStorage } from './createStorage';
import { StorageInstance } from './types';

/**
 * Main Application Local Storage Instance
 */
export const appStorage: StorageInstance = createStorage('tab2wash-app');

/**
 * Dedicated Apollo Client Cache Storage Instance
 */
export const apolloStorage: StorageInstance = createStorage('tab2wash-apollo');

/**
 * Unified, Backward-Compatible Storage Wrapper
 * Maintains compatibility with legacy Storage.set, Storage.get, Storage.delete, and Storage.clearAll.
 */
export const Storage = {
  set: <T>(key: string, val: T): void => {
    if (typeof val === 'object' && val !== null) {
      appStorage.setObject(key, val);
    } else if (
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean' ||
      val instanceof Uint8Array
    ) {
      appStorage.set(key, val);
    }
  },

  get: <T>(key: string): T | null => {
    const rawString = appStorage.getString(key);
    if (rawString === undefined) return null;

    try {
      return JSON.parse(rawString) as T;
    } catch {
      return rawString as unknown as T;
    }
  },

  delete: (key: string): void => {
    appStorage.delete(key);
  },

  clearAll: (): void => {
    appStorage.clearAll();
  },
};
