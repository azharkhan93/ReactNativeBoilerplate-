import { useState, useEffect, useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';
import { UserRole } from '../__generated__/graphql';
import { useVendorSearch } from '@/hooks/useVendorSearch';
import { useRegisterDeviceToken } from '@/hooks/useRegisterDeviceToken';
import { FilterValues } from '@/components/FilterModal';
import { setAuthData, getUserId } from '@/utils/store/authStore';
import { GET_USER_AVATAR } from '@/components/Customer/customerQueries';
import {
  appStorage,
  STORAGE_KEYS,
  persistCriticalKey,
  removeCriticalKey,
  hydrateStorageFromAsyncStorage,
} from '@/utils/cache';
import {
  getStoredLocation,
  setStoredLocation,
  isLocationPermissionGranted,
  getCurrentLocation,
  reverseGeocode,
  LocationData,
} from '@/utils/locationHelper';
import { VENDOR_TABS, CUSTOMER_TABS, HIDDEN_TOPBAR_ROUTES } from './tabs';
import {
  TAB_BAR_TOTAL_HEIGHT,
  TAB_BAR_ANDROID_BOTTOM_OFFSET,
  TAB_BAR_IOS_MIN_BOTTOM_OFFSET,
} from '@/utils/tabBar.constants';

export type { LocationData };

const DEFAULT_FALLBACK_LOCATION: LocationData = {
  address: 'Location not set',
  coords: { latitude: 0, longitude: 0 },
};

export const useAppNavigator = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);

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

  const [searchValue, setSearchValue] = useState<string>('');
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [pendingAuthCallback, setPendingAuthCallback] = useState<
    (() => void) | null
  >(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [userLocation, setUserLocationState] = useState<LocationData>(() => {
    const stored = getStoredLocation();
    return stored ?? DEFAULT_FALLBACK_LOCATION;
  });

  const [trackingParams, setTrackingParams] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    categoryId: null,
    priceRange: null,
    sortBy: null,
  });

  const { bottom } = useSafeAreaInsets();
  const { data: searchData, setSearchTerm } = useVendorSearch();
  const { registerToken } = useRegisterDeviceToken();

  const tabBarHeight =
    Platform.OS === 'ios'
      ? TAB_BAR_TOTAL_HEIGHT + Math.max(bottom, TAB_BAR_IOS_MIN_BOTTOM_OFFSET)
      : TAB_BAR_TOTAL_HEIGHT + TAB_BAR_ANDROID_BOTTOM_OFFSET;

  
  const handleSetUserLocation = useCallback((location: LocationData): void => {
    setUserLocationState(location);
    setStoredLocation(location);
  }, []);

  
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

  // Auto-refresh location on launch if permission is already granted
  useEffect(() => {
    let isMounted = true;

    const refreshRealLocation = async (): Promise<void> => {
      try {
        const hasGranted = await isLocationPermissionGranted();
        if (!hasGranted || !isMounted) {
          return;
        }

        const coords = await getCurrentLocation();
        if (!isMounted) {
          return;
        }

        const geoResult = await reverseGeocode(
          coords.latitude,
          coords.longitude,
        );
        if (!isMounted) {
          return;
        }

        const freshLocation: LocationData = {
          address: geoResult.address,
          coords,
        };

        setUserLocationState(freshLocation);
        await setStoredLocation(freshLocation);
      } catch (error) {
        if (__DEV__) {
          console.warn('[useAppNavigator] Location refresh error:', error);
        }
      }
    };

    refreshRealLocation();

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
  }, [showOnboarding, activeTab]);

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

  useEffect(() => {
    if (userRole === UserRole.Provider && activeTab === 'home') {
      setActiveTab('dashboard');
    }
  }, [userRole, activeTab]);

  const handleRequestAuth = useCallback(
    (onSuccessCallback?: () => void): void => {
      if (onSuccessCallback) {
        setPendingAuthCallback(() => onSuccessCallback);
      }
      setShowPhoneModal(true);
    },
    [],
  );

  const handleNavigate = useCallback(
    (route: string, params?: Record<string, unknown>): void => {
      Keyboard.dismiss();
      if (route === 'vendorDetails' && params?.vendorId) {
        setSelectedVendorId(params.vendorId as string);
      }
      if (route === 'liveTracking' && params) {
        setTrackingParams(params);
      }
      setActiveTab(route);
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
      const dest = role === UserRole.Customer ? 'home' : 'dashboard';
      setActiveTab(dest);
      setTimeout(() => setShowPhoneModal(true), 500);
    },
    [],
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    setUserRole(null);
    setUserId(null);
    await removeCriticalKey(STORAGE_KEYS.USER_ROLE);
    setActiveTab('home');
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

  const handleSearch = useCallback(
    (query: string): void => {
      setSearchValue(query);
      setSearchTerm(query);
    },
    [setSearchTerm],
  );

  const tabs = userRole === UserRole.Provider ? VENDOR_TABS : CUSTOMER_TABS;
  const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);
  const showTabBar = tabs.some(tab => tab.route === activeTab);

  return {
    activeTab,
    selectedVendorId,
    userRole,
    showOnboarding,
    searchValue,
    showPhoneModal,
    userLocation,
    trackingParams,
    isFilterModalOpen,
    activeFilters,
    searchData,
    tabBarHeight,
    avatarUrl,
    tabs,
    showTopBar,
    showTabBar,
    setUserLocation: handleSetUserLocation,
    setIsFilterModalOpen,
    setActiveFilters,
    setShowPhoneModal,
    handleRequestAuth,
    handleNavigate,
    handleOnboardingFinish,
    handleLogout,
    handlePhoneSuccess,
    handleSearch,
  };
};
