import { RefObject } from 'react';
import { FlatList } from 'react-native';
import { UserRole } from '../../__generated__/graphql';

export interface OnboardingScreenProps {
  readonly onFinish: (role: UserRole) => void;
  readonly onLocationSelect?: (data: {
    address: string;
    coords: { latitude: number; longitude: number };
  }) => void;
}

export interface UseOnboardingSwipeParams {
  readonly totalSteps: number;
  readonly totalSlides: number;
  readonly selectedRole: UserRole | null;
  readonly width: number;
  readonly onFinish: (role: UserRole) => void;
}

export interface UseOnboardingSwipeResult {
  readonly currentStep: number;
  readonly isScrollEnabled: boolean;
  readonly flatListRef: RefObject<FlatList | null>;
  readonly handleNext: () => void;
  readonly handleBack: () => void;
  readonly handleSkip: () => void;
  readonly handleScrollEnd: (event: any) => void;
}

export interface SwipeIndicatorProps {
  readonly visible: boolean;
}
