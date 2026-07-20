import React, { ComponentType, useEffect, useState } from 'react';
import { View, Keyboard, TouchableOpacity, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';
import { TopBar } from '@/components/TopBar';
import { useVendorSearch } from '@/hooks/useVendorSearch';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
import { useRegisterDeviceToken } from '@/hooks/useRegisterDeviceToken';
import { FilterModal, FilterValues } from '@/components/FilterModal';
import {
  HomeScreen,
  ProfileScreen,
  BookingsScreen,
  NearbyProvidersScreen,
  LiveTrackingScreen,
  CustomerBookingsScreen,
  SupportScreen,
  RatingReviewScreen,
  ServiceDisputeScreen,
  VendorDetailScreen,
} from '@/screens';
import { VendorDashboard } from '@/components/Vendor/VendorDashboard';
import { VendorAnalyticsScreen } from '@/components/Vendor/VendorAnalyticsScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen/OnboardingScreen';
import { PhoneVerificationModal } from '@/components/Verification/PhoneVerificationModal';
import { VENDOR_TABS, CUSTOMER_TABS, HIDDEN_TOPBAR_ROUTES } from './tabs';
import { ReviewSuccessScreen } from '@/screens/ReviewSuccessScreen';
import { UserRole } from '../__generated__/graphql';
import { setAuthData, getUserId } from '@/utils/store/authStore';
import { GET_USER_AVATAR } from '@/components/Customer/customerQueries';
import {
  TabBarHeightContext,
  TAB_BAR_TOTAL_HEIGHT,
  TAB_BAR_ANDROID_BOTTOM_OFFSET,
  TAB_BAR_IOS_MIN_BOTTOM_OFFSET,
} from '@/utils/tabBar.constants';

const SCREENS: Record<string, ComponentType<{ onNavigate?: (route: string, params?: Record<string, unknown>) => void }>> = {
  dashboard: VendorDashboard,
  analytics: VendorAnalyticsScreen,
  nearbyProviders: NearbyProvidersScreen,
  liveTracking: LiveTrackingScreen,
  support: SupportScreen,
  serviceDispute: ServiceDisputeScreen,
  ratingReview: RatingReviewScreen,
  reviewSuccess: ReviewSuccessScreen,
};

export const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    address: string;
    coords: { latitude: number; longitude: number };
  }>({
    address: 'Dubai, UAE',
    coords: { latitude: 25.2048, longitude: 55.2708 },
  });
  const [trackingParams, setTrackingParams] = useState<any>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    categoryId: null,
    priceRange: null,
    sortBy: null,
  });

  // Computed once at layout level — consumed via TabBarHeightContext in ScreenScrollView
  const { bottom } = useSafeAreaInsets();
  const { data, setSearchTerm } = useVendorSearch();
  const { registerToken } = useRegisterDeviceToken();
  const tabBarHeight =
    Platform.OS === 'ios'
      ? TAB_BAR_TOTAL_HEIGHT + Math.max(bottom, TAB_BAR_IOS_MIN_BOTTOM_OFFSET)
      : TAB_BAR_TOTAL_HEIGHT + TAB_BAR_ANDROID_BOTTOM_OFFSET;

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
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

  const handleNavigate = (route: string, params?: Record<string, unknown>) => {
    Keyboard.dismiss();
    if (route === 'vendorDetails' && params?.vendorId) {
      setSelectedVendorId(params.vendorId as string);
    }
    if (route === 'liveTracking' && params) {
      setTrackingParams(params);
    }
    setActiveTab(route);
  };

  const handleOnboardingFinish = (role: UserRole) => {
    setUserRole(role);
    setShowOnboarding(false);
    const dest = role === UserRole.Customer ? 'home' : 'dashboard';
    setActiveTab(dest);
    setTimeout(() => setShowPhoneModal(true), 500);
  };

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={handleOnboardingFinish}
        onLocationSelect={setUserLocation}
      />
    );
  }

  const renderScreen = () => {
    if (activeTab === 'bookings') {
      return userRole === UserRole.Provider ? (
        <BookingsScreen />
      ) : (
        <CustomerBookingsScreen onNavigate={handleNavigate} />
      );
    }

    if (activeTab === 'profile') {
      return (
        <ProfileScreen
          userRole={userRole}
          userLocation={userLocation.address}
          onNavigate={handleNavigate}
          onLogout={() => {
            setUserRole(null);
            setUserId(null);
            setShowOnboarding(true);
            setActiveTab('home');
          }}
        />
      );
    }

    if (activeTab === 'vendorDetails') {
      return (
        <VendorDetailScreen
          vendorId={selectedVendorId}
          onNavigate={handleNavigate}
        />
      );
    }

    if (activeTab === 'liveTracking') {
      return (
        <LiveTrackingScreen
          onNavigate={handleNavigate}
          destination={userLocation.coords}
          {...trackingParams}
        />
      );
    }

    const ScreenComp = SCREENS[activeTab];
    if (ScreenComp) {
      return <ScreenComp onNavigate={handleNavigate} />;
    }

    return (
      <HomeScreen
        userRole={userRole}
        onNavigate={handleNavigate}
        activeFilters={activeFilters}
        onSelectCategory={catId => {
          setActiveFilters(prev => ({
            ...prev,
            categoryId: prev.categoryId === catId ? null : catId,
          }));
        }}
      />
    );
  };

  const tabs = userRole === UserRole.Provider ? VENDOR_TABS : CUSTOMER_TABS;
  const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);
  const showTabBar = tabs.some(tab => tab.route === activeTab);

  return (
    <TabBarHeightContext.Provider value={tabBarHeight}>
      <View className="flex-1 bg-[#F1F6FD]">
      {showTopBar && (
        <TopBar
          placeholder="Search services..."
          avatarUrl={avatarUrl}
          onProfilePress={() => handleNavigate('profile')}
          onFilterPress={() => setIsFilterModalOpen(true)}
          searchValue={searchValue}
          onSearch={q => {
            setSearchValue(q);
            setSearchTerm(q);
          }}
          location={userLocation.address}
        />
      )}

      <View className="flex-1 bg-[#F1F6FD]">
        {renderScreen()}
      </View>
      {/* Vendor Search Results */}
      {(data?.searchVendors ?? []).length > 0 && (
        <View className="absolute top-36 left-4 right-4 bg-white border border-slate-200/80 shadow-xl z-50 p-4 rounded-2xl">
          {(data?.searchVendors ?? []).map(v => (
            <TouchableOpacity
              key={v.id}
              className="py-2.5 border-b border-slate-100 last:border-0"
              onPress={() =>
                handleNavigate('vendorDetails', { vendorId: v.id })
              }
            >
              <Text className="text-slate-900 font-medium">
                {v.businessName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showTabBar ? (
        <BottomTabNavigator
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={handleNavigate}
        />
      ) : null}

      <FilterModal
        visible={isFilterModalOpen}
        currentFilters={activeFilters}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={filters => {
          setActiveFilters(filters);
          setIsFilterModalOpen(false);
        }}
      />

      <PhoneVerificationModal
        visible={showPhoneModal}
        role={userRole}
        onClose={() => setShowPhoneModal(false)}
        onSuccess={(status, token, uid) => {
          if (token && uid) {
            setAuthData(token, uid);
          }
        }}
      />
      </View>
    </TabBarHeightContext.Provider>
  );
};
