import { BaseStorage } from './BaseStorage';
import { StoragePrimitive } from '../types';

/**
 * In-Memory Fallback Storage Implementation
 * Used when MMKV JSI is unavailable (e.g. Chrome Remote Debugging mode).
 */
export class InMemoryStorage extends BaseStorage {
  readonly id: string;
  private readonly memoryMap = new Map<string, StoragePrimitive>();

  constructor(id: string) {
    super();
    this.id = id;
  }

  set(key: string, value: StoragePrimitive): void {
    this.memoryMap.set(key, value);
  }

  getString(key: string): string | undefined {
    const val = this.memoryMap.get(key);
    return typeof val === 'string' ? val : undefined;
  }

  getNumber(key: string): number | undefined {
    const val = this.memoryMap.get(key);
    return typeof val === 'number' ? val : undefined;
  }

  getBoolean(key: string): boolean | undefined {
    const val = this.memoryMap.get(key);
    return typeof val === 'boolean' ? val : undefined;
  }

  contains(key: string): boolean {
    return this.memoryMap.has(key);
  }

  delete(key: string): void {
    this.memoryMap.delete(key);
  }

  clearAll(): void {
    this.memoryMap.clear();
  }

  getAllKeys(): readonly string[] {
    return Array.from(this.memoryMap.keys());
  }
}
