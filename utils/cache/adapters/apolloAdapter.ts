import { apolloStorage } from '../storage';
import { StorageLogger } from '../logger';
import { StorageAdapter } from '../types';

/**
 * Apollo Cache Persistence Storage Adapter
 * Designed specifically for compatibility with `apollo3-cache-persist` and MMKV.
 * Synchronous MMKV calls ensure cache writes execute immediately without being deferred or lost.
 */
export const MMKVApolloAdapter: StorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return apolloStorage.getString(key) ?? null;
    } catch (error) {
      StorageLogger.error(
        `MMKVApolloAdapter getItem failed for key '${key}'`,
        error,
      );
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      apolloStorage.delete(key);
    } catch (error) {
      StorageLogger.error(
        `MMKVApolloAdapter removeItem failed for key '${key}'`,
        error,
      );
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      apolloStorage.set(key, value);
    } catch (error) {
      StorageLogger.error(
        `MMKVApolloAdapter setItem failed for key '${key}'`,
        error,
      );
    }
  },
};
