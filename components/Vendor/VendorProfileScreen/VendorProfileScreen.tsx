import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { AvailabilityContent } from '../Availability';
import { BankAccountDetails } from '../BankAccountDetails';
import { BusinessProfile } from '../BusinessProfile';
import {
    ProfileHeader,
    ProfileInfo,
    StatsRow,
    ManagementList,
    ProfileActions,
} from './components';

export interface VendorProfileScreenProps {
    onNavigate?: (screen: string) => void;
}

export const VendorProfileScreen: React.FC<VendorProfileScreenProps> = ({ onNavigate }) => {
    const insets = useSafeAreaInsets();
    const [showAvailability, setShowAvailability] = React.useState(false);
    const [showBankAccount, setShowBankAccount] = React.useState(false);
    const [showBusinessProfile, setShowBusinessProfile] = React.useState(false);

    const handleLinkPress = (id: string) => {
        if (id === 'availability') { setShowAvailability(true); return; }
        if (id === 'bank') { setShowBankAccount(true); return; }
        if (id === 'business') { setShowBusinessProfile(true); return; }
        if (onNavigate) onNavigate(id);
        console.log('Navigate to:', id);
    };

    return (
        <View className="flex-1 bg-gray-950">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <ProfileHeader topInset={insets.top} />
                <ProfileInfo />
                <StatsRow />
                <ManagementList onLinkPress={handleLinkPress} />
                <ProfileActions />
            </ScrollView>

            <BottomSheetModal
                visible={showAvailability}
                onClose={() => setShowAvailability(false)}
                title="Availability"
            >
                <AvailabilityContent onClose={() => setShowAvailability(false)} />
            </BottomSheetModal>

            <BottomSheetModal
                visible={showBankAccount}
                onClose={() => setShowBankAccount(false)}
                title="Bank Account Details"
            >
                <BankAccountDetails />
            </BottomSheetModal>

            <BottomSheetModal
                visible={showBusinessProfile}
                onClose={() => setShowBusinessProfile(false)}
                title="Business Profile"
            >
                <BusinessProfile />
            </BottomSheetModal>
        </View>
    );
};
