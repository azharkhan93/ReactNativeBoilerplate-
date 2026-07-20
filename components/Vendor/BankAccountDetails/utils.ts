import { BankFormData } from './hooks/useBankAccountDetails';

export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export type BankFormErrors = Partial<Record<keyof Omit<BankFormData, 'id'>, string>>;

export const validateBankForm = (
  formData: BankFormData,
): { isValid: boolean; errors: BankFormErrors } => {
  const errors: BankFormErrors = {};

  if (!formData.accountHolder.trim()) {
    errors.accountHolder = 'Account holder name is required';
  }
  if (!formData.bankName.trim()) {
    errors.bankName = 'Bank name is required';
  }
  if (!formData.accountNumber.trim()) {
    errors.accountNumber = 'Account number is required';
  }

  if (!formData.ifscCode.trim()) {
    errors.ifscCode = 'IFSC code is required';
  } else if (!IFSC_REGEX.test(formData.ifscCode)) {
    errors.ifscCode = 'Invalid IFSC format (e.g. SBIN0001234)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const checkIsFormValid = (formData: BankFormData): boolean => {
  return !!(
    formData.accountHolder.trim() &&
    formData.bankName.trim() &&
    IFSC_REGEX.test(formData.ifscCode) &&
    formData.accountNumber.trim()
  );
};
