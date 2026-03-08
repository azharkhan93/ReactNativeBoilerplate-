import React from 'react';
import { View, TouchableOpacity, Platform, DimensionValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Typography, Modal } from '@/components/theme';

export interface BottomSheetModalProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    height?: DimensionValue;
    scrollable?: boolean;
}


export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
    visible, title, onClose, children, height, scrollable = false,
}) => {
    return (
        <Modal
            visible={visible}
            title={title}
            onRequestClose={onClose}
            height={height}
            scrollable={scrollable}
        >
            <View className="flex-1 bg-gray-950">
                {children}
            </View>
        </Modal>
    );
};
