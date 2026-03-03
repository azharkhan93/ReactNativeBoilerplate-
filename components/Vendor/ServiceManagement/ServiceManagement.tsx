import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Camera } from 'lucide-react-native';

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="px-5 py-4 pb-12">

                    <View className="mb-6">
                        <Typography variant="body" className="text-gray-400 font-body-semibold mb-3 ml-1">Service Photos</Typography>
                        <View className="flex-row gap-4">
                            <TouchableOpacity
                                onPress={() => console.log('Upload pressed')}
                                className="w-24 h-24 bg-gray-900 rounded-2xl items-center justify-center border-2 border-dashed border-gray-800"
                            >
                                <Camera size={24} color="#4b5563" />
                            </TouchableOpacity>
                            <View className="w-24 h-24 bg-gray-900/50 rounded-2xl items-center justify-center border border-gray-800">
                                <Typography variant="body" >Mock Photo</Typography>
                            </View>
                        </View>
                    </View>

                    <FormInput
                        label="Service Name"
                        placeholder="e.g. Premium SUV Wash"
                        value={formData.name}
                        onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                    />

                    <View className="flex-row gap-4">
                        <FormInput
                            label="Price ($)"
                            placeholder="0.00"
                            keyboardType="numeric"
                           
                            value={formData.price}
                            onChangeText={(text: string) => setFormData({ ...formData, price: text })}
                        />
                        <FormInput
                            label="Duration"
                            placeholder="30 mins"
                           
                            value={formData.duration}
                            onChangeText={(text: string) => setFormData({ ...formData, duration: text })}
                        />
                    </View>

                    <FormInput
                        label="Service Area / Location"
                        placeholder="City, Neighborhood"
                        value={formData.location}
                        onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                    />

                    <FormInput
                        label="Description"
                        placeholder="Describe what's included in this car wash..."
                        multiline
                        textAlignVertical="top"
                        inputClassName="min-h-[120px]"
                        value={formData.description}
                        onChangeText={(text: string) => setFormData({ ...formData, description: text })}
                    />

                    <Button
                        onPress={handleSave}
                        variant={formData.name && formData.price ? 'primary' : 'disabled'}
                    >
                        Add Service
                    </Button>
                </View>
            </ScrollView>
        </BottomSheetModal>
    );
};
