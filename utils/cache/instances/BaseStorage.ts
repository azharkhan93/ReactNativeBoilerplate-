import { StorageInstance, StoragePrimitive } from '../types';
import { StorageLogger } from '../logger';

/**
 * Abstract Base Storage Class
 * Implements common JSON object serialization/deserialization to eliminate code duplication.
 */
export abstract class BaseStorage implements StorageInstance {
  abstract readonly id: string;

  abstract set(key: string, value: StoragePrimitive): void;
  abstract getString(key: string): string | undefined;
  abstract getNumber(key: string): number | undefined;
  abstract getBoolean(key: string): boolean | undefined;
  abstract contains(key: string): boolean;
  abstract delete(key: string): void;
  abstract clearAll(): void;
  abstract getAllKeys(): readonly string[];

  setObject<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      this.set(key, json);
    } catch (error) {
      StorageLogger.error(`Storage setObject failed for key '${key}'`, error);
    }
  }

  getObject<T>(key: string): T | null {
    const raw = this.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      StorageLogger.error(`Storage getObject failed for key '${key}'`, error);
      return null;
    }
  }
}
