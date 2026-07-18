import React from 'react';
import { ScrollView, View } from 'react-native';
import { Typography, FormInput, Button } from '@/components/theme';
import { User, AlertCircle } from 'lucide-react-native';

interface ProfileSetupStepProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  onChangeName: (text: string) => void;
  onChangeEmail: (text: string) => void;
  onChangePhone: (text: string) => void;
  onChangeLocation: (text: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string;
}

export const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({
  name,
  email,
  phone,
  location,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangeLocation,
  onSubmit,
  loading,
  error,
}) => {
  const isFormValid = name.trim() !== '' && email.trim() !== '';

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="px-5 pb-8">
      <View className="items-center mb-6 mt-2">
        <View className="w-12 h-12 bg-primary-500/10 border border-primary-500/25 rounded-full items-center justify-center mb-3">
          <User size={20} color="#3b82f6" />
        </View>
        <Typography variant="subheading" className="text-slate-900 text-center font-body-bold">
          Complete Personal Info
        </Typography>
        <Typography variant="body-sm" className="text-slate-600 text-center px-4 mt-1 leading-5 font-body-medium">
          We need a Name and Email to process secure invoices via Razorpay.
        </Typography>
      </View>

      {error ? (
        <View className="bg-rose-50 border border-rose-100 p-3.5 rounded-2xl flex-row items-center space-x-2.5 mb-5">
          <AlertCircle size={16} color="#ef4444" />
          <Typography variant="body-sm" className="text-rose-600 font-body-semibold flex-1">
            {error}
          </Typography>
        </View>
      ) : null}

      <View className="bg-white border border-slate-200/60 rounded-3xl p-5 mb-6 shadow-sm shadow-slate-100">
        <FormInput label="Full Name *" placeholder="e.g. John Doe" value={name} onChangeText={onChangeName} />
        <FormInput
          label="Email Address *"
          placeholder="e.g. johndoe@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={onChangeEmail}
        />
        <FormInput label="Contact Number" placeholder="+919999999999" keyboardType="phone-pad" value={phone} onChangeText={onChangePhone} />
        <FormInput label="City" placeholder="e.g. Mumbai" value={location} onChangeText={onChangeLocation} />
      </View>

      <Button
        onPress={onSubmit}
        variant={isFormValid ? 'primary' : 'disabled'}
        loading={loading}
        className="w-full shadow-lg shadow-primary-500/20"
      >
        Save & Continue
      </Button>
    </ScrollView>
  );
};
