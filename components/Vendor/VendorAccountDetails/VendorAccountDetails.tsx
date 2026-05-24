import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { User, Phone, Mail, MapPin, Building, CreditCard } from 'lucide-react-native';

export const VendorAccountDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        businessName: 'Khan Car Wash Services',
        ownerName: 'Azhar Khan',
        email: 'azhar@example.com',
        phone: '9876543210',
        address: '123 Business Hub, Downtown, Mumbai',
        bankAccount: '**** **** **** 1234',
        paymentMethods: ['Cash', 'Credit Card', 'UPI'],
        serviceArea: 'Mumbai South',
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <ScrollView 
            className="flex-1 bg-gray-950" 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <View className="gap-6 pb-6 px-4 pt-4">
                
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2.5 px-1 uppercase tracking-wider font-body-bold">Business Info</Typography>
                    <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 shadow-2xl">
                        <FormInput
                            label="Business Name"
                            icon={<Building size={16} color="#94a3b8" />}
                            value={formData.businessName}
                            onChangeText={v => handleChange('businessName', v)}
                        />
                        <FormInput
                            label="Owner Name"
                            icon={<User size={16} color="#94a3b8" />}
                            value={formData.ownerName}
                            onChangeText={v => handleChange('ownerName', v)}
                            containerClassName="mb-0"
                        />
                    </View>
                </View>

                {/* Contact Section */}
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2.5 px-1 uppercase tracking-wider font-body-bold">Contact & Location</Typography>
                    <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 shadow-2xl">
                        <FormInput
                            label="Email"
                            icon={<Mail size={16} color="#94a3b8" />}
                            value={formData.email}
                            onChangeText={v => handleChange('email', v)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <FormInput
                            label="Phone"
                            icon={<Phone size={16} color="#94a3b8" />}
                            value={formData.phone}
                            onChangeText={v => handleChange('phone', v)}
                            keyboardType="phone-pad"
                        />
                        <FormInput
                            label="Service Location / Address"
                            icon={<MapPin size={16} color="#94a3b8" />}
                            value={formData.address}
                            onChangeText={v => handleChange('address', v)}
                            multiline
                            containerClassName="mb-0"
                        />
                    </View>
                </View>

                {/* Payment & Payouts */}
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2.5 px-1 uppercase tracking-wider font-body-bold">Payment & Payouts</Typography>
                    <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 shadow-2xl">
                        <FormInput
                            label="Bank Account / UPI ID"
                            icon={<CreditCard size={16} color="#94a3b8" />}
                            value={formData.bankAccount}
                            onChangeText={v => handleChange('bankAccount', v)}
                        />
                        <View className="mt-2">
                            <Typography variant="body" className="text-gray-300 mb-2 font-body-bold">Accepted Methods</Typography>
                            <View className="flex-row flex-wrap gap-2">
                                {formData.paymentMethods.map(method => (
                                    <View key={method} className="bg-primary-500/10 px-3.5 py-1.5 rounded-full border border-primary-500/25">
                                        <Typography variant="body-sm" className="text-primary-400 font-body-semibold">{method}</Typography>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <Button className="mt-4 rounded-2xl shadow-lg shadow-primary-500/20" variant="primary">
                    Update Professional Profile
                </Button>
            </View>
        </ScrollView>
    );
};
