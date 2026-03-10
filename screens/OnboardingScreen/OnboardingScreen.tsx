import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Typography, Button } from '../../components/theme';
import { OnboardingSlide } from '../../components/Onboarding/OnboardingSlide';
import { Pagination } from '../../components/Onboarding/Pagination';
import { LocationStep } from '../../components/Onboarding/LocationStep';
import { ONBOARDING_SLIDES } from '../../components/Onboarding/slides';
import { RoleSelectionStep } from '@/components/Onboarding/RoleSelectionStep';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
    onFinish: (role: 'customer' | 'provider') => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState<'customer' | 'provider' | null>(null);
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

    const handleSkip = () => navigateToStep(totalSteps - 1);
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
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>


                <View style={{
                    position: 'absolute',
                    top: 60,
                    right: 20,
                    zIndex: 10,
                }}>
                    {currentStep < totalSlides && (
                        <TouchableOpacity
                            onPress={handleSkip}
                            className="px-5 py-2.5 bg-black/40 rounded-full border border-white/20 shadow-md"
                        >
                            <Typography className="text-white font-body-bold tracking-widest">SKIP</Typography>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Content */}
                <FlatList
                    ref={flatListRef}
                    data={[...Array(totalSteps).keys()]}
                    renderItem={renderStep}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `step-${item}`}
                    style={{ flex: 1 }}
                />

                {/* Footer Navigation */}
                <View style={{ paddingHorizontal: 32, paddingBottom: 40 }}>
                    {/* Centered Pagination Row with Links */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 48,
                        marginBottom: 16
                    }}>
                        {/* Back Link */}
                        <View style={{ width: 60 }}>
                            {currentStep > 0 && (
                                <TouchableOpacity onPress={handleBack} style={{ paddingVertical: 8 }}>
                                    <Typography className="text-[#A1A1A1] font-body-medium">Back</Typography>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Pagination Dots */}
                        <Pagination total={totalSteps} current={currentStep} />

                        {/* Next Link */}
                        <View style={{ width: 60, alignItems: 'flex-end' }}>
                            {(currentStep < totalSteps - 1 && (currentStep !== totalSlides || selectedRole)) && (
                                <TouchableOpacity onPress={handleNext} style={{ paddingVertical: 8 }}>
                                    <Typography className="text-[#A1A1A1] font-body-medium text-lg">Next</Typography>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Action Button for Multi-stage finalization */}
                    {(currentStep === totalSlides || currentStep === totalSteps - 1) && (
                        <Animated.View entering={FadeIn.duration(400)}>
                            <Button
                                onPress={handleNext}
                                size="md"
                                variant={(currentStep === totalSlides && !selectedRole) ? 'disabled' : 'primary'}
                                className="w-full shadow-lg shadow-primary-200"
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body" className="text-white font-heading-semibold mr-2">
                                        {currentStep === totalSteps - 1 ? 'Get Started' : 'Continue'}
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
