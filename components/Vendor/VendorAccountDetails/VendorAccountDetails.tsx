import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Typography, Button } from '../../theme';
import { User, Phone, Mail, MapPin, Building, CreditCard } from 'lucide-react-native';

export const VendorAccountDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        businessName: 'Khan Car Wash Services',
        ownerName: 'Azhar Khan',
        email: 'azhar@example.com',
        phone: '+91 9876543210',
        address: '123 Business Hub, Downtown, Mumbai',
        bankAccount: '**** **** **** 1234',
        paymentMethods: ['Cash', 'Credit Card', 'UPI'],
        serviceArea: 'Mumbai South',
    });

    return (
        <View className="flex-1 py-4">
            <View className="gap-6 pb-6">
                {/* Business Info Section */}
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2 px-1 uppercase tracking-wider font-body-bold">Business Info</Typography>
                    <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
                        <View>
                            <Typography variant="body" className="text-primary-500 mb-1 font-body-bold">Business Name</Typography>
                            <View className="flex-row items-center border-b border-gray-50 pb-2">
                                <Building size={16} color="#94a3b8" />
                                <TextInput className="flex-1 text-gray-900 font-body ml-3" value={formData.businessName} />
                            </View>
                        </View>
                        <View className="mt-4">
                            <Typography variant="body" className="text-primary-500 mb-1 font-body-bold">Owner Name</Typography>
                            <View className="flex-row items-center border-b border-gray-50 pb-2">
                                <User size={16} color="#94a3b8" />
                                <TextInput className="flex-1 text-gray-900 font-body ml-3" value={formData.ownerName} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Contact Section */}
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2 px-1 uppercase tracking-wider font-body-bold">Contact & Location</Typography>
                    <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
                        <View className="flex-row gap-4 mb-4">
                            <View className="flex-1 border-b border-gray-50 pb-2">
                                <Typography variant="body" className="text-primary-500 mb-1 font-body-bold">Email</Typography>
                                <View className="flex-row items-center">
                                    <Mail size={16} color="#94a3b8" />
                                    <TextInput className="flex-1 text-gray-900 font-body ml-3 text-xs" value={formData.email} />
                                </View>
                            </View>
                            <View className="flex-1 border-b border-gray-50 pb-2">
                                <Typography variant="body" className="text-primary-500 mb-1 font-body-bold">Phone</Typography>
                                <View className="flex-row items-center">
                                    <Phone size={16} color="#94a3b8" />
                                    <TextInput className="flex-1 text-gray-900 font-body ml-3 text-xs" value={formData.phone} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Typography variant="body" className="text-primary-500 mb-1 font-body-bold">Service Location / Address</Typography>
                            <View className="flex-row items-start border-b border-gray-50 pb-2">
                                <MapPin size={16} color="#94a3b8" className="mt-1" />
                                <TextInput className="flex-1 text-gray-900 font-body ml-3" value={formData.address} multiline />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Payment & Payouts */}
                <View>
                    <Typography variant="body-sm" className="text-gray-400 mb-2 px-1 uppercase tracking-wider font-body-bold">Payment & Payouts</Typography>
                    <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                        <View className="mb-4">
                            <Typography variant="body" className="text-primary-500 mb-1 font-body-bold">Bank Account / UPI ID</Typography>
                            <View className="flex-row items-center border-b border-gray-50 pb-2">
                                <CreditCard size={16} color="#94a3b8" />
                                <TextInput className="flex-1 text-gray-900 font-body ml-3" value={formData.bankAccount} />
                            </View>
                        </View>
                        <View>
                            <Typography variant="body" className="text-primary-500 mb-2 font-body-bold">Accepted Methods</Typography>
                            <View className="flex-row flex-wrap gap-2">
                                {formData.paymentMethods.map(method => (
                                    <View key={method} className="bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                                        <Typography variant="body" className="text-primary-600 font-body-medium">{method}</Typography>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <Button className="mt-4 rounded-3xl" variant="primary">Update Professional Profile</Button>
            </View>
        </View>
    );
};
