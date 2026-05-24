import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Typography, Button, FormInput } from '@/components/theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Plus, X } from 'lucide-react-native';
import { useImageUpload } from '@/hooks/useImageUpload';
import { BusinessProfileFormData } from '../../hooks/useBusinessProfile';

export interface BusinessExtendedDetailsFormProps {
  visible: boolean;
  initialData: BusinessProfileFormData | null;
  onClose: () => void;
  onSave: (data: BusinessProfileFormData) => void;
  loading?: boolean;
}

export const BusinessExtendedDetailsForm: React.FC<BusinessExtendedDetailsFormProps> = ({
  visible,
  initialData,
  onClose,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<BusinessProfileFormData | null>(null);

  useEffect(() => {
    if (visible && initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData, visible]);

  const handleChange = useCallback((field: keyof BusinessProfileFormData, value: any) => {
    setFormData(prev => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  }, []);

  const { triggerUpload: handleUploadImage, uploading } = useImageUpload({
    fileName: 'business_gallery.jpg',
    onSuccess: (url) => {
      const currentImages = formData?.images ?? [];
      handleChange('images', [...currentImages, url]);
    }
  });

  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = formData?.images ?? [];
    handleChange('images', currentImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
    }
  };

  if (!formData) return null;

  const imagesList = formData.images ?? [];

  return (
    <BottomSheetModal
      visible={visible}
      title="Extended Business Details"
      onClose={onClose}
      height="85%"
      scrollable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="px-5 pt-2 pb-8">
          <Typography variant="subheading" className="text-white mb-2">
            Business Gallery (Multiple Images)
          </Typography>
          <Typography variant="body-sm" className="text-gray-500 mb-4">
            Upload premium photos of your tools, storefront, or past works to showcase to customers.
          </Typography>

          {/* Horizontally scrolling uploaded images + Add Button */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6">
            <View className="flex-row items-center gap-3">
              {imagesList.map((img, idx) => (
                <View key={idx} className="relative w-[90px] h-[90px] rounded-[20px] overflow-hidden border border-slate-800">
                  <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 items-center justify-center border border-white/20"
                    activeOpacity={0.7}
                  >
                    <X size={12} color="white" />
                  </TouchableOpacity>
                </View>
              ))}

              {uploading ? (
                <View className="w-[90px] h-[90px] rounded-[20px] border border-slate-800 bg-[#0f1623] items-center justify-center">
                  <ActivityIndicator size="small" color="#3b82f6" />
                  <Typography variant="body" className="text-primary-400 mt-2 font-body-semibold">
                    Uploading...
                  </Typography>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleUploadImage}
                  className="w-[90px] h-[90px] rounded-[20px] border border-blue-500 bg-blue-500/5 items-center justify-center"
                  style={s.dashedBorder}
                  activeOpacity={0.8}
                >
                  <Plus size={20} color="#3b82f6" />
                  <Typography variant="body" className="text-primary-400 mt-1 font-body-semibold">
                    Add Photo
                  </Typography>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          <Typography variant="subheading" className="text-white mb-4 mt-2">
            Elaborated Information
          </Typography>

          <FormInput
            label="Business Description / About Us"
            placeholder="Introduce your business, services, team details, and the core experience you deliver to your clients."
            value={formData.description ?? ''}
            onChangeText={v => handleChange('description', v)}
            multiline
            inputClassName="min-h-[140px] text-white"
          />

          <View className="mt-4">
            <Button
              variant="primary"
              onPress={handleSubmit}
              loading={loading || uploading}
            >
              Save Extended Details →
            </Button>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

const s = StyleSheet.create({
  dashedBorder: {
    borderStyle: 'dashed',
  },
});

