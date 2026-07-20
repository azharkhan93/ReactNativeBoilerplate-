import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceDispute } from '../../components/Customer/ServiceDispute';

export interface ServiceDisputeScreenProps {
  onNavigate?: (screen: string, params?: Record<string, unknown>) => void;
  route?: { params?: { bookingId?: string; providerName?: string } };
}

export const ServiceDisputeScreen: React.FC<ServiceDisputeScreenProps> = ({
  onNavigate,
  route,
}) => {
  const bookingId = route?.params?.bookingId || 'BK-88291';
  const providerName = route?.params?.providerName || 'Car Detailing Pros';

  const handleSubmit = useCallback(
    (_data: Record<string, unknown>) => {
      onNavigate?.('support');
    },
    [onNavigate],
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F1F6FD]" edges={['top', 'bottom']}>
      <ServiceDispute
        bookingId={bookingId}
        providerName={providerName}
        onCancel={() => onNavigate?.('support')}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};
