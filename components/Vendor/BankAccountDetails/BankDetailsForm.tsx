import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Typography, Button, FormInput } from '../../theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { Lock } from 'lucide-react-native';
import { BankFormData } from './hooks/useBankAccountDetails';

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export interface BankDetailsFormProps {
  visible: boolean;
  initialProfile?: BankFormData | null;
  onClose: () => void;
  onSave: (data: BankFormData) => void;
  loading?: boolean;
}

const EMPTY_FORM: BankFormData = {
  accountHolder: '',
  bankName: '',
  ifscCode: '',
  accountNumber: '',
};

export const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  visible,
  initialProfile,
  onClose,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<BankFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<BankFormData, 'id'>, string>>>({});

  const isEditMode = !!initialProfile?.id;

  useEffect(() => {
    if (!visible) return;
    setFormData(initialProfile ? { ...initialProfile } : { ...EMPTY_FORM });
    setErrors({});
  }, [initialProfile, visible]);

  const handleChange = useCallback((field: keyof Omit<BankFormData, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof Omit<BankFormData, 'id'>, string>> = {};

    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder = 'Account holder name is required';
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!IFSC_REGEX.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC format (e.g. SBIN0001234)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
  };

  const isFormValid = !!(
    formData.accountHolder.trim() &&
    formData.bankName.trim() &&
    IFSC_REGEX.test(formData.ifscCode) &&
    formData.accountNumber.trim()
  );

  return (
    <BottomSheetModal
      visible={visible}
      title={isEditMode ? 'Modify Bank Account' : 'Setup Bank Account'}
      onClose={onClose}
      height="88%"
      scrollable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="px-5 pt-2 pb-8">
          {/* Centered Secure Header */}
          <View className="items-center mb-6 mt-2">
            <View className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-full items-center justify-center mb-3">
              <Lock size={20} color="#3b82f6" />
            </View>
            <Typography variant="subheading" className="text-white text-center font-body-bold">
              {isEditMode ? 'Edit Payout Credentials' : 'Secure Payout Configuration'}
            </Typography>
            <Typography variant="body-sm" className="text-gray-400 text-center px-4 mt-1 leading-5">
              Banking data is protected with end-to-end industry-standard encryption protocols.
            </Typography>
          </View>

          {/* Form Input Group Panel */}
          <View className="bg-gray-900/40 border border-gray-800 rounded-3xl p-5 mb-6">
            <FormInput
              label="Account Holder Name"
              placeholder="As per bank records"
              value={formData.accountHolder}
              onChangeText={v => handleChange('accountHolder', v)}
              error={errors.accountHolder}
            />

            <FormInput
              label="Bank Name"
              placeholder="e.g. HDFC Bank, ICICI, SBI"
              value={formData.bankName}
              onChangeText={v => handleChange('bankName', v)}
              error={errors.bankName}
            />

            <FormInput
              label="IFSC Code"
              placeholder="11 characters (e.g. SBIN0001234)"
              autoCapitalize="characters"
              maxLength={11}
              value={formData.ifscCode}
              onChangeText={v => handleChange('ifscCode', v.toUpperCase())}
              error={errors.ifscCode}
            />

            <FormInput
              label="Account Number"
              placeholder="Enter your account number"
              keyboardType="numeric"
              secureTextEntry
              value={formData.accountNumber}
              onChangeText={v => handleChange('accountNumber', v)}
              error={errors.accountNumber}
            />
          </View>

          <Button
            onPress={handleSubmit}
            variant={isFormValid ? 'primary' : 'disabled'}
            loading={loading}
            className="w-full shadow-lg shadow-primary-500/20"
          >
            {isEditMode ? 'Update Bank Details →' : 'Save & Finish Setup →'}
          </Button>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};
