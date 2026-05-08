import { useState, useCallback, useMemo } from 'react';

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export interface BankFormData {
  accountHolder: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
}

export const useBankAccountDetails = () => {
  const [formData, setFormData] = useState<BankFormData>({
    accountHolder: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BankFormData, string>>>({});

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof BankFormData, string>> = {};

    if (!formData.accountHolder) newErrors.accountHolder = 'Account holder name is required';
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';

    if (!formData.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!IFSC_REGEX.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC format (e.g. SBIN0001234)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((value: string, field?: string) => {
    if (!field) return;
    const key = field as keyof BankFormData;
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(() => {
    if (validate()) {
      console.log('Saving bank details:', formData);
    }
  }, [formData, validate]);

  const isFormValid = formData.accountHolder && formData.bankName &&
    IFSC_REGEX.test(formData.ifscCode) && formData.accountNumber;

  return {
    formData,
    errors,
    isFormValid,
    handleInputChange,
    handleSubmit,
  };
};
