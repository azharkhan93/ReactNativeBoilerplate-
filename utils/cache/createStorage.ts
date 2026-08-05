import { MMKV } from 'react-native-mmkv';
import { StorageLogger } from './logger';
import { StorageInstance } from './types';
import { MMKVStorage } from './instances/MMKVStorage';
import { InMemoryStorage } from './instances/InMemoryStorage';
import { getCachedStorageEncryptionKey, getStorageEncryptionKey } from './secureKey';

const activeMMKVInstances: Map<string, MMKVStorage> = new Map();

/**
 * Storage Instance Factory
 * Instantiates encrypted MMKV backed by hardware Keychain 256-bit AES keys without fallback strings.
 */
export const createStorage = (id: string, customKey?: string): StorageInstance => {
  const encryptionKey = customKey ?? getCachedStorageEncryptionKey() ?? undefined;
  try {
    const config: { id: string; encryptionKey?: string } = { id };
    if (encryptionKey) {
      config.encryptionKey = encryptionKey;
    }

    const instance = new MMKV(config);
    const mmkvStorage = new MMKVStorage(id, instance);
    activeMMKVInstances.set(id, mmkvStorage);
    StorageLogger.info(`MMKV instance '${id}' created successfully (Encrypted: ${Boolean(encryptionKey)}).`);
    return mmkvStorage;
  } catch (error) {
    StorageLogger.warn(`Initial MMKV open for '${id}' warning:`, error);
    try {
      const fallbackInstance = new MMKV({ id });
      const mmkvStorage = new MMKVStorage(id, fallbackInstance);
      activeMMKVInstances.set(id, mmkvStorage);
      return mmkvStorage;
    } catch (fallbackError) {
      StorageLogger.warn(
        `MMKV instance '${id}' unavailable. Using InMemoryStorage fallback.`,
        fallbackError,
      );
      return new InMemoryStorage(id);
    }
  }
};

/**
 * Encrypts active MMKV storage instances at rest using the hardware Keychain 256-bit AES key.
 */
export const ensureStorageEncrypted = async (): Promise<void> => {
  try {
    const key = await getStorageEncryptionKey();
    if (!key) return;

    activeMMKVInstances.forEach((storage, id) => {
      try {
        storage.recrypt(key);
        StorageLogger.info(`MMKV storage instance '${id}' encrypted at rest via Keychain key.`);
      } catch (recryptErr) {
        StorageLogger.warn(`Recrypt warning for storage '${id}':`, recryptErr);
      }
    });
  } catch (error) {
    StorageLogger.error('Failed to execute storage encryption upgrade:', error);
  }
};
