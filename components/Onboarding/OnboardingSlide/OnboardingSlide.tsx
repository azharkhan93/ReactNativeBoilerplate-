import React from 'react';
import { View, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { Typography } from '../../theme/Typography';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
    title: string;
    description: string;
    image: ImageSourcePropType;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
    title,
    description,
    image
}) => {
    return (
        <View style={{ width, flex: 1, backgroundColor: 'white' }}>
            <Animated.View
                entering={FadeInUp.delay(200).duration(800)}
                className="w-full h-[75%] items-center justify-center overflow-hidden"
            >
                <Image
                    source={image}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(400).duration(800)}
                className="items-center px-10 pt-8"
            >
                <Typography
                    variant="h2"
                    className="text-center mb-3 text-[#1A1A1A] font-heading-bold"
                    style={{ textShadowColor: 'rgba(0,0,0,0.1)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body"
                    className="text-center text-[#666666] leading-6 font-body-medium"
                >
                    {description}
                </Typography>
            </Animated.View>
        </View>
    );
};

