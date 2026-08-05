import AsyncStorage from '@react-native-async-storage/async-storage';
import { appStorage } from './storage';
import { STORAGE_KEYS } from './storageKeys';

const CRITICAL_KEYS: string[] = [
  STORAGE_KEYS.HAS_COMPLETED_ONBOARDING,
  STORAGE_KEYS.HAS_SEEN_SPLASH,
  STORAGE_KEYS.USER_ROLE,
  STORAGE_KEYS.USER_PHONE,
  STORAGE_KEYS.AUTH_TOKEN,
  STORAGE_KEYS.LAST_LOCATION,
];

/**
 * Migrates legacy data from unencrypted AsyncStorage to AES-256 encrypted MMKV,
 * then purges AsyncStorage so no unencrypted data remains on disk.
 */
export const hydrateStorageFromAsyncStorage = async (): Promise<void> => {
  try {
    for (const key of CRITICAL_KEYS) {
      const val = await AsyncStorage.getItem(key);
      if (val !== null && val !== undefined) {
        if (val === 'true') {
          appStorage.set(key, true);
        } else if (val === 'false') {
          appStorage.set(key, false);
        } else {
          appStorage.set(key, val);
        }
      }
    }
    // Purge unencrypted legacy AsyncStorage
    await AsyncStorage.clear();
  } catch (error) {
    if (__DEV__) {
      console.warn('[StorageBackup] One-time AsyncStorage migration warning:', error);
    }
  }
};

/**
 * Persists critical application state strictly into AES-256 encrypted MMKV storage.
 * Does NOT write to unencrypted AsyncStorage.
 */
export const persistCriticalKey = (
  key: string,
  value: string | boolean,
): void => {
  try {
    appStorage.set(key, value);
  } catch (error) {
    if (__DEV__) {
      console.warn(`[StorageBackup] Failed to persist key '${key}':`, error);
    }
  }
};

/**
 * Removes key strictly from encrypted MMKV storage.
 */
export const removeCriticalKey = (key: string): void => {
  try {
    appStorage.delete(key);
  } catch (error) {
    if (__DEV__) {
      console.warn(`[StorageBackup] Failed to remove key '${key}':`, error);
    }
  }
};
