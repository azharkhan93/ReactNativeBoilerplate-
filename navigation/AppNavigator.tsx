import React, { ComponentType, useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { TopBar } from '@/components/TopBar';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
import { FilterModal } from '@/components/FilterModal';
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
import { ReviewSuccessScreen } from '@/screens/ReviewSuccessScreen';
import { UserRole } from '../__generated__/graphql';
import { TabBarHeightContext } from '@/utils/tabBar.constants';
import { useAppNavigator } from './useAppNavigator';

const SCREENS: Record<
  string,
  ComponentType<{
    onNavigate?: (route: string, params?: Record<string, unknown>) => void;
  }>
> = {
  dashboard: VendorDashboard,
  analytics: VendorAnalyticsScreen,
  nearbyProviders: NearbyProvidersScreen,
  liveTracking: LiveTrackingScreen,
  support: SupportScreen,
  serviceDispute: ServiceDisputeScreen,
  ratingReview: RatingReviewScreen,
  reviewSuccess: ReviewSuccessScreen,
};

interface VendorSearchResultItemProps {
  id: string;
  businessName: string;
  onPress: (id: string) => void;
}

const VendorSearchResultItem: React.FC<VendorSearchResultItemProps> = React.memo(
  ({ id, businessName, onPress }) => (
    <TouchableOpacity
      className="py-2.5 border-b border-slate-100 last:border-0"
      onPress={() => onPress(id)}
    >
      <Text className="text-slate-900 font-medium">{businessName}</Text>
    </TouchableOpacity>
  ),
);

export const AppNavigator: React.FC = () => {
  const {
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
  } = useAppNavigator();

  const renderScreen = useCallback(() => {
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
          onLogout={handleLogout}
        />
      );
    }

    if (activeTab === 'vendorDetails') {
      return (
        <VendorDetailScreen
          vendorId={selectedVendorId}
          onNavigate={handleNavigate}
          onRequestAuth={handleRequestAuth}
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
        searchQuery={searchValue}
        onSelectCategory={catId => {
          setActiveFilters(prev => ({
            ...prev,
            categoryId: prev.categoryId === catId ? null : catId,
          }));
        }}
      />
    );
  }, [
    activeTab,
    userRole,
    userLocation,
    selectedVendorId,
    trackingParams,
    activeFilters,
    searchValue,
    handleNavigate,
    handleLogout,
    handleRequestAuth,
    setActiveFilters,
  ]);

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={handleOnboardingFinish}
        onLocationSelect={setUserLocation}
      />
    );
  }

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
            onSearch={handleSearch}
            location={userLocation.address}
          />
        )}

        <View className="flex-1 bg-[#F1F6FD]">{renderScreen()}</View>

        {/* Vendor Search Results */}
        {(searchData?.searchVendors ?? []).length > 0 && (
          <View className="absolute top-36 left-4 right-4 bg-white border border-slate-200/80 shadow-xl z-50 p-4 rounded-2xl">
            {(searchData?.searchVendors ?? []).map(v => (
              <VendorSearchResultItem
                key={v.id}
                id={v.id}
                businessName={v.businessName}
                onPress={id => handleNavigate('vendorDetails', { vendorId: id })}
              />
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
          onSuccess={handlePhoneSuccess}
        />
      </View>
    </TabBarHeightContext.Provider>
  );
};
