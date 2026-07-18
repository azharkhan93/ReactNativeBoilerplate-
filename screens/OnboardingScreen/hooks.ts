import { useState, useCallback, useRef } from 'react';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import { UseOnboardingSwipeParams, UseOnboardingSwipeResult } from './types';

export const useOnboardingSwipe = ({
  totalSteps,
  totalSlides,
  selectedRole,
  onFinish,
}: UseOnboardingSwipeParams): UseOnboardingSwipeResult => {
  const { width } = Dimensions.get('window');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  
  const isScrollEnabled =
    currentStep < totalSlides ||
    (currentStep === totalSlides && selectedRole !== null);

  const navigateToStep = useCallback((step: number): void => {
    setCurrentStep(step);
    flatListRef.current?.scrollToOffset({
      offset: step * width,
      animated: true,
    });
  }, [width]);

  const handleNext = useCallback((): void => {
    if (currentStep < totalSteps - 1) {
      navigateToStep(currentStep + 1);
    } else if (selectedRole) {
      onFinish(selectedRole);
    }
  }, [currentStep, totalSteps, selectedRole, onFinish, navigateToStep]);

  const handleSkip = useCallback((): void => {
    navigateToStep(totalSlides);
  }, [totalSlides, navigateToStep]);

  const handleBack = useCallback((): void => {
    if (currentStep > 0) {
      navigateToStep(currentStep - 1);
    }
  }, [currentStep, navigateToStep]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      try {
        const contentOffsetX = event.nativeEvent.contentOffset.x ?? 0;
        const newStep = Math.round(contentOffsetX / width);
        if (newStep !== currentStep && newStep >= 0 && newStep < totalSteps) {
          setCurrentStep(newStep);
        }
      } catch {
       
      }
    },
    [currentStep, width, totalSteps],
  );

  return {
    currentStep,
    isScrollEnabled,
    flatListRef,
    handleNext,
    handleBack,
    handleSkip,
    handleScrollEnd,
  };
};
