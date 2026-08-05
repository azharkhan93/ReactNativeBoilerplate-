import * as Keychain from 'react-native-keychain';
import {
  appStorage,
  STORAGE_KEYS,
  persistCriticalKey,
  removeCriticalKey,
} from '@/utils/cache';

let cachedUserPhone: string | null = null;

export const setAuthData = async (
  token: string,
  userId: string,
  phone?: string,
): Promise<void> => {
  try {
    if (phone) {
      cachedUserPhone = phone;
      await persistCriticalKey(STORAGE_KEYS.USER_PHONE, phone);
    }
    await Keychain.setGenericPassword(userId, token);
  } catch (error) {
    if (__DEV__) {
      console.warn('[authStore] Failed to store auth credentials:', error);
    }
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch {
    return null;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.username;
    }
    return null;
  } catch {
    return null;
  }
};

export const getAuthPhone = async (): Promise<string | null> => {
  if (cachedUserPhone) {
    return cachedUserPhone;
  }
  try {
    const storedPhone = appStorage.getString(STORAGE_KEYS.USER_PHONE);
    if (storedPhone) {
      cachedUserPhone = storedPhone;
      return storedPhone;
    }
    return null;
  } catch {
    return null;
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    cachedUserPhone = null;
    await removeCriticalKey(STORAGE_KEYS.USER_PHONE);
    await Keychain.resetGenericPassword();
  } catch (error) {
    if (__DEV__) {
      console.warn('[authStore] Failed to clear auth data:', error);
    }
  }
};
