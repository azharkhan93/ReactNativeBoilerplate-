import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import {
    Typography,
    Button,
    OnboardingSlide,
    Pagination,
    RoleSelectionStep,
    ONBOARDING_SLIDES
} from '../../components';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
    onFinish: (role: 'customer' | 'provider') => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState<'customer' | 'provider' | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const totalSlides = ONBOARDING_SLIDES.length;
    const totalSteps = totalSlides + 1;

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
        const isRoleStep = index === totalSlides;

        return (
            <View style={{ width, flex: 1 }}>
                {isRoleStep ? (
                    <RoleSelectionStep
                        onSelect={setSelectedRole}
                        selectedRole={selectedRole}
                    />
                ) : (
                    <OnboardingSlide
                        {...ONBOARDING_SLIDES[index]}
                    />
                )}
            </View>
        );
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>

                {/* Skip Button Overlay */}
                <View style={{
                    position: 'absolute',
                    top: 60, // Clear the notch
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
                            {currentStep < totalSteps - 1 && (
                                <TouchableOpacity onPress={handleNext} style={{ paddingVertical: 8 }}>
                                    <Typography className="text-[#A1A1A1] font-body-medium text-lg">Next</Typography>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Final Step Action Button */}
                    {currentStep === totalSteps - 1 && (
                        <Animated.View entering={FadeIn.duration(400)}>
                            <Button
                                onPress={handleNext}
                                size="md"
                                variant={!selectedRole ? 'disabled' : 'primary'}
                                className="w-full shadow-lg shadow-primary-200"
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body" className="text-white font-heading-semibold mr-2">
                                        Get Started
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
