import React, { useState, useCallback, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { Lock } from 'lucide-react-native';
import { Typography, Button, FormInput } from '@/components/theme';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { BankFormData } from './hooks/useBankAccountDetails';
import { validateBankForm, checkIsFormValid, BankFormErrors } from './utils';
import { bankDetailsFormStyles as s } from './styles';

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
  const [errors, setErrors] = useState<BankFormErrors>({});
  const prevRef = useRef({ visible, initialProfile });

  const isEditMode = !!initialProfile?.id;

  if (
    prevRef.current.initialProfile !== initialProfile ||
    (visible && !prevRef.current.visible)
  ) {
    prevRef.current = { visible, initialProfile };
    setFormData(initialProfile ? { ...initialProfile } : { ...EMPTY_FORM });
    setErrors({});
  }

  const handleChange = useCallback(
    (field: keyof Omit<BankFormData, 'id'>, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const { isValid, errors: validationErrors } = validateBankForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  }, [formData, onSave]);

  const isFormValid = checkIsFormValid(formData);

  return (
    <BottomSheetModal
      visible={visible}
      title={isEditMode ? 'Modify Bank Account' : 'Setup Bank Account'}
      onClose={onClose}
      height="88%"
      scrollable={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className={s.container}>
          {/* Centered Secure Header */}
          <View className={s.headerContainer}>
            <View className={s.lockIconBox}>
              <Lock size={20} color="#3b82f6" />
            </View>
            <Typography variant="subheading" className={s.headerTitle}>
              {isEditMode
                ? 'Edit Payout Credentials'
                : 'Secure Payout Configuration'}
            </Typography>
            <Typography variant="body-sm" className={s.headerSubtext}>
              Banking data is protected with end-to-end industry-standard
              encryption protocols.
            </Typography>
          </View>

          {/* Form Input Group Panel */}
          <View className={s.formCard}>
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
            className={s.submitButton}
          >
            {isEditMode ? 'Update Bank Details →' : 'Save & Finish Setup →'}
          </Button>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};
