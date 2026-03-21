import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { AvailabilityContent } from '../Availability';
import { BankAccountDetails } from '../BankAccountDetails';
import { BusinessProfile } from '../BusinessProfile';
import { ManageServices } from '../ManageServices';
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
    const [showManageServices, setShowManageServices] = React.useState(false);

    const handleLinkPress = (id: string) => {
        if (id === 'availability') { setShowAvailability(true); return; }
        if (id === 'bank') { setShowBankAccount(true); return; }
        if (id === 'business') { setShowBusinessProfile(true); return; }
        if (id === 'services') { setShowManageServices(true); return; }
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
                height="100%"
               
            >
                <AvailabilityContent onClose={() => setShowAvailability(false)} />
            </BottomSheetModal>

            <BottomSheetModal
                visible={showBankAccount}
                onClose={() => setShowBankAccount(false)}
                title="Bank Account Details"
                height="100%"
               
            >
                <BankAccountDetails />
            </BottomSheetModal>

            <BottomSheetModal
                visible={showBusinessProfile}
                onClose={() => setShowBusinessProfile(false)}
                title="Business Profile"
                height="85%"
            >
                <BusinessProfile />
            </BottomSheetModal>

            <BottomSheetModal
                visible={showManageServices}
                onClose={() => setShowManageServices(false)}
                height="100%"
                title="Manage Services"
            >
                <ManageServices />
            </BottomSheetModal>
        </View>
    );
};
