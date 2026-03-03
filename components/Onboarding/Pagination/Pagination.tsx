import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';

interface PaginationProps {
    total: number;
    current: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total, current }) => {
    return (
        <View className="flex-row gap-2 items-center">
            {Array.from({ length: total }).map((_, index) => {
                const isActive = index === current;

                const animatedStyle = useAnimatedStyle(() => {
                    return {
                        width: withSpring(isActive ? 32 : 10, { damping: 15 }),
                        backgroundColor: withSpring(isActive ? '#FF7A51' : '#E5E7EB'),
                    };
                });



                return (
                    <Animated.View
                        key={index}
                        className="h-1.5 rounded-full"
                        style={animatedStyle}
                    />
                );
            })}
        </View>
    );
};
