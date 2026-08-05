import { persistCache } from 'apollo3-cache-persist';
import { apolloCache } from './apolloCache';
import { MMKVApolloAdapter } from '../cache';

export const initApolloCachePersistence = async (): Promise<void> => {
  try {
    await persistCache({
      cache: apolloCache,
      storage: MMKVApolloAdapter,
      maxSize: 10 * 1024 * 1024,
      debounce: 100,
    });
    apolloCache.gc();
  } catch (error) {
    if (__DEV__) {
      console.warn('[ApolloCachePersist] Initialization warning:', error);
    }
  }
};
