import React from 'react';
import { View, TextInput } from 'react-native';
import { Phone } from 'lucide-react-native';
import { Typography, Button } from '@/components/theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';

interface PhoneVerificationModalProps {
    visible: boolean;
    value: string;
    onChange: (v: string) => void;
    onConfirm: () => void;
}

export const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
    visible,
    value,
    onChange,
    onConfirm,
}) => (
    <BottomSheetModal visible={visible} title="Complete Your Profile" onClose={onConfirm}>
        <View className="p-6">
            <View className="w-16 h-16 bg-primary-500/10 rounded-full items-center justify-center mb-6 self-center">
                <Phone size={32} color="#3b82f6" />
            </View>

            <Typography className="text-white font-heading-semibold mb-2 text-center">
                Enter Phone Number
            </Typography>
            <Typography variant="body-sm" className="text-gray-500 mb-6 text-center">
                We need this to coordinate your car wash service and provide updates.
            </Typography>

            <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl px-4 py-4 mb-8">
                <Typography className="text-gray-400 mr-2 font-body-semibold">+1</Typography>
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="555-0123"
                    keyboardType="phone-pad"
                    className="flex-1 text-white font-body"
                    placeholderTextColor="#4b5563"
                />
            </View>

            <Button
                onPress={onConfirm}
                variant={value.length > 5 ? 'primary' : 'disabled'}
                className="w-full"
            >
                Confirm
            </Button>
        </View>
    </BottomSheetModal>
);
