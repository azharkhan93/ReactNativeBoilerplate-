/**
 * Centralized Storage Keys
 * Prevents magic strings across the application.
 */

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_profile',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  BOOKING_DRAFT: 'booking_draft',
  LAST_LOCATION: 'last_known_location',
  NOTIFICATION_SETTINGS: 'notification_settings',
  HAS_COMPLETED_ONBOARDING: 'has_completed_onboarding',
  HAS_SEEN_SPLASH: 'has_seen_splash',
  USER_ROLE: 'user_role',
  USER_PHONE: 'user_phone',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
