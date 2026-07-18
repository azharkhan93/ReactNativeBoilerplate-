import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Typography, Button } from '@/components/theme';
import { OnboardingSlide } from '@/components/Onboarding/OnboardingSlide';
import { Pagination } from '@/components/Onboarding/Pagination';
import { LocationStep } from '@/components/Onboarding/LocationStep';
import { RoleSelectionStep } from '@/components/Onboarding/RoleSelectionStep';
import { ONBOARDING_SLIDES } from '@/components/Onboarding/slides';
import { UserRole } from '@/__generated__/graphql';
import { SwipeIndicator } from './components/SwipeIndicator';
import { useOnboardingSwipe } from './hooks';
import { onboardingStyles, slideItemStyle } from './styles';
import { OnboardingScreenProps } from './types';

const TOTAL_SLIDES = ONBOARDING_SLIDES.length;
const TOTAL_STEPS = TOTAL_SLIDES + 2;

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onFinish,
  onLocationSelect,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const {
    currentStep,
    isScrollEnabled,
    flatListRef,
    handleNext,
    handleBack,
    handleSkip,
    handleScrollEnd,
  } = useOnboardingSwipe({
    totalSteps: TOTAL_STEPS,
    totalSlides: TOTAL_SLIDES,
    selectedRole,
    width,
    onFinish,
  });

  const renderStep = ({ index }: { index: number }) => {
    if (index < TOTAL_SLIDES) {
      return (
        <View style={slideItemStyle.slide}>
          <OnboardingSlide {...ONBOARDING_SLIDES[index]} />
        </View>
      );
    }
    if (index === TOTAL_SLIDES) {
      return (
        <View style={slideItemStyle.slide}>
          <RoleSelectionStep onSelect={setSelectedRole} selectedRole={selectedRole} />
        </View>
      );
    }
    return (
      <View style={slideItemStyle.slide}>
        <LocationStep onLocationSelect={onLocationSelect} />
      </View>
    );
  };

  const isOnSlides = currentStep < TOTAL_SLIDES;
  const isOnRoleStep = currentStep === TOTAL_SLIDES;
  const isOnLastStep = currentStep === TOTAL_STEPS - 1;
  const canShowNextLink = currentStep < TOTAL_STEPS - 1 && (!isOnRoleStep || selectedRole !== null);
  const canShowCta = isOnRoleStep || isOnLastStep;

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} className={onboardingStyles.safeArea}>
      <View className={onboardingStyles.contentContainer}>
        <FlatList
          ref={flatListRef}
          data={[...Array(TOTAL_STEPS).keys()]}
          renderItem={renderStep}
          horizontal
          pagingEnabled
          scrollEnabled={isScrollEnabled}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `step-${item}`}
          onMomentumScrollEnd={handleScrollEnd}
          className={onboardingStyles.list}
        />

        {/* Swipe tutorial overlay — only visible on first slide */}
        <SwipeIndicator visible={currentStep === 0} />

        {/* Floating SKIP button */}
        {isOnSlides && (
          <View className={onboardingStyles.skipButtonWrapper}>
            <TouchableOpacity
              onPress={handleSkip}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              className="px-5 py-2.5 bg-white/90 rounded-full border border-slate-200 shadow-md"
              activeOpacity={0.8}
            >
              <Typography className="text-slate-800 font-body-bold tracking-widest">
                SKIP
              </Typography>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer Navigation */}
        <View className={onboardingStyles.footer}>
          <View className={onboardingStyles.navRow}>
            <View className={onboardingStyles.backWrapper}>
              {currentStep > 0 && (
                <TouchableOpacity
                  onPress={handleBack}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  className={onboardingStyles.backButton}
                  activeOpacity={0.7}
                >
                  <Typography className="text-slate-600 font-body-medium">Back</Typography>
                </TouchableOpacity>
              )}
            </View>

            <Pagination total={TOTAL_STEPS} current={currentStep} />

            <View className={onboardingStyles.nextWrapper}>
              {canShowNextLink && (
                <TouchableOpacity
                  onPress={handleNext}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  className={onboardingStyles.nextButton}
                  activeOpacity={0.7}
                >
                  <Typography className="text-slate-700 font-body-medium text-lg">Next</Typography>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {canShowCta && (
            <Animated.View entering={FadeIn.duration(400)}>
              <Button
                onPress={handleNext}
                size="md"
                variant={isOnRoleStep && !selectedRole ? 'disabled' : 'primary'}
                className="w-full shadow-lg shadow-primary-200"
              >
                <View className={onboardingStyles.submitButtonInner}>
                  <Typography variant="body" className="text-white font-heading-semibold mr-2">
                    {isOnLastStep ? 'Get Started' : 'Continue'}
                  </Typography>
                  <ChevronRight size={18} color="white" strokeWidth={2.5} />
                </View>
              </Button>
            </Animated.View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
