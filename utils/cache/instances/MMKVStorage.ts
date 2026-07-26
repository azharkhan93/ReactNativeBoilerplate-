import { MMKV } from 'react-native-mmkv';
import { BaseStorage } from './BaseStorage';
import { StorageLogger } from '../logger';
import { StoragePrimitive } from '../types';

/**
 * Production MMKV Storage Instance Implementation
 */
export class MMKVStorage extends BaseStorage {
  readonly id: string;
  private readonly mmkv: MMKV;

  constructor(id: string, mmkv: MMKV) {
    super();
    this.id = id;
    this.mmkv = mmkv;
  }

  set(key: string, value: StoragePrimitive): void {
    try {
      this.mmkv.set(key, value);
    } catch (error) {
      StorageLogger.error(`MMKV set failed for key '${key}'`, error);
    }
  }

  getString(key: string): string | undefined {
    try {
      return this.mmkv.getString(key);
    } catch (error) {
      StorageLogger.error(`MMKV getString failed for key '${key}'`, error);
      return undefined;
    }
  }

  getNumber(key: string): number | undefined {
    try {
      return this.mmkv.getNumber(key);
    } catch (error) {
      StorageLogger.error(`MMKV getNumber failed for key '${key}'`, error);
      return undefined;
    }
  }

  getBoolean(key: string): boolean | undefined {
    try {
      return this.mmkv.getBoolean(key);
    } catch (error) {
      StorageLogger.error(`MMKV getBoolean failed for key '${key}'`, error);
      return undefined;
    }
  }

  contains(key: string): boolean {
    try {
      return this.mmkv.contains(key);
    } catch (error) {
      StorageLogger.error(`MMKV contains failed for key '${key}'`, error);
      return false;
    }
  }

  delete(key: string): void {
    try {
      this.mmkv.delete(key);
    } catch (error) {
      StorageLogger.error(`MMKV delete failed for key '${key}'`, error);
    }
  }

  clearAll(): void {
    try {
      this.mmkv.clearAll();
    } catch (error) {
      StorageLogger.error(`MMKV clearAll failed for instance '${this.id}'`, error);
    }
  }

  getAllKeys(): readonly string[] {
    try {
      return this.mmkv.getAllKeys();
    } catch (error) {
      StorageLogger.error(`MMKV getAllKeys failed for instance '${this.id}'`, error);
      return [];
    }
  }
}
