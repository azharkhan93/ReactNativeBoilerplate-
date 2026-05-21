import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_VENDOR_PROFILE,
  GET_VENDOR_BANK_DETAILS,
  UPSERT_VENDOR_BANK_DETAILS,
  DELETE_VENDOR_BANK_DETAILS,
} from '../../vendorQueries';
import { getUserId } from '@/utils/store/authStore';

export interface BankFormData {
  id?: string;
  accountHolder: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
}

const EMPTY_FORM: BankFormData = {
  accountHolder: '',
  bankName: '',
  ifscCode: '',
  accountNumber: '',
};

export const useBankAccountDetails = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<BankFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BankFormData | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

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
    errorPolicy: 'all',
  });

  const [upsertBankDetails, { loading: saving }] = useMutation(UPSERT_VENDOR_BANK_DETAILS);
  const [deleteBankDetails, { loading: deleting }] = useMutation(DELETE_VENDOR_BANK_DETAILS);

  // Sync loaded banking data with local profile state
  useEffect(() => {
    const b = bankData?.getVendorBankDetails;
    if (b) {
      setProfile({
        id: b.id,
        accountHolder: b.accountHolder,
        bankName: b.bankName,
        ifscCode: b.ifscCode,
        accountNumber: b.accountNumber,
      });
    } else {
      setProfile(null);
    }
  }, [bankData]);

  const handleOpenAddModal = useCallback(() => {
    setEditingProfile(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback(() => {
    if (profile) {
      setEditingProfile(profile);
      setIsModalOpen(true);
    }
  }, [profile]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProfile(null);
  }, []);

  const handleSaveProfile = useCallback(
    async (formData: BankFormData) => {
      if (!vendorProfileId) return;

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
        await refetchBank();
        handleCloseModal();
      } catch (err) {
        console.error('Failed to save bank details:', err);
      }
    },
    [vendorProfileId, upsertBankDetails, refetchBank, handleCloseModal]
  );

  const handleDeleteProfile = useCallback(async () => {
    const id = profile?.id;
    if (!id) return;

    try {
      await deleteBankDetails({
        variables: { id },
      });
      setProfile(null);
      await refetchBank();
    } catch (err) {
      console.error('Failed to delete bank details:', err);
    }
  }, [profile?.id, deleteBankDetails, refetchBank]);

  return {
    profile,
    vendorProfileId,
    loading: loadingProfile || loadingBank || saving || deleting,
    isModalOpen,
    editingProfile,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveProfile,
    handleDeleteProfile,
    emptyProfile: EMPTY_FORM,
  };
};
