import * as Keychain from 'react-native-keychain';

export const setAuthData = async (
  token: string,
  userId: string,
): Promise<void> => {
  try {
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

export const clearAuthData = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
  } catch {
    // Fail silently in production per senior engineering guidelines
  }
};
