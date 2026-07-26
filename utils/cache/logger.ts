/**
 * Centralized Storage Logger
 * Automatically suppresses logging in production environments.
 */

class StorageLoggerImpl {
  private readonly isEnabled: boolean = __DEV__;

  info(message: string, ...args: readonly unknown[]): void {
    if (this.isEnabled) {
      console.info(`[Storage:Info] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: readonly unknown[]): void {
    if (this.isEnabled) {
      console.warn(`[Storage:Warn] ${message}`, ...args);
    }
  }

  error(message: string, error?: unknown): void {
    if (this.isEnabled) {
      console.error(`[Storage:Error] ${message}`, error ?? '');
    }
  }

  debug(message: string, ...args: readonly unknown[]): void {
    if (this.isEnabled) {
      console.debug(`[Storage:Debug] ${message}`, ...args);
    }
  }
}

export const StorageLogger = new StorageLoggerImpl();
