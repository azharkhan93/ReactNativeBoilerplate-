import { createMMKV, type MMKV } from 'react-native-mmkv';
import { InteractionManager } from 'react-native';

export const appStorage: MMKV = createMMKV({ id: 'tab2wash-app-storage' });
export const apolloStorage: MMKV = createMMKV({
  id: 'tab2wash-apollo-storage',
});

export const Storage = {
  set<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      appStorage.set(key, value);
    } else if (typeof value === 'boolean') {
      appStorage.set(key, value);
    } else if (typeof value === 'number') {
      appStorage.set(key, value);
    } else {
      appStorage.set(key, JSON.stringify(value));
    }
  },

  get<T>(key: string): T | null {
    const raw = appStorage.getString(key);
    if (raw === undefined) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  },

  delete(key: string): void {
    appStorage.remove(key);
  },

  clearAll(): void {
    appStorage.clearAll();
  },
};

export interface IApolloStorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export const MMKVApolloAdapter: IApolloStorageAdapter = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise(resolve => {
      const data = apolloStorage.getString(key);
      resolve(data ?? null);
    });
  },

  setItem: (key: string, value: string): Promise<void> => {
    return new Promise(resolve => {
      // Prevents Main-Thread Blocking during heavy UI touch/animations
      InteractionManager.runAfterInteractions(() => {
        try {
          apolloStorage.set(key, value);
        } catch (error) {
          if (__DEV__) {
            console.warn('[MMKVCacheAdapter] Write failed:', error);
          }
        } finally {
          resolve();
        }
      });
    });
  },

  removeItem: (key: string): Promise<void> => {
    return new Promise(resolve => {
      apolloStorage.remove(key);
      resolve();
    });
  },
};
