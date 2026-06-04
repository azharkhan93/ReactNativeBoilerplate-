/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Typography, Button } from '../../components/theme';
import { OnboardingSlide } from '../../components/Onboarding/OnboardingSlide';
import { Pagination } from '../../components/Onboarding/Pagination';
import { LocationStep } from '../../components/Onboarding/LocationStep';
import { ONBOARDING_SLIDES } from '../../components/Onboarding/slides';
import { RoleSelectionStep } from '@/components/Onboarding/RoleSelectionStep';
import { UserRole } from '../../__generated__/graphql';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: (role: UserRole) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onFinish,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const totalSlides = ONBOARDING_SLIDES.length;
  const totalSteps = totalSlides + 2;

  const navigateToStep = (step: number) => {
    setCurrentStep(step);
    flatListRef.current?.scrollToOffset({
      offset: step * width,
      animated: true,
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      navigateToStep(currentStep + 1);
    } else if (selectedRole) {
      onFinish(selectedRole);
    }
  };

  const handleSkip = () => navigateToStep(totalSlides);
  const handleBack = () => currentStep > 0 && navigateToStep(currentStep - 1);

  const renderStep = ({ index }: { index: number }) => {
    if (index < totalSlides) {
      return (
        <View style={{ width, flex: 1 }}>
          <OnboardingSlide {...ONBOARDING_SLIDES[index]} />
        </View>
      );
    }

    if (index === totalSlides) {
      return (
        <View style={{ width, flex: 1 }}>
          <RoleSelectionStep
            onSelect={setSelectedRole}
            selectedRole={selectedRole}
          />
        </View>
      );
    }

    return (
      <View style={{ width, flex: 1 }}>
        <LocationStep onBack={handleBack} />
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#F1F6FD' }}
    >
      <View style={{ flex: 1 }}>
        {/* Content */}
        <FlatList
          ref={flatListRef}
          data={[...Array(totalSteps).keys()]}
          renderItem={renderStep}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `step-${item}`}
          style={{ flex: 1 }}
        />

        {/* Floating SKIP button (Rendered after FlatList to ensure it stays on top of content slides) */}
        {currentStep < totalSlides && (
          <View
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              zIndex: 20,
            }}
          >
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

        {/* Footer Navigation (Solid container with zIndex ensures it stays above overflowing slide content) */}
        <View
          style={{
            paddingHorizontal: 32,
            paddingBottom: 40,
            backgroundColor: '#F1F6FD',
            zIndex: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 48,
              marginBottom: 16,
            }}
          >
            {/* Back Link */}
            <View style={{ width: 80 }}>
              {currentStep > 0 && (
                <TouchableOpacity
                  onPress={handleBack}
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  style={{ paddingVertical: 8 }}
                  activeOpacity={0.7}
                >
                  <Typography className="text-slate-600 font-body-medium">
                    Back
                  </Typography>
                </TouchableOpacity>
              )}
            </View>

            {/* Pagination Dots */}
            <Pagination total={totalSteps} current={currentStep} />

            {/* Next Link */}
            <View style={{ width: 80, alignItems: 'flex-end' }}>
              {currentStep < totalSteps - 1 &&
                (currentStep !== totalSlides || selectedRole) && (
                  <TouchableOpacity
                    onPress={handleNext}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    style={{ paddingVertical: 8 }}
                    activeOpacity={0.7}
                  >
                    <Typography className="text-slate-700 font-body-medium text-lg">
                      Next
                    </Typography>
                  </TouchableOpacity>
                )}
            </View>
          </View>

          {(currentStep === totalSlides || currentStep === totalSteps - 1) && (
            <Animated.View entering={FadeIn.duration(400)}>
              <Button
                onPress={handleNext}
                size="md"
                variant={
                  currentStep === totalSlides && !selectedRole
                    ? 'disabled'
                    : 'primary'
                }
                className="w-full shadow-lg shadow-primary-200"
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body"
                    className="text-white font-heading-semibold mr-2"
                  >
                    {currentStep === totalSteps - 1
                      ? 'Get Started'
                      : 'Continue'}
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
