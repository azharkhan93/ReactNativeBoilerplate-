import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client/react';
import { ServiceDispute } from '../../components/Customer/ServiceDispute';
import { CREATE_DISPUTE } from '@/components/Customer/bookingQueries';

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

  const [createDispute] = useMutation(CREATE_DISPUTE);

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      const reasonText = (data?.reason as string) || (data?.description as string) || 'Service Dispute';
      try {
        await createDispute({
          variables: {
            input: {
              bookingId,
              reason: reasonText,
            },
          },
        });
      } catch (err) {
        console.error('Error submitting dispute:', err);
      } finally {
        onNavigate?.('support');
      }
    },
    [bookingId, createDispute, onNavigate],
  );

  return (
    <View className="flex-1 bg-[#F1F6FD]">
      <ServiceDispute
        bookingId={bookingId}
        providerName={providerName}
        onCancel={() => onNavigate?.('support')}
        onSubmit={handleSubmit}
      />
    </View>
  );
};
