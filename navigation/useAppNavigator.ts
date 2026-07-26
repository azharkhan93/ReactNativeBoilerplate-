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
import { appStorage, STORAGE_KEYS, persistCriticalKey, removeCriticalKey } from '@/utils/cache';
import { VENDOR_TABS, CUSTOMER_TABS, HIDDEN_TOPBAR_ROUTES } from './tabs';
import {
  TAB_BAR_TOTAL_HEIGHT,
  TAB_BAR_ANDROID_BOTTOM_OFFSET,
  TAB_BAR_IOS_MIN_BOTTOM_OFFSET,
} from '@/utils/tabBar.constants';

export interface LocationData {
  address: string;
  coords: { latitude: number; longitude: number };
}

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

  const [userLocation, setUserLocation] = useState<LocationData>({
    address: 'Dubai, UAE',
    coords: { latitude: 25.2048, longitude: 55.2708 },
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
    setUserLocation,
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
