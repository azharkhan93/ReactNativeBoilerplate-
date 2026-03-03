import React, { useState } from 'react';
import { View, TextInput, ScrollView, Platform } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { ShieldCheck, Lock } from 'lucide-react-native';
import { BANK_ACCOUNT_CONSTANTS } from './constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BankAccountDetails: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState({
        accountHolder: '',
        bankName: '',
        routingNumber: '',
        accountNumber: '',
    });

    const isFormValid = formData.accountHolder && formData.bankName &&
        formData.routingNumber.length === 9 && formData.accountNumber;

    return (
        <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
            {/* Security Badge */}
            <View className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-4 mt-4 mb-6 flex-row items-center">
                <ShieldCheck size={20} color="#3b82f6" />
                <Typography variant="body-sm" className="text-blue-400 ml-3 flex-1 font-body-medium leading-5">
                    {BANK_ACCOUNT_CONSTANTS.SECURITY_MESSAGE}
                </Typography>
            </View>

            {/* Form Fields */}
            <View className="gap-6">
                <FormInput
                    label={BANK_ACCOUNT_CONSTANTS.LABELS.ACCOUNT_HOLDER}
                    placeholder={BANK_ACCOUNT_CONSTANTS.PLACEHOLDERS.ACCOUNT_HOLDER}
                    value={formData.accountHolder}
                    onChangeText={(text) => setFormData({ ...formData, accountHolder: text })}
                />

                <FormInput
                    label={BANK_ACCOUNT_CONSTANTS.LABELS.BANK_NAME}
                    placeholder={BANK_ACCOUNT_CONSTANTS.PLACEHOLDERS.BANK_NAME}
                    value={formData.bankName}
                    onChangeText={(text) => setFormData({ ...formData, bankName: text })}
                />

                <FormInput
                    label={BANK_ACCOUNT_CONSTANTS.LABELS.ROUTING_NUMBER}
                    placeholder={BANK_ACCOUNT_CONSTANTS.PLACEHOLDERS.ROUTING_NUMBER}
                    keyboardType="numeric"
                    maxLength={9}
                    value={formData.routingNumber}
                    onChangeText={(text) => setFormData({ ...formData, routingNumber: text })}
                />

                <FormInput
                    label={BANK_ACCOUNT_CONSTANTS.LABELS.ACCOUNT_NUMBER}
                    placeholder={BANK_ACCOUNT_CONSTANTS.PLACEHOLDERS.ACCOUNT_NUMBER}
                    keyboardType="numeric"
                    secureTextEntry
                    value={formData.accountNumber}
                    onChangeText={(text) => setFormData({ ...formData, accountNumber: text })}
                />
            </View>

            {/* Verification Process Note */}
            <View className="mt-8 bg-gray-900/50 rounded-2xl p-5 border border-gray-800">
                <View className="flex-row items-center mb-3">
                    <Lock size={16} color="#94a3b8" />
                    <Typography className="text-gray-300 font-heading-semibold ml-2">
                        {BANK_ACCOUNT_CONSTANTS.VERIFICATION_TITLE}
                    </Typography>
                </View>
                <Typography variant="body-sm" className="text-gray-500 leading-6 font-body">
                    {BANK_ACCOUNT_CONSTANTS.VERIFICATION_NOTE}
                </Typography>
            </View>

           
            <Button
                onPress={() => console.log('Save bank details:', formData)}
                variant={isFormValid ? 'primary' : 'disabled'}
                className="mt-8 rounded-2xl py-4"
            >
                {BANK_ACCOUNT_CONSTANTS.LABELS.SAVE_BUTTON}
            </Button>

           
            <View className="flex-row items-center justify-center mt-6 opacity-60">
                <ShieldCheck size={14} color="#22c55e" />
                <Typography variant="body-sm" className="text-gray-500 ml-2 uppercase tracking-widest font-body-bold text-[10px]">
                    {BANK_ACCOUNT_CONSTANTS.COMPLIANCE_TEXT}
                </Typography>
            </View>
        </ScrollView>
    );
};
