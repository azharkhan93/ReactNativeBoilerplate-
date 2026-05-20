import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_ID_KEY = '@user_id';

export const setAuthData = async (token: string, userId: string) => {
  try {
    await Promise.all([
      AsyncStorage.setItem(TOKEN_KEY, token),
      AsyncStorage.setItem(USER_ID_KEY, userId),
    ]);
  } catch (e) {
    console.error('Failed to save auth data', e);
  }
};

export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
        return null;
    }
};

export const getUserId = async () => {
    try {
        return await AsyncStorage.getItem(USER_ID_KEY);
    } catch (e) {
        return null;
    }
};

export const clearAuthData = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(TOKEN_KEY),
      AsyncStorage.removeItem(USER_ID_KEY),
    ]);
  } catch (e) {
    console.error('Failed to clear auth data', e);
  }
};
