import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import type {
  CreateVendorProfileInput,

  UpdateVendorProfileInput,
  VendorProfileFieldsFragment,
} from '@/__generated__/graphql';
import {
  CREATE_VENDOR_PROFILE,
  DELETE_VENDOR_PROFILE,
  GET_VENDOR_PROFILE,
  UPDATE_VENDOR_PROFILE,
  VENDOR_PROFILE_FIELDS,
} from '../../vendorQueries';
import { getUserId } from '@/utils/store/authStore';
import { useFragment } from '@/__generated__/fragment-masking';

export type VendorProfile = VendorProfileFieldsFragment;

export type BusinessProfileFormData = Required<
  Pick<
    CreateVendorProfileInput,
    'businessName' | 'gstNumber' | 'contactNumber' | 'address' | 'serviceRadius' | 'operatingHours'
  >
> & {
  id?: string;
  imageUri: string | null;
  whyChooseMe?: string | null;
  description?: string | null;
  images?: string[] | null;
};

const DEFAULT_OPERATING_HOURS = 'Mon - Sat, 09:00 AM - 08:00 PM';

const EMPTY_FORM: BusinessProfileFormData = {
  businessName: '',
  gstNumber: '',
  address: '',
  contactNumber: '',
  imageUri: null,
  serviceRadius: '5km',
  operatingHours: DEFAULT_OPERATING_HOURS,
  whyChooseMe: '',
  description: '',
  images: [],
};

const toFormData = (profile: VendorProfile): BusinessProfileFormData => ({
  id: profile.id,
  businessName: profile.businessName ?? '',
  gstNumber: profile.gstNumber ?? '',
  address: profile.address ?? '',
  contactNumber: profile.contactNumber ?? '',
  imageUri: profile.imageUri ?? null,
  serviceRadius: profile.serviceRadius ?? '5km',
  operatingHours: profile.operatingHours ?? DEFAULT_OPERATING_HOURS,
  whyChooseMe: profile.whyChooseMe ?? '',
  description: profile.description ?? '',
  images: profile.images ?? [],
});

const toCreateInput = (
  form: BusinessProfileFormData,
  userId: string,
): CreateVendorProfileInput => ({
  userId,
  businessName: form.businessName,
  imageUri: form.imageUri ?? undefined,
  gstNumber: form.gstNumber || undefined,
  contactNumber: form.contactNumber || undefined,
  address: form.address || undefined,
  serviceRadius: form.serviceRadius,
  operatingHours: form.operatingHours,
  whyChooseMe: form.whyChooseMe || undefined,
  description: form.description || undefined,
  images: form.images ?? [],
});

const toUpdateInput = (form: BusinessProfileFormData): UpdateVendorProfileInput => ({
  businessName: form.businessName,
  imageUri: form.imageUri ?? undefined,
  gstNumber: form.gstNumber || undefined,
  contactNumber: form.contactNumber || undefined,
  address: form.address || undefined,
  serviceRadius: form.serviceRadius,
  operatingHours: form.operatingHours,
  whyChooseMe: form.whyChooseMe || undefined,
  description: form.description || undefined,
  images: form.images ?? [],
});

export const useBusinessProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<BusinessProfileFormData | null>(null);
  const [vendorProfileId, setVendorProfileId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BusinessProfileFormData | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const { data, loading: loadingProfile, refetch } = useQuery(GET_VENDOR_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId,
    errorPolicy: 'all',
  });

  const unmaskedProfile = useFragment(VENDOR_PROFILE_FIELDS, data?.getVendorProfile);

  const [createProfile, { loading: creating }] = useMutation(CREATE_VENDOR_PROFILE);
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_VENDOR_PROFILE);
  const [deleteProfile, { loading: deleting }] = useMutation(DELETE_VENDOR_PROFILE);

  useEffect(() => {
    if (unmaskedProfile?.id) {
      setProfile(toFormData(unmaskedProfile));
      setVendorProfileId(unmaskedProfile.id);
    } else {
      setProfile(null);
      setVendorProfileId(null);
    }
  }, [unmaskedProfile]);

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
    async (formData: BusinessProfileFormData) => {
      if (!userId) return;

      const profileId = editingProfile?.id ?? profile?.id;

      try {
        if (profileId) {
          await updateProfile({
            variables: {
              id: profileId,
              input: toUpdateInput(formData),
            },
          });
        } else {
          await createProfile({
            variables: {
              input: toCreateInput(formData, userId),
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
    emptyProfile: EMPTY_FORM,
  };
};
