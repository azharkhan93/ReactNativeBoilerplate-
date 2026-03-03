import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Typography, Button } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Clock, DollarSign, MapPin, Camera } from 'lucide-react-native';

export interface ServiceManagementProps {
    visible: boolean;
    onClose: () => void;
    onSave: (service: any) => void;
}

export const ServiceManagement: React.FC<ServiceManagementProps> = ({
    visible,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        duration: '',
        location: '',
        description: '',
    });

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <BottomSheetModal
            visible={visible}
            title="Add Car Wash Service"
            onClose={onClose}
        >
            <ScrollView className="bg-gray-950" showsVerticalScrollIndicator={false}>
                <View className="px-6 py-4 gap-6 pb-12">

                    <View>
                        <Typography className="text-gray-400 font-body-semibold mb-3 ml-1">Service Photos</Typography>
                        <View className="flex-row gap-4">
                            <TouchableOpacity
                                onPress={() => console.log('Upload pressed')}
                                className="w-24 h-24 bg-gray-900 rounded-2xl items-center justify-center border-2 border-dashed border-gray-800"
                            >
                                <Camera size={24} color="#4b5563" />
                            </TouchableOpacity>
                            <View className="w-24 h-24 bg-gray-900/50 rounded-2xl items-center justify-center border border-gray-800">
                                <Typography variant="body-sm" className="text-gray-600">Mock Photo</Typography>
                            </View>
                        </View>
                    </View>

                    {/* Form Fields */}
                    <View>
                        <Typography className="text-gray-400 font-body-semibold mb-2 ml-1">Service Name</Typography>
                        <TextInput
                            className="bg-gray-900 border border-gray-800 rounded-2xl px-4 py-4 text-white font-body"
                            placeholder="e.g. Premium SUV Wash"
                            placeholderTextColor="#4b5563"
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                        />
                    </View>

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <Typography className="text-gray-400 font-body-semibold mb-2 ml-1">Price ($)</Typography>
                            <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl px-4 py-4">
                                <DollarSign size={16} color="#4b5563" />
                                <TextInput
                                    className="flex-1 text-white font-body ml-2"
                                    placeholder="0.00"
                                    placeholderTextColor="#4b5563"
                                    keyboardType="numeric"
                                    value={formData.price}
                                    onChangeText={(text) => setFormData({ ...formData, price: text })}
                                />
                            </View>
                        </View>
                        <View className="flex-1">
                            <Typography className="text-gray-400 font-body-semibold mb-2 ml-1">Duration</Typography>
                            <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl px-4 py-4">
                                <Clock size={16} color="#4b5563" />
                                <TextInput
                                    className="flex-1 text-white font-body ml-2"
                                    placeholder="30 mins"
                                    placeholderTextColor="#4b5563"
                                    value={formData.duration}
                                    onChangeText={(text) => setFormData({ ...formData, duration: text })}
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <Typography className="text-gray-400 font-body-semibold mb-2 ml-1">Service Area / Location</Typography>
                        <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl px-4 py-4">
                            <MapPin size={16} color="#4b5563" />
                            <TextInput
                                className="flex-1 text-white font-body ml-2"
                                placeholder="City, Neighborhood"
                                placeholderTextColor="#4b5563"
                                value={formData.location}
                                onChangeText={(text) => setFormData({ ...formData, location: text })}
                            />
                        </View>
                    </View>

                    <View>
                        <Typography className="text-gray-400 font-body-semibold mb-2 ml-1">Description</Typography>
                        <TextInput
                            className="bg-gray-900 border border-gray-800 rounded-2xl px-4 py-4 text-white font-body min-h-[120px]"
                            placeholder="Describe what's included in this car wash..."
                            placeholderTextColor="#4b5563"
                            multiline
                            textAlignVertical="top"
                            value={formData.description}
                            onChangeText={(text) => setFormData({ ...formData, description: text })}
                        />
                    </View>

                    <Button
                        onPress={handleSave}
                        variant={formData.name && formData.price ? 'primary' : 'disabled'}
                        className="py-4 rounded-2xl"
                    >
                        Add Service
                    </Button>
                </View>
            </ScrollView>
        </BottomSheetModal>
    );
};
