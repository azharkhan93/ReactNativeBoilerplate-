import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, FormInput } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { ServicePhoto, LocationSupport, PricingMatrix } from './components';
import { useServiceForm, ServiceData } from './hooks';

export interface ServiceManagementProps {
    visible: boolean;
    initialService?: ServiceData | null;
    onClose: () => void;
    onSave: (service: any) => void;
}

export const ServiceManagement: React.FC<ServiceManagementProps> = ({
    visible,
    initialService,
    onClose,
    onSave,
}) => {
    const {
        formData,
        categoryPrices,
        imageUrl,
        uploading,
        handleImageUpload,
        handleNameChange,
        handleDurationChange,
        handleLocationChange,
        handleDescriptionChange,
        handleToggleHome,
        handleToggleCenter,
        handlePriceChange,
        handleSave,
        bottomSheetTitle,
        buttonLabel,
        
    } = useServiceForm({ initialService, visible, onSave });

    return (
        <BottomSheetModal
            visible={visible}
            title={bottomSheetTitle}
            onClose={onClose}
            height={"85%"}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="px-5 py-4 pb-12">
                    <ServicePhoto
                        imageUrl={imageUrl}
                        uploading={uploading}
                        onTriggerUpload={handleImageUpload}
                    />

                    <FormInput
                        label="Service Name"
                        placeholder="e.g. Eco Foam Wash"
                        value={formData.name}
                        onChangeText={handleNameChange}
                    />

                    <LocationSupport
                        availableAtHome={formData.availableAtHome}
                        availableAtCenter={formData.availableAtCenter}
                        onToggleHome={handleToggleHome}
                        onToggleCenter={handleToggleCenter}
                    />

                    <PricingMatrix
                        hatchbackPrice={categoryPrices.hatchback}
                        sedanPrice={categoryPrices.sedan}
                        suvPrice={categoryPrices.suv}
                        luxuryPrice={categoryPrices.luxury}
                        onChangePrice={handlePriceChange}
                    />

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <FormInput
                                label="Duration"
                                placeholder="e.g. 45 mins"
                                value={formData.duration}
                                onChangeText={handleDurationChange}
                            />
                        </View>
                        <View className="flex-1">
                            <FormInput
                                label="Service Area / Location"
                                placeholder="e.g. Greater Kailash"
                                value={formData.location}
                                onChangeText={handleLocationChange}
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
                        onChangeText={handleDescriptionChange}
                    />

                    <Button
                        onPress={handleSave}
                        variant= "primary"
                    >
                        {buttonLabel}
                    </Button>
                </View>
            </ScrollView>
        </BottomSheetModal>
    );
};
