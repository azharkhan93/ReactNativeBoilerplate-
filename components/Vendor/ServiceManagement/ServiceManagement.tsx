import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Camera } from 'lucide-react-native';
import { useImageUpload } from '@/hooks/useImageUpload';

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
        categoryId?: string;
        availableAtHome?: boolean;
        availableAtCenter?: boolean;
        pricings?: Array<{ categoryId: string; price: number }>;
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
        price: '299',
        duration: '',
        location: '',
        description: '',
        availableAtHome: true,
        availableAtCenter: true,
    });

    const [categoryPrices, setCategoryPrices] = useState({
        hatchback: '',
        sedan: '',
        suv: '',
        luxury: '',
    });

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { triggerUpload: handleImageUpload, uploading } = useImageUpload({
        fileName: 'service_image.jpg',
        onSuccess: setImageUrl,
    });

    // Sync form data with initialService when editing
    useEffect(() => {
        if (initialService) {
            setFormData({
                name: initialService.name,
                price: initialService.price.toString(),
                duration: initialService.duration,
                location: initialService.location,
                description: initialService.description,
                availableAtHome: initialService.availableAtHome ?? true,
                availableAtCenter: initialService.availableAtCenter ?? true,
            });
            setImageUrl(initialService.images?.[0] || null);

            // Populate category pricing inputs from initialService
            const pricings = initialService.pricings || [];
            const prices = { hatchback: '', sedan: '', suv: '', luxury: '' };
            pricings.forEach((p: any) => {
                if (p.categoryId === 'category-hatchback' || p.categoryId === 'hatchback') prices.hatchback = p.price.toString();
                if (p.categoryId === 'category-sedan' || p.categoryId === 'sedan') prices.sedan = p.price.toString();
                if (p.categoryId === 'category-suv' || p.categoryId === 'suv') prices.suv = p.price.toString();
                if (p.categoryId === 'category-luxury' || p.categoryId === 'luxury') prices.luxury = p.price.toString();
            });
            setCategoryPrices(prices);
        } else {
            setFormData({
                name: '',
                price: '299',
                duration: '',
                location: '',
                description: '',
                availableAtHome: true,
                availableAtCenter: true,
            });
            setImageUrl(null);
            setCategoryPrices({ hatchback: '', sedan: '', suv: '', luxury: '' });
        }
    }, [initialService, visible]);

    const handleSave = () => {
        const pricings = [
            { categoryId: 'category-hatchback', price: parseFloat(categoryPrices.hatchback) || 0 },
            { categoryId: 'category-sedan', price: parseFloat(categoryPrices.sedan) || 0 },
            { categoryId: 'category-suv', price: parseFloat(categoryPrices.suv) || 0 },
            { categoryId: 'category-luxury', price: parseFloat(categoryPrices.luxury) || 0 },
        ].filter((p) => p.price > 0);

        onSave({
            ...formData,
            price: parseFloat(formData.price) || parseFloat(categoryPrices.hatchback) || 299,
            pricings,
            images: imageUrl ? [imageUrl] : [],
        });
    };

    const isEditMode = !!initialService;
    const isSaveEnabled = !!(
        formData.name &&
        formData.duration &&
        (categoryPrices.hatchback || categoryPrices.sedan || categoryPrices.suv || categoryPrices.luxury)
    );

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
                                <View className="w-24 h-24 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                                    <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
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
                        placeholder="e.g. Eco Foam Wash"
                        value={formData.name}
                        onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                    />

                    <View className="mb-6">
                        <Typography variant="body" className="text-gray-400 font-body-semibold mb-3 ml-1">
                            Service Location Support
                        </Typography>
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setFormData({ ...formData, availableAtHome: !formData.availableAtHome })}
                                className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
                                    formData.availableAtHome
                                        ? 'bg-primary-500/10 border-primary-500'
                                        : 'bg-gray-900 border-gray-800'
                                }`}
                            >
                                <Typography
                                    className={`font-body-bold text-sm text-center ${
                                        formData.availableAtHome ? 'text-primary-400' : 'text-gray-400'
                                    }`}
                                >
                                    Home / Doorstep
                                </Typography>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setFormData({ ...formData, availableAtCenter: !formData.availableAtCenter })}
                                className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
                                    formData.availableAtCenter
                                        ? 'bg-primary-500/10 border-primary-500'
                                        : 'bg-gray-900 border-gray-800'
                                }`}
                            >
                                <Typography
                                    className={`font-body-bold text-sm text-center ${
                                        formData.availableAtCenter ? 'text-primary-400' : 'text-gray-400'
                                    }`}
                                >
                                    Center / Workshop
                                </Typography>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mb-6">
                        <Typography variant="body" className="text-gray-400 font-body-semibold mb-1 ml-1">
                            Vehicle Category Pricing Matrix
                        </Typography>
                        <Typography variant="body-sm" className="text-gray-500 mb-4 ml-1">
                            Set specific pricing for each car size (leave blank if unsupported)
                        </Typography>
                        <View className="flex-row gap-4 mb-4">
                            <View className="flex-1">
                                <FormInput
                                    label="Hatchback Price (₹)"
                                    placeholder="e.g. 299"
                                    keyboardType="numeric"
                                    value={categoryPrices.hatchback}
                                    onChangeText={(text: string) => setCategoryPrices({ ...categoryPrices, hatchback: text })}
                                />
                            </View>
                            <View className="flex-1">
                                <FormInput
                                    label="Sedan Price (₹)"
                                    placeholder="e.g. 399"
                                    keyboardType="numeric"
                                    value={categoryPrices.sedan}
                                    onChangeText={(text: string) => setCategoryPrices({ ...categoryPrices, sedan: text })}
                                />
                            </View>
                        </View>
                        <View className="flex-row gap-4">
                            <View className="flex-1">
                                <FormInput
                                    label="SUV Price (₹)"
                                    placeholder="e.g. 499"
                                    keyboardType="numeric"
                                    value={categoryPrices.suv}
                                    onChangeText={(text: string) => setCategoryPrices({ ...categoryPrices, suv: text })}
                                />
                            </View>
                            <View className="flex-1">
                                <FormInput
                                    label="Luxury Price (₹)"
                                    placeholder="e.g. 699"
                                    keyboardType="numeric"
                                    value={categoryPrices.luxury}
                                    onChangeText={(text: string) => setCategoryPrices({ ...categoryPrices, luxury: text })}
                                />
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <FormInput
                                label="Duration"
                                placeholder="e.g. 45 mins"
                                value={formData.duration}
                                onChangeText={(text: string) => setFormData({ ...formData, duration: text })}
                            />
                        </View>
                        <View className="flex-1">
                            <FormInput
                                label="Service Area / Location"
                                placeholder="e.g. Greater Kailash"
                                value={formData.location}
                                onChangeText={(text: string) => setFormData({ ...formData, location: text })}
                            />
                        </View>
                    </View>

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
                        variant={isSaveEnabled ? 'primary' : 'disabled'}
                    >
                        {isEditMode ? "Save Changes" : "Add Service"}
                    </Button>
                </View>
            </ScrollView>
        </BottomSheetModal>
    );
};
