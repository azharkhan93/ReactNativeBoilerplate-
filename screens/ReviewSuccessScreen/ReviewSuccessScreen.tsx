import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { Typography, Button, Container } from '../../components/theme';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export interface ReviewSuccessScreenProps {
  onNavigate: (screen: string) => void;
}

export const ReviewSuccessScreen: React.FC<ReviewSuccessScreenProps> = ({ onNavigate }) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <Container variant="column-centered" className="flex-1 px-6 justify-center">
        <Animated.View 
          entering={FadeInUp.duration(600).springify()} 
          className="bg-primary-50 p-8 rounded-full mb-8"
        >
          <CheckCircle2 size={80} color="#3b82f6" strokeWidth={1.5} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(600)} className="items-center mb-12">
          <Typography variant="h2" className="text-slate-900 text-center mb-3">
            Review Submitted!
          </Typography>
          <Typography variant="body" className="text-slate-500 text-center px-4">
            Thank you for sharing your experience. Your feedback helps our community and service providers improve.
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} className="w-full">
          <Button 
            onPress={() => onNavigate('home')}
            className="w-full"
            variant="primary"
          >
            Back to Home
          </Button>
        </Animated.View>
      </Container>
    </SafeAreaView>
  );
};
