import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { TopBar } from '@/components/TopBar';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
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

const SCREENS: Record<string, React.ComponentType<any>> = {
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
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    categoryId: null,
    priceRange: null,
    sortBy: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, [showOnboarding, activeTab]);

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

  const handleNavigate = (route: string, params?: any) => {
    if (route === 'vendorDetails' && params?.vendorId) {
      setSelectedVendorId(params.vendorId);
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
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
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
      return <VendorDetailScreen vendorId={selectedVendorId} onNavigate={handleNavigate} />;
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
        onSelectCategory={(catId) => {
          setActiveFilters((prev) => ({
            ...prev,
            categoryId: prev.categoryId === catId ? null : catId,
          }));
        }}
      />
    );
  };

  const tabs = userRole === UserRole.Provider ? VENDOR_TABS : CUSTOMER_TABS;
  const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);

  return (
    <View className="flex-1 bg-gray-950">
      {showTopBar && (
        <TopBar 
          placeholder="Search services..." 
          avatarUrl={avatarUrl}
          onProfilePress={() => handleNavigate('profile')}
          onFilterPress={() => setIsFilterModalOpen(true)}
        />
      )}

      <View className="flex-1">{renderScreen()}</View>

      <BottomTabNavigator
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleNavigate}
      />

      <FilterModal
        visible={isFilterModalOpen}
        currentFilters={activeFilters}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(filters) => {
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
  );
};
