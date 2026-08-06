import React, { ComponentType, useCallback } from 'react';
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
import { ReviewSuccessScreen } from '@/screens/ReviewSuccessScreen';
import { UserRole } from '@/__generated__/graphql';
import { FilterValues } from '@/components/FilterModal/types';
import { ScreenRendererProps } from './types';

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

export const ScreenRenderer: React.FC<ScreenRendererProps> = React.memo(
  ({
    activeTab,
    userRole,
    userLocation,
    selectedVendorId,
    trackingParams,
    activeFilters,
    searchValue,
    onNavigate,
    onLogout,
    onRequestAuth,
    setActiveFilters,
  }) => {
    const handleSelectCategory = useCallback(
      (catId: string) => {
        setActiveFilters((prev: FilterValues) => ({
          ...prev,
          categoryId: prev.categoryId === catId ? null : catId,
        }));
      },
      [setActiveFilters],
    );

    if (activeTab === 'bookings') {
      return userRole === UserRole.Provider ? (
        <BookingsScreen />
      ) : (
        <CustomerBookingsScreen onNavigate={onNavigate} />
      );
    }

    if (activeTab === 'profile') {
      return (
        <ProfileScreen
          userRole={userRole}
          userLocation={userLocation.address}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      );
    }

    if (activeTab === 'vendorDetails') {
      return (
        <VendorDetailScreen
          vendorId={selectedVendorId}
          onNavigate={onNavigate}
          onRequestAuth={onRequestAuth}
        />
      );
    }

    if (activeTab === 'liveTracking') {
      return (
        <LiveTrackingScreen
          onNavigate={onNavigate}
          destination={userLocation.coords}
          {...trackingParams}
        />
      );
    }

    const ScreenComp = SCREENS[activeTab];
    if (ScreenComp) {
      return <ScreenComp onNavigate={onNavigate} />;
    }

    return (
      <HomeScreen
        userRole={userRole}
        onNavigate={onNavigate}
        activeFilters={activeFilters}
        searchQuery={searchValue}
        onSelectCategory={handleSelectCategory}
      />
    );
  },
);
