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
  } catch (error) {
    if (__DEV__) {
      console.warn('[StorageBackup] AsyncStorage hydration warning:', error);
    }
  }
};

export const persistCriticalKey = async (
  key: string,
  value: string | boolean,
): Promise<void> => {
  try {
    appStorage.set(key, value);
    await AsyncStorage.setItem(key, String(value));
  } catch (error) {
    if (__DEV__) {
      console.warn(`[StorageBackup] Failed to persist key '${key}':`, error);
    }
  }
};

export const removeCriticalKey = async (key: string): Promise<void> => {
  try {
    appStorage.delete(key);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    if (__DEV__) {
      console.warn(`[StorageBackup] Failed to remove key '${key}':`, error);
    }
  }
};
