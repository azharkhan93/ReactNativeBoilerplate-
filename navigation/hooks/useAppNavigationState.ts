import { useState, useEffect, useCallback } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserRole } from '../../__generated__/graphql';
import { useVendorSearch } from '@/hooks/useVendorSearch';
import { FilterValues } from '@/components/FilterModal';
import { VENDOR_TABS, CUSTOMER_TABS, HIDDEN_TOPBAR_ROUTES } from '../tabs';
import {
  TAB_BAR_TOTAL_HEIGHT,
  TAB_BAR_ANDROID_BOTTOM_OFFSET,
  TAB_BAR_IOS_MIN_BOTTOM_OFFSET,
} from '@/utils/tabBar.constants';

export const useAppNavigationState = (userRole: UserRole | null) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [trackingParams, setTrackingParams] = useState<Record<string, unknown> | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    categoryId: null,
    priceRange: null,
    sortBy: null,
  });

  const { bottom } = useSafeAreaInsets();
  const { data: searchData, setSearchTerm } = useVendorSearch();

  const tabBarHeight =
    Platform.OS === 'ios'
      ? TAB_BAR_TOTAL_HEIGHT + Math.max(bottom, TAB_BAR_IOS_MIN_BOTTOM_OFFSET)
      : TAB_BAR_TOTAL_HEIGHT + TAB_BAR_ANDROID_BOTTOM_OFFSET;

  useEffect(() => {
    if (userRole === UserRole.Provider && activeTab === 'home') {
      setActiveTab('dashboard');
    }
  }, [userRole, activeTab]);

  const handleNavigate = useCallback((route: string, params?: Record<string, unknown>): void => {
    Keyboard.dismiss();
    if (route === 'vendorDetails' && params?.vendorId) {
      setSelectedVendorId(params.vendorId as string);
    }
    if (route === 'liveTracking' && params) {
      setTrackingParams(params);
    }
    setActiveTab(route);
  }, []);

  const handleSearch = useCallback((query: string): void => {
    setSearchValue(query);
    setSearchTerm(query);
  }, [setSearchTerm]);

  const tabs = userRole === UserRole.Provider ? VENDOR_TABS : CUSTOMER_TABS;
  const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);
  const showTabBar =
    tabs.some(tab => tab.route === activeTab) || activeTab === 'support';

  return {
    activeTab,
    setActiveTab,
    selectedVendorId,
    searchValue,
    trackingParams,
    isFilterModalOpen,
    setIsFilterModalOpen,
    activeFilters,
    setActiveFilters,
    searchData,
    tabBarHeight,
    tabs,
    showTopBar,
    showTabBar,
    handleNavigate,
    handleSearch,
  };
};
