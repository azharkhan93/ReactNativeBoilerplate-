import 'react-native-get-random-values';
import * as Keychain from 'react-native-keychain';
import { StorageLogger } from './logger';

export const MMKV_KEYCHAIN_SERVICE = 'tab2wash.mmkv.encryption.key';

const KEYCHAIN_OPTIONS = {
  service: MMKV_KEYCHAIN_SERVICE,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

let cachedEncryptionKey: string | null = null;


export const getStorageEncryptionKey = async (): Promise<string> => {
  if (cachedEncryptionKey) {
    return cachedEncryptionKey;
  }

  try {
    const credentials = await Keychain.getGenericPassword(KEYCHAIN_OPTIONS);

    if (credentials && credentials.password) {
      cachedEncryptionKey = credentials.password;
      return credentials.password;
    }

    // Generate a cryptographically secure 256-bit (32 bytes = 64 hex characters) key
    const randomBytes = new Uint8Array(32);
    const cryptoObj = (
      globalThis as unknown as {
        crypto?: { getRandomValues: (arr: Uint8Array) => Uint8Array };
      }
    ).crypto;

    if (typeof cryptoObj?.getRandomValues === 'function') {
      cryptoObj.getRandomValues(randomBytes);
    } else {
      throw new Error('Native SecureRandom CSPRNG unavailable for key generation.');
    }

    const generatedKey = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    await Keychain.setGenericPassword('mmkv_encryption_key', generatedKey, KEYCHAIN_OPTIONS);

    cachedEncryptionKey = generatedKey;
    return generatedKey;
  } catch (error) {
    StorageLogger.error('Failed to retrieve or generate Keychain MMKV encryption key:', error);
    throw error;
  }
};

/**
 * Gets the current cached hardware key if already loaded.
 */
export const getCachedStorageEncryptionKey = (): string | null => {
  return cachedEncryptionKey;
};
