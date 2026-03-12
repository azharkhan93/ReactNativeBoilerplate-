import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { X } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface PhotoPreviewProps {
    uri: string;
    index: number;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({ uri, index }) => (
    <Animated.View entering={FadeInRight.delay(400 + index * 100)} className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden">
        <Image source={{ uri }} className="w-full h-full" />
        <TouchableOpacity className="absolute top-1 right-1 bg-black/40 rounded-full p-1">
            <X size={12} color="white" />
        </TouchableOpacity>
    </Animated.View>
);
