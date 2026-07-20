import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RatingReview } from '@/components/Customer/RatingReview/RatingReview/RatingReview';
import { ReviewData } from '@/components/Customer/RatingReview/useRatingReview';

export interface RatingReviewScreenProps {
  onNavigate?: (screen: string, params?: Record<string, unknown>) => void;
  route?: { params?: { providerName?: string } };
}

export const RatingReviewScreen: React.FC<RatingReviewScreenProps> = ({
  onNavigate,
  route,
}) => {
  const providerName = route?.params?.providerName || 'Car Detailing Pros';

  const handleSubmit = useCallback(
    (_data: ReviewData) => {
      onNavigate?.('reviewSuccess');
    },
    [onNavigate],
  );

  const handleClose = useCallback(() => {
    onNavigate?.('support');
  }, [onNavigate]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <RatingReview
        providerName={providerName}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </SafeAreaView>
  );
};
