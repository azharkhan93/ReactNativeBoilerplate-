import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceDispute } from '../../components/Customer/ServiceDispute';

export interface ServiceDisputeScreenProps {
    onNavigate: (screen: string) => void;
    route?: { params?: { bookingId?: string; providerName?: string } };
}

export const ServiceDisputeScreen: React.FC<ServiceDisputeScreenProps> = ({ onNavigate, route }) => {
    // Booking ID and provider name would come from route.params
    const bookingId = route?.params?.bookingId || 'BK-88291';
    const providerName = route?.params?.providerName || 'Car Detailing Pros';

    const handleSubmit = (data: any) => {
        console.log('Reported Issue:', data);
        // Integrate with API / Support system here
        onNavigate('support');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ServiceDispute
                bookingId={bookingId}
                providerName={providerName}
                onSubmit={handleSubmit}
                onCancel={() => onNavigate('support')}
            />
        </SafeAreaView>
    );
};
