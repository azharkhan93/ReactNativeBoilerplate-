import { useState, useCallback } from 'react';

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

interface BankFormData {
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

  const handleChange = (field: keyof BankFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = useCallback(() => {
    if (validate()) {
      console.log('Saving bank details:', formData);
      // API call
    }
  }, [formData, validate]);

  const isFormValid = formData.accountHolder && formData.bankName && 
                     IFSC_REGEX.test(formData.ifscCode) && formData.accountNumber;

  return {
    formData,
    errors,
    isFormValid,
    handleChange,
    handleSubmit,
  };
};
