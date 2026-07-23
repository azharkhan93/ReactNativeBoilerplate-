import * as Keychain from 'react-native-keychain';

let cachedUserPhone: string | null = null;

export const setAuthData = async (
  token: string,
  userId: string,
  phone?: string,
): Promise<void> => {
  try {
    if (phone) {
      cachedUserPhone = phone;
    }
    await Keychain.setGenericPassword(userId, token);
  } catch {}
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
  return cachedUserPhone;
};

export const clearAuthData = async (): Promise<void> => {
  try {
    cachedUserPhone = null;
    await Keychain.resetGenericPassword();
  } catch {
    // Fail silently in production per senior engineering guidelines
  }
};
