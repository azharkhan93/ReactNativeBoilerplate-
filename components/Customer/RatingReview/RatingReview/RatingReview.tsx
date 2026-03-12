import React from 'react';
import { TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Typography, Button, Container } from '../../../theme';
import { StarRating } from '../StarRating';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FEEDBACK_TAGS, RATING_LABELS, MOCK_REVIEW_PHOTOS } from '../constants';
import { useRatingReview, ReviewData } from '../useRatingReview';

// Standalone Components
import { ReviewHeader } from '../ReviewHeader';
import { ProviderInfo } from '../ProviderInfo';
import { PhotoPreview } from '../PhotoPreview';

interface RatingReviewProps {
    providerName: string;
    onSubmit: (data: ReviewData) => void;
    onClose: () => void;
}

export const RatingReview: React.FC<RatingReviewProps> = ({ providerName, onSubmit, onClose }) => {
    const { 
        rating, setRating, review, setReview, selectedTags, toggleTag, handleSubmit 
    } = useRatingReview(onSubmit);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
            <ReviewHeader onClose={onClose} />
            
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                <Container variant="column-centered" className="px-6 pt-10">
                    <ProviderInfo providerName={providerName} />

                    <Animated.View entering={FadeInDown.delay(200)} className="items-center mb-6 w-full">
                        <Typography variant="subheading" className="text-slate-900 text-lg mb-4">How was your experience?</Typography>
                        <StarRating rating={rating} onRatingChange={setRating} size={40} />
                        {rating > 0 && (
                            <Typography variant="body" className="font-heading-semibold text-primary-500 mt-2">
                                {RATING_LABELS[rating]}
                            </Typography>
                        )}
                    </Animated.View>

                    <Container variant="column-start" gap={3} className="w-full mb-8">
                        <Typography variant="body-sm" className="text-slate-900 font-heading-semibold uppercase tracking-wider">WHAT DID YOU LIKE?</Typography>
                        <View className="flex-row flex-wrap gap-3">
                            {FEEDBACK_TAGS.map(tag => (
                                <TouchableOpacity
                                    key={tag}
                                    onPress={() => toggleTag(tag)}
                                    activeOpacity={0.7}
                                    className={`px-5 py-2.5 rounded-full border ${selectedTags.includes(tag) ? 'bg-primary-50 border-primary-500' : 'bg-white border-slate-200'}`}
                                >
                                    <Typography variant="body-sm" className={selectedTags.includes(tag) ? 'text-primary-600 font-body-medium' : 'text-slate-600'}>{tag}</Typography>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Container>

                    <Container variant="column-start" gap={3} className="w-full mb-8">
                        <Typography variant="body-sm" className="text-slate-900 font-heading-semibold uppercase tracking-wider">WRITE A REVIEW</Typography>
                        <View className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 h-32">
                            <TextInput
                                placeholder="Tell us more about your service experience..."
                                multiline
                                textAlignVertical="top"
                                value={review}
                                onChangeText={setReview}
                                className="flex-1 text-slate-800 font-body"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </Container>

                    <Container variant="column-start" gap={3} className="w-full mb-10">
                        <Typography variant="body-sm" className="text-slate-900 font-heading-semibold uppercase tracking-wider">UPLOAD PHOTOS</Typography>
                        <View className="flex-row gap-4">
                            <TouchableOpacity className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 items-center justify-center">
                                <Camera size={24} color="#94A3B8" />
                                <Typography variant="body-sm" className="text-slate-400 mt-1">Add Photo</Typography>
                            </TouchableOpacity>
                            {MOCK_REVIEW_PHOTOS.map((uri, i) => <PhotoPreview key={i} uri={uri} index={i} />)}
                        </View>
                    </Container>

                    <Button onPress={handleSubmit} disabled={rating === 0} size="lg" className="w-full" variant={rating === 0 ? 'disabled' : 'primary'}>
                        Submit Review
                    </Button>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
