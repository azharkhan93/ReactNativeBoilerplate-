import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TopBar } from '@/components/TopBar';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
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
import { setAuthData } from '@/utils/store/authStore';

export const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

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
    if (role === UserRole.Customer) {
      setActiveTab('home');
      setTimeout(() => setShowPhoneModal(true), 500);
    } else {
      setActiveTab('dashboard');
      setTimeout(() => setShowPhoneModal(true), 500);
    }
  };

  if (showOnboarding) {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <VendorDashboard onNavigate={handleNavigate} />;
      case 'bookings':
        return userRole === UserRole.Provider ? (
          <BookingsScreen />
        ) : (
          <CustomerBookingsScreen onNavigate={handleNavigate} />
        );

      case 'analytics':
        return <VendorAnalyticsScreen />;

      case 'profile':
        return (
          <ProfileScreen 
            userRole={userRole} 
            onNavigate={handleNavigate} 
            onLogout={() => {
              setUserRole(null);
              setShowOnboarding(true);
              setActiveTab('home');
            }} 
          />
        );
      case 'nearbyProviders':
        return <NearbyProvidersScreen onNavigate={handleNavigate} />;
      case 'liveTracking':
        return <LiveTrackingScreen onNavigate={handleNavigate} />;
      case 'support':
        return <SupportScreen onNavigate={handleNavigate} />;
      case 'serviceDispute':
        return <ServiceDisputeScreen onNavigate={handleNavigate} />;
      case 'ratingReview':
        return <RatingReviewScreen onNavigate={handleNavigate} />;
      case 'reviewSuccess':
        return <ReviewSuccessScreen onNavigate={handleNavigate} />;
      case 'vendorDetails':
        return <VendorDetailScreen vendorId={selectedVendorId} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen userRole={userRole} onNavigate={handleNavigate} />;
    }
  };

  const tabs = userRole === UserRole.Provider ? VENDOR_TABS : CUSTOMER_TABS;
  const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);

  return (
    <View className="flex-1 bg-gray-950">
      {showTopBar && <TopBar placeholder="Search products, brands..." />}

      <View className="flex-1">{renderScreen()}</View>

      <BottomTabNavigator
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleNavigate}
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
