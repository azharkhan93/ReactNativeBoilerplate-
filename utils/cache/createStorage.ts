import { MMKV } from 'react-native-mmkv';
import { StorageLogger } from './logger';
import { StorageInstance } from './types';
import { MMKVStorage } from './instances/MMKVStorage';
import { InMemoryStorage } from './instances/InMemoryStorage';

/**
 * Storage Instance Factory
 * Decoupled factory function that instantiates MMKV with automatic fallback.
 */
export const createStorage = (id: string): StorageInstance => {
  try {
    const instance = new MMKV({ id });
    StorageLogger.info(`MMKV instance '${id}' initialized successfully.`);
    return new MMKVStorage(id, instance);
  } catch (error) {
    StorageLogger.warn(
      `MMKV instance '${id}' unavailable (Remote Debugger or JSI disabled). Using InMemoryStorage fallback.`,
      error,
    );
    return new InMemoryStorage(id);
  }
};
