import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RatingReview } from '../../components/Customer/RatingReview';

export interface RatingReviewScreenProps {
    onNavigate: (screen: string) => void;
    route?: { params?: { providerName?: string } };
}

export const RatingReviewScreen: React.FC<RatingReviewScreenProps> = ({ onNavigate, route }) => {
    // Provider name and other data would normally come from route.params or a state manager
    const providerName = route?.params?.providerName || 'Car Detailing Pros';

    const handleSubmit = (data: any) => {
        console.log('Submitted Rating:', data);
        // Integrate with API here
        onNavigate('reviewSuccess');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <RatingReview
                providerName={providerName}
                onSubmit={handleSubmit}
                onClose={() => onNavigate('support')}
            />
        </SafeAreaView>
    );
};
