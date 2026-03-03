import React from 'react';
import { Modal, View, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Typography } from '@/components/theme';

export interface BottomSheetModalProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
    visible, title, onClose, children,
}) => {
    const insets = useSafeAreaInsets();
    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
            <View
                className="flex-1 bg-gray-950"
                style={{ paddingTop: Platform.OS === 'android' ? insets.top : 0 }}>
                {/* Header */}
                <View className="flex-row items-center px-5 py-4 border-b border-gray-800">
                    <TouchableOpacity
                        onPress={onClose}
                        className="w-9 h-9 items-center justify-center"
                        activeOpacity={0.7}>
                        <ChevronLeft size={22} color="white" />
                    </TouchableOpacity>
                    <Typography className="text-white text-lg font-heading-bold flex-1 text-center mr-9">
                        {title}
                    </Typography>
                </View>
                {children}
            </View>
        </Modal>
    );
};
