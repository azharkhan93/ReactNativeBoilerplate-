/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { ShieldCheck, Lock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBankAccountDetails, } from './hooks/useBankAccountDetails';

export const BankAccountDetails: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { 
        formData, 
        errors, 
        isFormValid, 
        handleInputChange, 
        handleSubmit 
    } = useBankAccountDetails();

    return (
        <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: insets.bottom + 40,
                paddingHorizontal: 20
            }}
        >
            <View className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-4 mt-4 mb-6 flex-row items-center">
                <ShieldCheck size={20} color="#3b82f6" />
                <Typography variant="body" className="ml-3 flex-1  leading-5 text-gray-400">
                    Your banking data is encrypted and processed via secure RBI-compliant gateways.
                </Typography>
            </View>

            <View>
                <FormInput
                    label="Account Holder Name"
                    name="accountHolder"
                    placeholder="As per bank records"
                    value={formData.accountHolder}
                    onChangeText={handleInputChange}
                    error={errors.accountHolder}
                />

                <FormInput
                    label="Bank Name"
                    name="bankName"
                    placeholder="e.g. HDFC Bank, ICICI, SBI"
                    value={formData.bankName}
                    onChangeText={handleInputChange}
                    error={errors.bankName}
                />

                <FormInput
                    label="IFSC Code"
                    name="ifscCode"
                    placeholder="11 characters (e.g. SBIN0001234)"
                    autoCapitalize="characters"
                    maxLength={11}
                    value={formData.ifscCode}
                    onChangeText={handleInputChange}
                    error={errors.ifscCode}
                />

                <FormInput
                    label="Account Number"
                    name="accountNumber"
                    placeholder="Enter your account number"
                    keyboardType="numeric"
                    secureTextEntry
                    value={formData.accountNumber}
                    onChangeText={handleInputChange}
                    error={errors.accountNumber}
                />
            </View>

            <View className="mt-8 bg-gray-900/50 rounded-2xl p-5 border border-gray-800">
                <View className="flex-row items-center mb-3">
                    <Lock size={16} color="#94a3b8" />
                    <Typography variant="body" className=" ml-2 font-body-semibold">
                        Verification Process
                    </Typography>
                </View>
                <Typography variant="body" className=" leading-6 text-gray-400">
                    After saving, we will initiate two small test deposits (under ₹2.00) to your account within 1-2 business days. You will need to verify these amounts to activate your payouts.
                </Typography>
            </View>

            <Button
                onPress={handleSubmit}
                variant={isFormValid ? 'primary' : 'disabled'}
                className="mt-8"
            >
                Save & Finish Setup
            </Button>
        </ScrollView>
    );
};
