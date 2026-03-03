import React, { useState } from 'react';
import { View, TextInput, ScrollView, Platform } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { ShieldCheck, Lock } from 'lucide-react-native';
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
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: insets.bottom + 40,
                paddingHorizontal: 20
            }}
        >

            <View className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-4 mt-4 mb-6 flex-row items-center">
                <ShieldCheck size={20} color="#3b82f6" />
                <Typography variant="body" className="ml-3 flex-1  leading-5">
                    Your data is encrypted and processed via secure financial gateways.
                </Typography>
            </View>


            <View>
                <FormInput
                    label="Account Holder Name"
                    placeholder="Full legal name"
                    value={formData.accountHolder}
                    onChangeText={(text) => setFormData({ ...formData, accountHolder: text })}
                />

                <FormInput
                    label="Bank Name"
                    placeholder="e.g. Chase, Wells Fargo"
                    value={formData.bankName}
                    onChangeText={(text) => setFormData({ ...formData, bankName: text })}
                />

                <FormInput
                    label="Routing Number"
                    placeholder="9 digits"
                    keyboardType="numeric"
                    maxLength={9}
                    value={formData.routingNumber}
                    onChangeText={(text) => setFormData({ ...formData, routingNumber: text })}
                />

                <FormInput
                    label="Account Number"
                    placeholder="Standard account #"
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
                    <Typography variant="body" className=" ml-2">
                        Verification Process
                    </Typography>
                </View>
                <Typography variant="body" className=" leading-6">
                    After saving, we will initiate two small test deposits (under $1.00) to your account within 1-2 business days. You will need to verify these amounts to activate payouts.
                </Typography>
            </View>


            <Button
                onPress={() => console.log('Save bank details:', formData)}
                variant={isFormValid ? 'primary' : 'disabled'}
                className="mt-8"
            >
                Save & Finish Setup
            </Button>


            {/* <View className="flex-row items-center justify-center mt-6 opacity-60">
                <ShieldCheck size={14} color="#22c55e" />
                <Typography variant="body" className=" ml-2 uppercase tracking-widest">
                    PCI-DSS Compliant
                </Typography>
            </View> */}
        </ScrollView>
    );
};
