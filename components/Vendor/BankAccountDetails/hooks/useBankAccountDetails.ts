import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_VENDOR_PROFILE, GET_VENDOR_BANK_DETAILS, UPSERT_VENDOR_BANK_DETAILS } from '../../vendorQueries';
import { getUserId } from '@/utils/store/authStore';

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export interface BankFormData {
  accountHolder: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
}

export const useBankAccountDetails = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const [formData, setFormData] = useState<BankFormData>({
    accountHolder: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BankFormData, string>>>({});

  // 1. Fetch Vendor Profile to get vendorProfileId
  const { data: profileData, loading: loadingProfile } = useQuery(GET_VENDOR_PROFILE, {
    variables: { userId: userId || '' },
    skip: !userId,
  });

  const vendorProfileId = profileData?.getVendorProfile?.id;

  // 2. Fetch Bank Details once vendorProfileId is available
  const { data: bankData, loading: loadingBank, refetch: refetchBank } = useQuery(GET_VENDOR_BANK_DETAILS, {
    variables: { vendorProfileId: vendorProfileId || '' },
    skip: !vendorProfileId,
  });

  const [upsertBankDetails, { loading: saving }] = useMutation(UPSERT_VENDOR_BANK_DETAILS);

  // Sync loaded banking data with form state
  useEffect(() => {
    if (bankData?.getVendorBankDetails) {
      const b = bankData.getVendorBankDetails;
      setFormData({
        accountHolder: b.accountHolder || '',
        bankName: b.bankName || '',
        ifscCode: b.ifscCode || '',
        accountNumber: b.accountNumber || '',
      });
    }
  }, [bankData]);

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof BankFormData, string>> = {};

    if (!formData.accountHolder) {
      newErrors.accountHolder = 'Account holder name is required';
    }
    if (!formData.bankName) {
      newErrors.bankName = 'Bank name is required';
    }
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    }

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

  const handleSubmit = useCallback(async () => {
    if (!validate() || !vendorProfileId) return;

    try {
      await upsertBankDetails({
        variables: {
          vendorProfileId,
          input: {
            accountHolder: formData.accountHolder,
            bankName: formData.bankName,
            ifscCode: formData.ifscCode,
            accountNumber: formData.accountNumber,
          },
        },
      });
      refetchBank();
    } catch (err) {
      console.error('Failed to save bank details:', err);
    }
  }, [formData, validate, vendorProfileId, upsertBankDetails, refetchBank]);

  const isFormValid =
    formData.accountHolder &&
    formData.bankName &&
    IFSC_REGEX.test(formData.ifscCode) &&
    formData.accountNumber;

  return {
    formData,
    errors,
    isFormValid,
    loading: loadingProfile || loadingBank || saving,
    handleInputChange,
    handleSubmit,
  };
};
