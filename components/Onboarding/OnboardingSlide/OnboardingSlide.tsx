/* eslint-disable react-native/no-inline-styles */
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
    const parts = title.split('|');

    return (
        <View style={{ width, flex: 1, backgroundColor: '#030712' }}>
            <Animated.View
                entering={FadeInUp.delay(200).duration(800)}
                className="w-[90%] h-[54%] self-center mt-6 rounded-[36px] overflow-hidden border border-white/10 shadow-2xl shadow-black/80"
            >
                <Image
                    source={image}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(400).duration(800)}
                className="flex-1 justify-center items-center px-10 pb-6"
            >
                <Typography
                    variant="h2"
                    className="text-center mb-3 text-white font-heading-bold"
                    style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 6 }}
                >
                    {parts[0]}
                    {parts[1] && (
                        <>
                            {'\n'}
                            <Typography variant="h2" className="text-primary-500 font-heading-bold">
                                {parts[1]}
                            </Typography>
                        </>
                    )}
                </Typography>
                <Typography
                    variant="body"
                    className="text-center text-gray-400 leading-6 font-body-medium px-4"
                >
                    {description}
                </Typography>
            </Animated.View>
        </View>
    );
};

