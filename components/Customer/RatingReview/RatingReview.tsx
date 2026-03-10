import React, { useState } from 'react';
import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../theme/Typography';
import { Button } from '../../theme/Button';
import { Container } from '../../theme/Container';
import { StarRating } from './StarRating';
import { TipSelector } from './TipSelector';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface RatingReviewProps {
    providerName: string;
    onSubmit: (data: { rating: number; review: string; tip: number | null }) => void;
    onClose: () => void;
}

export const RatingReview: React.FC<RatingReviewProps> = ({ providerName, onSubmit, onClose }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [tip, setTip] = useState<number | null>(null);

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit({ rating, review, tip });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Container variant="column" className="px-6 pt-8">
                    <Animated.View entering={FadeInDown.delay(200)} className="items-center mb-8">
                        <Typography variant="h2" className="text-center mb-2">
                            How was your service?
                        </Typography>
                        <Typography variant="body" className="text-center text-slate-500">
                            Your feedback helps {providerName} improve.
                        </Typography>
                    </Animated.View>

                    <StarRating rating={rating} onRatingChange={setRating} />

                    <Container variant="column" gap={3} className="w-full mb-8 mt-4">
                        <Typography variant="body-sm" className="text-slate-500 font-heading-semibold">
                            WRITE A REVIEW
                        </Typography>
                        <View className="bg-slate-50 rounded-3xl p-4 border border-slate-100 h-32">
                            <TextInput
                                placeholder="Tell us about your experience..."
                                multiline
                                textAlignVertical="top"
                                value={review}
                                onChangeText={setReview}
                                style={{ flex: 1, color: '#1E293B' }}
                            />
                        </View>
                    </Container>

                    <TipSelector selectedAmount={tip} onSelect={setTip} />

                    <Container variant="column" gap={3} className="mt-4">
                        <Button
                            onPress={handleSubmit}
                            disabled={rating === 0}
                            size="md"
                            className="w-full"
                        >
                            Submit Review
                        </Button>
                        <Button
                            variant="primary"
                            onPress={onClose}
                            size="sm"
                            className="w-full"
                        >
                           Not Now
                        </Button>
                    </Container>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
