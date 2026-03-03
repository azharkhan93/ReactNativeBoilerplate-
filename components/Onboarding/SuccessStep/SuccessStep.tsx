import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { CheckCircle2, ChevronRight, X } from 'lucide-react-native';
import { Typography } from '../../theme/Typography';
import { Button } from '../../theme/Button';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SuccessStepProps {
    onFinish: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ onFinish }) => {
    return (
        <View style={{ width }} className="flex-1 items-center justify-between px-8 py-12 bg-white">
            <Animated.View entering={FadeIn.duration(500)} className="w-full">
                <X color="#94a3b8" size={24} className="self-start opacity-70 mb-4" />
                <Typography variant="h3" className="text-slate-900 text-center mb-8">Success</Typography>
            </Animated.View>

            <View className="items-center">
                <Animated.View
                    entering={ZoomIn.duration(600).springify()}
                    className="w-64 h-64 rounded-full items-center justify-center mb-12 relative overflow-hidden bg-blue-50 border border-blue-100 shadow-sm"
                >
                    {/* Subtle background glow */}
                    <View className="absolute inset-0 bg-blue-500/5" />

                    {/* Icon or Image Placeholder */}
                    <View className="w-48 h-48 rounded-full border-2 border-white items-center justify-center bg-white shadow-sm">
                        <CheckCircle2 size={80} color="#3b82f6" strokeWidth={1} />
                    </View>
                </Animated.View>

                <Typography variant="h2" >You're Ready to Book</Typography>
                <Typography variant="body-lg">
                    Your account is all set. Browse top-rated providers and schedule your first professional service in minutes.
                </Typography>
            </View>

            <View className="w-full items-center">
                <PaginationDots current={2} total={3} />

                <Button
                    onPress={onFinish}
                    className="w-full mb-6"
                    size="lg"
                >
                    <View className="flex-row items-center">
                        <Typography variant="body-lg" className="text-white font-body-semibold mr-2">Go to Home</Typography>
                        <ChevronRight size={20} color="white" />
                    </View>
                </Button>

                <Typography variant="body-sm" className="text-slate-400 uppercase tracking-widest text-[10px]">
                    Enterprise Secure Checkout Enabled
                </Typography>
            </View>
        </View>
    );
};

const PaginationDots = ({ current, total }: { current: number, total: number }) => (
    <View className="flex-row gap-2 mb-8">
        {Array.from({ length: total }).map((_, i) => (
            <View
                key={i}
                className="h-1 rounded-full"
                style={{
                    width: i === current ? 32 : 12,
                    backgroundColor: i === current ? '#3b82f6' : '#E2E8F0'
                }}
            />
        ))}
    </View>
);
