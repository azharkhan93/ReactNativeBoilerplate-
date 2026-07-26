/**
 * Storage Architecture Types
 */

export type StoragePrimitive = string | number | boolean | Uint8Array;

export interface StorageInstance {
  readonly id: string;
  set(key: string, value: StoragePrimitive): void;
  getString(key: string): string | undefined;
  getNumber(key: string): number | undefined;
  getBoolean(key: string): boolean | undefined;
  setObject<T>(key: string, value: T): void;
  getObject<T>(key: string): T | null;
  contains(key: string): boolean;
  delete(key: string): void;
  clearAll(): void;
  getAllKeys(): readonly string[];
}

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export type StorageChangeListener = (key: string) => void;
