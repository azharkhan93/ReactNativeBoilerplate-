import { View } from 'react-native';
import { Phone } from 'lucide-react-native';
import { Typography, Button, FormInput } from '@/components/theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import React from 'react';

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
    <BottomSheetModal
        visible={visible}
        title="Complete Your Profile"
        onClose={onConfirm}
        height={450}
        scrollable={false}
    >
        <View className="p-6">
            <View className="w-16 h-16 bg-primary-500/10 rounded-full items-center justify-center mb-6 self-center">
                <Phone size={32} color="#3b82f6" />
            </View>

            <FormInput
                label="Enter Phone Number"
                placeholder="555-0123"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                containerClassName="mb-8"
            />

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
