import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { UserRole } from '../../__generated__/graphql';
import { useRegisterDeviceToken } from '@/hooks/useRegisterDeviceToken';
import { setAuthData, getUserId } from '@/utils/store/authStore';
import { GET_USER_AVATAR } from '@/components/Customer/customerQueries';
import {
  appStorage,
  STORAGE_KEYS,
  persistCriticalKey,
  removeCriticalKey,
  hydrateStorageFromAsyncStorage,
} from '@/utils/cache';

export const useAppSession = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    const storedRole = appStorage.getString(STORAGE_KEYS.USER_ROLE);
    if (storedRole === UserRole.Customer || storedRole === UserRole.Provider) {
      return storedRole as UserRole;
    }
    return null;
  });

  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    const completed = appStorage.getBoolean(
      STORAGE_KEYS.HAS_COMPLETED_ONBOARDING,
    );
    return !completed;
  });

  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [pendingAuthCallback, setPendingAuthCallback] = useState<
    (() => void) | null
  >(null);
  const [userId, setUserId] = useState<string | null>(null);

  const { registerToken } = useRegisterDeviceToken();

  // Storage hydration sync (AsyncStorage -> MMKV)
  useEffect(() => {
    let isMounted = true;
    hydrateStorageFromAsyncStorage()
      .then(() => {
        if (!isMounted) return;
        const hasCompleted = appStorage.getBoolean(
          STORAGE_KEYS.HAS_COMPLETED_ONBOARDING,
        );
        if (hasCompleted) setShowOnboarding(false);
        const storedRole = appStorage.getString(
          STORAGE_KEYS.USER_ROLE,
        ) as UserRole | undefined;
        if (storedRole) setUserRole(storedRole);
      })
      .catch(() => null);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    getUserId().then(id => {
      if (isMounted) setUserId(id);
    });
    return () => {
      isMounted = false;
    };
  }, [showOnboarding]);

  useEffect(() => {
    if (userId) {
      registerToken(userId);
    }
  }, [userId, registerToken]);

  const { data: avatarData } = useQuery(GET_USER_AVATAR, {
    variables: { id: userId ?? '' },
    skip: !userId,
  });
  const avatarUrl = avatarData?.user?.avatarUrl || null;

  const handleRequestAuth = useCallback(
    (onSuccessCallback?: () => void): void => {
      if (onSuccessCallback) {
        setPendingAuthCallback(() => onSuccessCallback);
      }
      setShowPhoneModal(true);
    },
    [],
  );

  const handleOnboardingFinish = useCallback(
    async (role: UserRole): Promise<void> => {
      await persistCriticalKey(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, true);
      await persistCriticalKey(STORAGE_KEYS.HAS_SEEN_SPLASH, true);
      await persistCriticalKey(STORAGE_KEYS.USER_ROLE, role);
      setUserRole(role);
      setShowOnboarding(false);
      setTimeout(() => setShowPhoneModal(true), 500);
    },
    [],
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    setUserRole(null);
    setUserId(null);
    await removeCriticalKey(STORAGE_KEYS.USER_ROLE);
    setShowPhoneModal(true);
  }, []);

  const handlePhoneSuccess = useCallback(
    (_status: string, token?: string, uid?: string, phone?: string): void => {
      if (token && uid) {
        setAuthData(token, uid, phone);
        setUserId(uid);
      }
      setShowPhoneModal(false);
      if (pendingAuthCallback) {
        pendingAuthCallback();
        setPendingAuthCallback(null);
      }
    },
    [pendingAuthCallback],
  );

  return {
    userRole,
    setUserRole,
    showOnboarding,
    setShowOnboarding,
    showPhoneModal,
    setShowPhoneModal,
    userId,
    avatarUrl,
    handleRequestAuth,
    handleOnboardingFinish,
    handleLogout,
    handlePhoneSuccess,
  };
};
