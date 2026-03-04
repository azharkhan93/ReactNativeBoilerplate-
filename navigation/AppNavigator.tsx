import React, { useState } from 'react';
import { View } from 'react-native';

import { TopBar } from '@/components/TopBar';
import { BottomTabNavigator } from '@/components/BottomTabNavigator';
import { HomeScreen,  ProfileScreen,  BookingsScreen } from '@/screens';
import { VendorDashboard } from '@/components/Vendor/VendorDashboard';
import { VendorAnalyticsScreen } from '@/components/Vendor/VendorAnalyticsScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen/OnboardingScreen';

import { VENDOR_TABS, CUSTOMER_TABS, HIDDEN_TOPBAR_ROUTES } from './tabs';
import { PhoneVerificationModal } from './PhoneVerificationModal';

type UserRole = 'customer' | 'provider';

export const AppNavigator: React.FC = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleOnboardingFinish = (role: UserRole) => {
        setUserRole(role);
        setShowOnboarding(false);
        if (role === 'customer') {
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
            case 'bookings': return <BookingsScreen />;
            case 'analytics': return <VendorAnalyticsScreen />;
            
            case 'profile': return <ProfileScreen userRole={userRole} onNavigate={setActiveTab} />;
            default: return <HomeScreen userRole={userRole} />;
        }
    };

    const tabs = userRole === 'provider' ? VENDOR_TABS : CUSTOMER_TABS;
    const showTopBar = !HIDDEN_TOPBAR_ROUTES.includes(activeTab);

    return (
        <View style={{ flex: 1 }}>
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
                value={phoneNumber}
                onChange={setPhoneNumber}
                onConfirm={() => setShowPhoneModal(false)}
            />
        </View>
    );
};
