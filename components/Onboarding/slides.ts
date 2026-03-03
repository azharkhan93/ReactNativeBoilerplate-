import { ImageSourcePropType } from 'react-native';

export interface OnboardingSlideData {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const ONBOARDING_SLIDES: OnboardingSlideData[] = [
  {
    id: 'welcome',
    title: 'Expert Car Care at Your Doorstep',
    description: 'Professional car wash services delivered to your location. No more waiting in lines.',
    image: require('@/assets/images/onboarding_welcome.png'),
  },
  {
    id: 'reliable',
    title: 'Trusted & Verified Professionals',
    description: 'Our certified providers are background-checked and highly rated for quality service.',
    image: require('@/assets/images/onboarding_reliable.png'),
  },
  {
    id: 'location',
    title: 'Smart Location Tracking',
    description: 'Find the nearest available service providers in real-time with precise accuracy.',
    image: require('@/assets/images/onboarding_location.png'),
  },
  {
    id: 'premium',
    title: 'Premium Shine Guaranteed',
    description: 'Experience the ultimate car cleaning with eco-friendly products and expert techniques.',
    image: require('@/assets/images/hero_ceramic.png'),
  },
];

