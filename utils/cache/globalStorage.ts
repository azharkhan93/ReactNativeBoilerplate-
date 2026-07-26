import { MMKV } from 'react-native-mmkv';
import { InteractionManager } from 'react-native';

// Modular MMKV Storage Partitions
export const appStorage = new MMKV({ id: 'tab2wash-app' });
export const apolloStorage = new MMKV({ id: 'tab2wash-apollo' });

/** High-Performance Type-Safe Local Cache Engine */
export const Storage = {
  set: <T>(key: string, val: T): void =>
    appStorage.set(
      key,
      typeof val === 'object'
        ? JSON.stringify(val)
        : (val as string | number | boolean),
    ),
  get: <T>(key: string): T | null => {
    const raw = appStorage.getString(key);
    if (raw === undefined) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  },
  delete: (key: string): void => appStorage.delete(key),
  clearAll: (): void => appStorage.clearAll(),
};


export const MMKVApolloAdapter = {
  getItem: async (key: string): Promise<string | null> =>
    apolloStorage.getString(key) ?? null,
  removeItem: async (key: string): Promise<void> => {
    apolloStorage.delete(key);
  },
  setItem: (key: string, value: string): Promise<void> =>
    new Promise(resolve =>
      InteractionManager.runAfterInteractions(() => {
        try {
          apolloStorage.set(key, value);
        } finally {
          resolve();
        }
      }),
    ),
};
