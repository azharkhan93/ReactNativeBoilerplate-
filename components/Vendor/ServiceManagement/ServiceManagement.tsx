import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import { uploadAssetToCloudinary } from '@/utils/uploadHelper';
import { launchImageLibrary } from 'react-native-image-picker';

export interface ServiceManagementProps {
    visible: boolean;
    initialService?: {
        id?: string;
        name: string;
        price: number;
        duration: string;
        location: string;
        description: string;
        images?: string[];
    } | null;
    onClose: () => void;
    onSave: (service: any) => void;
}

export const ServiceManagement: React.FC<ServiceManagementProps> = ({
    visible,
    initialService,
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
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    // Sync form data with initialService when editing
    useEffect(() => {
        if (initialService) {
            setFormData({
                name: initialService.name,
                price: initialService.price.toString(),
                duration: initialService.duration,
                location: initialService.location,
                description: initialService.description,
            });
            setImageUrl(initialService.images?.[0] || null);
        } else {
            setFormData({
                name: '',
                price: '',
                duration: '',
                location: '',
                description: '',
            });
            setImageUrl(null);
        }
    }, [initialService, visible]);

    const handleSave = () => {
        onSave({
            ...formData,
            images: imageUrl ? [imageUrl] : [],
        });
    };

    const handleImageUpload = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        });

        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            if (uri) {
                setUploading(true);
                try {
                    const res = await uploadAssetToCloudinary(
                        uri,
                        'service_image.jpg',
                        'image/jpeg'
                    );
                    setImageUrl(res.url);
                } catch (err) {
                    console.error('Service image upload failed:', err);
                } finally {
                    setUploading(false);
                }
            }
        }
    };

    const isEditMode = !!initialService;

    return (
        <BottomSheetModal
            visible={visible}
            title={isEditMode ? "Edit Car Wash Service" : "Add Car Wash Service"}
            onClose={onClose}
            height={"85%"}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="px-5 py-4 pb-12">
                    <View className="mb-6">
                        <Typography variant="body" className="text-gray-400 font-body-semibold mb-3 ml-1">
                            Service Photo
                        </Typography>
                        <View className="flex-row gap-4 items-center">
                            <TouchableOpacity
                                onPress={handleImageUpload}
                                disabled={uploading}
                                className="w-24 h-24 bg-gray-900 rounded-2xl items-center justify-center border-2 border-dashed border-gray-800"
                            >
                                {uploading ? (
                                    <ActivityIndicator size="small" color="#3b82f6" />
                                ) : (
                                    <Camera size={24} color="#4b5563" />
                                )}
                            </TouchableOpacity>
                            {imageUrl ? (
                                <View className="w-24 h-24 bg-gray-900 rounded-2xl items-center justify-center border border-gray-800 overflow-hidden">
                                    <ImageIcon size={24} color="#22c55e" />
                                </View>
                            ) : (
                                <View className="w-24 h-24 bg-gray-900/50 rounded-2xl items-center justify-center border border-gray-800">
                                    <Typography variant="body-sm" className="text-gray-600">No Photo</Typography>
                                </View>
                            )}
                        </View>
                    </View>

                    <FormInput
                        label="Service Name"
                        placeholder="e.g. Premium SUV Wash"
                        value={formData.name}
                        onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                    />

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <FormInput
                                style={{ textAlign: 'center' }}
                                label="Price (₹)"
                                placeholder="0.00"
                                keyboardType="numeric"
                                value={formData.price}
                                onChangeText={(text: string) => setFormData({ ...formData, price: text })}
                            />
                        </View>
                        <View className="flex-1">
                            <FormInput
                                style={{ textAlign: 'center' }}
                                label="Duration"
                                placeholder="30 mins"
                                value={formData.duration}
                                onChangeText={(text: string) => setFormData({ ...formData, duration: text })}
                            />
                        </View>
                    </View>

                    <FormInput
                        label="Service Area / Location"
                        placeholder="e.g. Greater Kailash, Delhi"
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
                        {isEditMode ? "Save Changes" : "Add Service"}
                    </Button>
                </View>
            </ScrollView>
        </BottomSheetModal>
    );
};
