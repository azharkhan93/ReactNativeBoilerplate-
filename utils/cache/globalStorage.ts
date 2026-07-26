import { MMKV } from 'react-native-mmkv';
import { InteractionManager } from 'react-native';



let _appStorageInstance: MMKV | null = null;
let _apolloStorageInstance: MMKV | null = null;

export const getAppStorage = (): MMKV => {
  if (!_appStorageInstance) {
    _appStorageInstance = new MMKV({ id: 'tab2wash-app' });
  }
  return _appStorageInstance;
};

export const getApolloStorage = (): MMKV => {
  if (!_apolloStorageInstance) {
    _apolloStorageInstance = new MMKV({ id: 'tab2wash-apollo' });
  }
  return _apolloStorageInstance;
};

export const appStorage = {
  set: (key: string, value: boolean | string | number | Uint8Array): void => {
    try {
      getAppStorage().set(key, value);
    } catch (e) {
      console.warn('[Storage] appStorage set failed:', e);
    }
  },
  getString: (key: string): string | undefined => {
    try {
      return getAppStorage().getString(key);
    } catch (e) {
      console.warn('[Storage] appStorage getString failed:', e);
      return undefined;
    }
  },
  delete: (key: string): void => {
    try {
      getAppStorage().delete(key);
    } catch (e) {
      console.warn('[Storage] appStorage delete failed:', e);
    }
  },
  clearAll: (): void => {
    try {
      getAppStorage().clearAll();
    } catch (e) {
      console.warn('[Storage] appStorage clearAll failed:', e);
    }
  },
};

export const apolloStorage = {
  set: (key: string, value: boolean | string | number | Uint8Array): void => {
    try {
      getApolloStorage().set(key, value);
    } catch (e) {
      console.warn('[Storage] apolloStorage set failed:', e);
    }
  },
  getString: (key: string): string | undefined => {
    try {
      return getApolloStorage().getString(key);
    } catch (e) {
      console.warn('[Storage] apolloStorage getString failed:', e);
      return undefined;
    }
  },
  delete: (key: string): void => {
    try {
      getApolloStorage().delete(key);
    } catch (e) {
      console.warn('[Storage] apolloStorage delete failed:', e);
    }
  },
  clearAll: (): void => {
    try {
      getApolloStorage().clearAll();
    } catch (e) {
      console.warn('[Storage] apolloStorage clearAll failed:', e);
    }
  },
};

export const Storage = {
  set: <T>(key: string, val: T): void => {
    appStorage.set(
      key,
      typeof val === 'object'
        ? JSON.stringify(val)
        : (val as string | number | boolean),
    );
  },
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
  getItem: async (key: string): Promise<string | null> => {
    try {
      return apolloStorage.getString(key) ?? null;
    } catch {
      return null;
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      apolloStorage.delete(key);
    } catch (e) {
      console.warn('[ApolloAdapter] removeItem error:', e);
    }
  },
  setItem: (key: string, value: string): Promise<void> =>
    new Promise(resolve => {
      InteractionManager.runAfterInteractions(() => {
        try {
          apolloStorage.set(key, value);
        } catch (e) {
          console.warn('[ApolloAdapter] setItem error:', e);
        } finally {
          resolve();
        }
      });
    }),
};
