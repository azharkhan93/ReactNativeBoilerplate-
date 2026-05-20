import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_VENDOR_PROFILE,
  CREATE_VENDOR_PROFILE,
  UPDATE_VENDOR_PROFILE,
  DELETE_VENDOR_PROFILE,
} from '../../vendorQueries';
import { getUserId } from '@/utils/store/authStore';
import {
  VendorProfile,
  toFormProfile,
  toCreateInput,
  toUpdateInput,
} from '../profile.types';

export type BusinessProfileData = ReturnType<typeof toFormProfile>;

const EMPTY_PROFILE: BusinessProfileData = {
  businessName: '',
  gstNumber: '',
  address: '',
  contactNumber: '',
  imageUri: null,
  serviceRadius: '5km',
  operatingHours: 'Mon - Sat, 09:00 AM - 08:00 PM',
};

/**
 * Backend (NestGqlBoilerplate) vendor profile behavior:
 * - 1:1 with User via unique userId (Prisma VendorProfile.userId @unique)
 * - createVendorProfile → upsertByUserId (create OR update by userId, not a new row each time)
 * - updateVendorProfile → partial update by profile id
 * - deleteVendorProfile → hard delete by id
 * - Child modules (bank, services, availability) use vendorProfile.id, not userId
 */
export const useBusinessProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<BusinessProfileData | null>(null);
  const [vendorProfileId, setVendorProfileId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BusinessProfileData | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const { data, loading: loadingProfile, refetch } = useQuery(GET_VENDOR_PROFILE, {
    variables: { userId: userId || '' },
    skip: !userId,
    // getVendorProfile may error when no row exists (schema is non-null)
    errorPolicy: 'all',
  });

  const [createProfile, { loading: creating }] = useMutation(CREATE_VENDOR_PROFILE);
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_VENDOR_PROFILE);
  const [deleteProfile, { loading: deleting }] = useMutation(DELETE_VENDOR_PROFILE);

  useEffect(() => {
    const vendorProfile = data?.getVendorProfile as VendorProfile | undefined;
    if (vendorProfile?.id) {
      setProfile(toFormProfile(vendorProfile));
      setVendorProfileId(vendorProfile.id);
    } else {
      setProfile(null);
      setVendorProfileId(null);
    }
  }, [data]);

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
    async (formData: BusinessProfileData) => {
      if (!userId) return;

      const form = { ...formData };
      const profileId = editingProfile?.id ?? profile?.id;

      try {
        if (profileId) {
          // Explicit update when we already have a profile id
          await updateProfile({
            variables: {
              id: profileId,
              input: toUpdateInput(form),
            },
          });
        } else {
          // Backend createVendorProfile upserts by userId (createOrUpdate)
          await createProfile({
            variables: {
              input: toCreateInput(form, userId),
            },
          });
        }
        await refetch();
        handleCloseModal();
      } catch (err) {
        console.error('Failed to save business profile:', err);
      }
    },
    [userId, editingProfile?.id, profile?.id, createProfile, updateProfile, refetch, handleCloseModal],
  );

  const handleDeleteProfile = useCallback(async () => {
    const id = profile?.id ?? vendorProfileId;
    if (!id) return;

    try {
      await deleteProfile({ variables: { id } });
      setProfile(null);
      setVendorProfileId(null);
      await refetch();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to delete business profile:', err);
    }
  }, [profile?.id, vendorProfileId, deleteProfile, refetch, handleCloseModal]);

  return {
    profile,
    vendorProfileId,
    userId,
    loading: loadingProfile || creating || updating || deleting,
    isModalOpen,
    editingProfile,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveProfile,
    handleDeleteProfile,
    emptyProfile: EMPTY_PROFILE,
  };
};
