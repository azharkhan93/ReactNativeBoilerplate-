import React, { useState } from 'react';
import { View } from 'react-native';
import { TopBar } from '@/components/TopBar';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
import { HomeScreen, ProfileScreen, BookingsScreen, NearbyProvidersScreen, LiveTrackingScreen, CustomerBookingsScreen, SupportScreen, RatingReviewScreen, ServiceDisputeScreen, } from '@/screens';

import { VendorDashboard } from '@/components/Vendor/VendorDashboard';
import { VendorAnalyticsScreen } from '@/components/Vendor/VendorAnalyticsScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen/OnboardingScreen';
import { PhoneVerificationModal } from '@/components/Verification/PhoneVerificationModal';
import { VENDOR_TABS, CUSTOMER_TABS, HIDDEN_TOPBAR_ROUTES } from './tabs';
import { ReviewSuccessScreen } from '@/screens/ReviewSuccessScreen';
import { UserRole } from '../__generated__/graphql';

export const AppNavigator: React.FC = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    const handleOnboardingFinish = (role: UserRole) => {
        setUserRole(role);
        setShowOnboarding(false);
        if (role === UserRole.Customer) {
            setActiveTab('home');
            setTimeout(() => setShowPhoneModal(true), 500);
        } else {
            setActiveTab('dashboard');
        }
    };

    if (showOnboarding) {
        return <OnboardingScreen onFinish={handleOnboardingFinish} />;
    }

    const renderScreen = () => {
        switch (activeTab) {
            case 'dashboard': return <VendorDashboard onNavigate={setActiveTab} />;
            case 'bookings': return userRole === UserRole.Provider ? <BookingsScreen /> : <CustomerBookingsScreen onNavigate={setActiveTab} />;

            case 'analytics': return <VendorAnalyticsScreen />;

            case 'profile': return <ProfileScreen userRole={userRole} onNavigate={setActiveTab} />;
            case 'nearbyProviders': return <NearbyProvidersScreen onNavigate={setActiveTab} />;
            case 'liveTracking': return <LiveTrackingScreen onNavigate={setActiveTab} />;
            case 'support': return <SupportScreen onNavigate={setActiveTab} />;
            case 'serviceDispute': return <ServiceDisputeScreen onNavigate={setActiveTab} />;
            case 'ratingReview': return <RatingReviewScreen onNavigate={setActiveTab} />;
            case 'reviewSuccess': return <ReviewSuccessScreen onNavigate={setActiveTab} />;
            default: return <HomeScreen userRole={userRole} onNavigate={setActiveTab} />;

        }
    };

    const tabs = userRole === UserRole.Provider ? VENDOR_TABS : CUSTOMER_TABS;
    const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);

    return (
        <View style={{ flex: 1 }} >
            {showTopBar && <TopBar placeholder="Search products, brands..." />}

            <View style={{ flex: 1 }}>
                {renderScreen()}
            </View>

            <BottomTabNavigator
                tabs={tabs}
                activeTab={activeTab}
                onTabPress={setActiveTab}
            />

            <PhoneVerificationModal
                visible={showPhoneModal}
                onClose={() => setShowPhoneModal(false)}
                onSuccess={(status) => {
                    console.log('Phone Verification Status:', status);
                }}
            />
        </View>
    );
};
