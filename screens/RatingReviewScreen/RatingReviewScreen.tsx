import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@apollo/client/react';
import { RatingReview } from '@/components/Customer/RatingReview/RatingReview/RatingReview';
import { ReviewData } from '@/components/Customer/RatingReview/useRatingReview';
import { CREATE_REVIEW } from '@/components/Customer/bookingQueries';

export interface RatingReviewScreenProps {
  onNavigate?: (screen: string, params?: Record<string, unknown>) => void;
  route?: { params?: { bookingId?: string; providerName?: string } };
}

export const RatingReviewScreen: React.FC<RatingReviewScreenProps> = ({
  onNavigate,
  route,
}) => {
  const providerName = route?.params?.providerName || 'Car Detailing Pros';
  const bookingId = route?.params?.bookingId || 'bk_1';

  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = useCallback(
    async (data: ReviewData) => {
      try {
        await createReview({
          variables: {
            input: {
              bookingId,
              rating: data.rating,
              comment: data.review || undefined,
            },
          },
        });
      } catch (err) {
        console.error('Error submitting review:', err);
      } finally {
        onNavigate?.('reviewSuccess');
      }
    },
    [bookingId, createReview, onNavigate],
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
