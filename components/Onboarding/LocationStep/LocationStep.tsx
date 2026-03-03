
import React from 'react';
import { View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Search, MapPin, ChevronLeft } from 'lucide-react-native';
import { Typography } from '../../theme/Typography';
import { Container } from '../../theme/Container';
import { Button } from '../../theme/Button';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface LocationStepProps {
    onBack: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ onBack }) => {
    return (
        <View style={{ width }} className="flex-1 bg-white px-6 pt-4">
            <Animated.View entering={FadeIn.duration(500)} className="flex-1">
             
                <Container variant="between" className="mb-8">
                    <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
                        <ChevronLeft color="#1e293b" size={28} />
                    </TouchableOpacity>
                    <Typography variant="subheading" >Onboarding</Typography>
                    <View className="w-8" />
                </Container>

                <Typography variant="body-sm" className="text-slate-400 uppercase font-heading-bold mb-2">
                    Step 3 of 4
                </Typography>

              
                <View className="h-1.5 w-full bg-slate-100 rounded-full mb-10 overflow-hidden">
                    <View className="h-full bg-blue-500" style={{ width: '75%' }} />
                </View>

                <Typography variant="h2" className="text-slate-900 mb-3">Set Your Location</Typography>
                <Typography variant="body" className="text-slate-500 mb-8">
                    We'll use this to find the best car wash service providers near you.
                </Typography>

               
                <View
                    className="flex-row items-center px-4 py-4 rounded-2xl mb-4 border bg-gray-50 border-gray-100"
                >
                    <Search size={20} color="#64748B" className="mr-3" />
                    <TextInput
                        placeholder="Enter your street address"
                        placeholderTextColor="#64748B"
                        className="flex-1 text-slate-900 font-body"
                    />
                </View>

               
                <Button
                    variant="secondary"
                    size="md"
                >
                    <View className="flex-row items-center">
                        <MapPin size={20} color="#3b82f6" className="mr-2" />
                        <Typography >Use Current Location</Typography>
                    </View>
                </Button>

               
                <View
                    className="flex-1 rounded-3xl overflow-hidden border border-slate-100 relative bg-slate-50"
                >
                 
                    <View className="absolute inset-0 opacity-5 flex-wrap flex-row">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <View key={i} className="w-10 h-10 border border-slate-300" />
                        ))}
                    </View>

                    <View className="flex-1 items-center justify-center">
                        <View className="w-12 h-12 rounded-full bg-blue-500/10 items-center justify-center">
                            <View className="w-4 h-4 rounded-full bg-blue-500" />
                        </View>
                        <View className="mt-4 px-3 py-1 rounded bg-white border border-slate-200">
                            <Typography variant="body-sm" >Map Preview</Typography>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

