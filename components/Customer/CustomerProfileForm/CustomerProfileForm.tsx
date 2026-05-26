import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography, FormInput, Button } from '../../theme';
import { useCustomerProfile } from './hooks/useCustomerProfile';
import { User } from 'lucide-react-native';

export interface CustomerProfileFormProps {
  onClose: () => void;
  isEditMode?: boolean;
}

export const CustomerProfileForm: React.FC<CustomerProfileFormProps> = ({
  onClose,
  isEditMode = false,
}) => {
  const { profile, loading, errors, handleChange, handleSave } =
    useCustomerProfile(onClose);

  const isFormValid = !!(
    profile.name.trim() &&
    profile.phone.trim() &&
    profile.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="px-5 pt-2 pb-8 bg-notch">
        {/* Centered Profile Header */}
        <View className="items-center mb-6 mt-2">
          <View className="w-12 h-12 bg-primary-500/10 border border-primary-500/25 rounded-full items-center justify-center mb-3">
            <User size={20} color="#3b82f6" />
          </View>
          <Typography
            variant="subheading"
            className="text-slate-900 text-center font-body-bold"
          >
            Personal Information
          </Typography>
          <Typography
            variant="body-sm"
            className="text-slate-600 text-center px-4 mt-1 leading-5 font-body-medium"
          >
            Update your account details to customize your experience and
            communications.
          </Typography>
        </View>

        {/* Input fields Card Container */}
        <View className="bg-white border border-slate-200/60 rounded-3xl p-5 mb-6 shadow-sm shadow-slate-100">
          <FormInput
            label="Full Name"
            placeholder="Enter your name"
            value={profile.name}
            onChangeText={v => handleChange('name', v)}
            error={errors.name}
          />

          <FormInput
            label="Contact Number"
            placeholder="e.g. +123456789"
            keyboardType="phone-pad"
            value={profile.phone}
            onChangeText={v => handleChange('phone', v)}
            error={errors.phone}
          />

          <FormInput
            label="Email Address"
            placeholder="e.g. name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={profile.email}
            onChangeText={v => handleChange('email', v)}
            error={errors.email}
          />

          <FormInput
            label="Location"
            placeholder="e.g. Seattle, WA"
            value={profile.location}
            onChangeText={v => handleChange('location', v)}
            error={errors.location}
          />
        </View>

        <Button
          onPress={handleSave}
          variant={isFormValid ? 'primary' : 'disabled'}
          loading={loading}
          className="w-full shadow-lg shadow-primary-500/20"
        >
          {isEditMode ? 'Update Details' : 'Save Details'}
        </Button>

        {isEditMode && (
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            className="w-full py-4 mt-3 rounded-2xl items-center justify-center bg-white border border-slate-200"
          >
            <Typography className="text-slate-600 font-body-semibold">
              Cancel
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
