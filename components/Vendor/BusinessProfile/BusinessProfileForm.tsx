import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Globe } from 'lucide-react-native';
import { Dropzone } from '../../shared/Dropzone';
import { useImageUpload } from '@/hooks/useImageUpload';
import { BusinessProfileFormData } from './hooks/useBusinessProfile';

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const RADIUS_OPTIONS = ['5km', '10km', '25km'] as const;

const EMPTY_FORM: BusinessProfileFormData = {
  businessName: '',
  gstNumber: '',
  address: '',
  contactNumber: '',
  imageUri: null,
  serviceRadius: '5km',
  operatingHours: 'Mon - Sat, 09:00 AM - 08:00 PM',
};

export interface BusinessProfileFormProps {
  visible: boolean;
  initialProfile?: BusinessProfileFormData | null;
  onClose: () => void;
  onSave: (data: BusinessProfileFormData) => void;
  loading?: boolean;
}

export const BusinessProfileForm: React.FC<BusinessProfileFormProps> = ({
  visible,
  initialProfile,
  onClose,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<BusinessProfileFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessProfileFormData, string>>>({});
  
  const handleChange = useCallback((field: keyof BusinessProfileFormData, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const { triggerUpload, uploading } = useImageUpload({
    fileName: 'storefront_logo.jpg',
    onSuccess: (url) => handleChange('imageUri', url),
  });

  const isEditMode = !!initialProfile?.id;

  useEffect(() => {
    if (!visible) return;
    setFormData(initialProfile ? { ...initialProfile } : { ...EMPTY_FORM });
    setErrors({});
  }, [initialProfile, visible]);

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof BusinessProfileFormData, string>> = {};

    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.address?.trim()) newErrors.address = 'Business address is required';

    if (formData.gstNumber && !GST_REGEX.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Invalid GST format (e.g. 22AAAAA0000A1Z5)';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = 'Enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <BottomSheetModal
      visible={visible}
      title={isEditMode ? 'Edit Business Profile' : 'Add Business Profile'}
      onClose={onClose}
      height="92%"
      scrollable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-2 pb-8">
          <Typography variant="subheading" className="text-white mb-4">
            Business Information
          </Typography>

          <Dropzone
            label="Business Storefront / Logo"
            onUpload={triggerUpload}
            onRemove={() => handleChange('imageUri', null)}
            imageUri={formData.imageUri}
          />

          <FormInput
            label="Legal Business Name"
            placeholder="e.g. Sparkle Detailing India"
            value={formData.businessName}
            onChangeText={v => handleChange('businessName', v)}
            error={errors.businessName}
            autoCapitalize="words"
          />

          <FormInput
            label="GST Identification Number"
            placeholder="22AAAAA0000A1Z5"
            autoCapitalize="characters"
            value={formData.gstNumber ?? undefined}
            onChangeText={v => handleChange('gstNumber', v.toUpperCase())}
            error={errors.gstNumber}
          />

          <FormInput
            label="Contact Number"
            placeholder="9876543210"
            keyboardType="phone-pad"
            prefix="+91"
            maxLength={10}
            value={formData.contactNumber ?? undefined}
            onChangeText={v => handleChange('contactNumber', v.replace(/[^0-9]/g, ''))}
            error={errors.contactNumber}
          />

          <FormInput
            label="Business Address"
            placeholder="Shop No, Building, Street, City, Pincode"
            multiline
            value={formData.address ?? undefined}
            onChangeText={v => handleChange('address', v)}
            error={errors.address}
            inputClassName="min-h-[120px]"
          />

          <Typography variant="subheading" className="text-white mb-3 mt-2">
            Service Area
          </Typography>

          <View className="flex-row gap-3 mb-4">
            {RADIUS_OPTIONS.map(val => {
              const selected = formData.serviceRadius === val;
              return (
                <TouchableOpacity
                  key={val}
                  onPress={() => handleChange('serviceRadius', val)}
                  className={`flex-1 py-3 rounded-2xl items-center border ${
                    selected
                      ? 'bg-primary-600/15 border-primary-500'
                      : 'bg-gray-900 border-gray-800'
                  }`}
                >
                  <Typography
                    className={selected ? 'text-primary-400 font-body-semibold' : 'text-gray-400'}
                  >
                    {val}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 h-40 mb-6">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800',
              }}
              className="w-full h-full opacity-40"
              resizeMode="cover"
            />
            <View className="absolute inset-0 items-center justify-center">
              <View className="bg-white/10 px-4 py-2 rounded-full flex-row items-center border border-white/20">
                <Globe size={14} color="white" />
                <Typography className="text-white font-body-semibold ml-2 text-xs">
                  LIVE PREVIEW
                </Typography>
              </View>
            </View>
          </View>

          {isEditMode ? (
            <Button variant="primary" onPress={handleSubmit} loading={loading || uploading}>
              Update Details →
            </Button>
          ) : (
            <Button variant="primary" onPress={handleSubmit} loading={loading || uploading}>
              Add Details →
            </Button>
          )}
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};
