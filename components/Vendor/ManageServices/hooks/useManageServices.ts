import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_VENDOR_PROFILE, GET_VENDOR_SERVICES, CREATE_VENDOR_SERVICE, UPDATE_VENDOR_SERVICE, DELETE_VENDOR_SERVICE, VENDOR_PROFILE_FIELDS } from '../../vendorQueries';
import { getUserId } from '@/utils/store/authStore';
import { useFragment } from '@/__generated__/fragment-masking';

export interface ServiceItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  features?: string[];
  images?: string[];
}

export const useManageServices = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserId().then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Vendor Profile to get vendorProfileId
  const { data: profileData, loading: loadingProfile } = useQuery(GET_VENDOR_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId,
  });

  const profileFragment = useFragment(VENDOR_PROFILE_FIELDS, profileData?.getVendorProfile);
  const vendorProfileId = profileFragment?.id;

  // 2. Fetch Services once vendorProfileId is resolved
  const { data: servicesData, loading: loadingServices, refetch: refetchServices } = useQuery(GET_VENDOR_SERVICES, {
    variables: { vendorProfileId: vendorProfileId || '' },
    skip: !vendorProfileId,
  });

  const [createService, { loading: creating }] = useMutation(CREATE_VENDOR_SERVICE);
  const [updateService, { loading: updating }] = useMutation(UPDATE_VENDOR_SERVICE);
  const [deleteService, { loading: deleting }] = useMutation(DELETE_VENDOR_SERVICE);


  useEffect(() => {
    if (servicesData?.getVendorServices) {
      setServices(servicesData.getVendorServices.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description || '',
        price: s.price,
        duration: s.duration ? `${s.duration} mins` : '30 mins',
        location: s.location || '',
        features: s.features ? [...s.features] : [],
        images: s.images ? [...s.images] : [],
      })));
    }
  }, [servicesData]);

  const handleOpenAddModal = useCallback(() => {
    setEditingService(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((service: ServiceItem) => {
    setEditingService(service);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingService(null);
  }, []);

  const handleSaveService = useCallback(async (data: {
    name: string;
    price: string;
    duration: string;
    location: string;
    description: string;
    images?: string[];
  }) => {
    if (!vendorProfileId) return;

    // Parse duration into a number of minutes (e.g. "45 mins" -> 45)
    const durationMinutes = parseInt(data.duration.replace(/[^0-9]/g, ''), 10) || 30;

    const payload = {
      vendorProfileId,
      name: data.name,
      description: data.description,
      price: parseFloat(data.price) || 0,
      duration: durationMinutes,
      location: data.location,
      features: [],
      images: data.images || [],
    };

    try {
      if (editingService?.id) {
        await updateService({
          variables: {
            id: editingService.id,
            input: payload,
          },
        });
      } else {
        await createService({
          variables: {
            input: payload,
          },
        });
      }
      refetchServices();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save service:', err);
    }
  }, [vendorProfileId, editingService, createService, updateService, refetchServices, handleCloseModal]);

  const handleDeleteService = useCallback(async (id: string) => {
    try {
      await deleteService({
        variables: { id },
      });
      refetchServices();
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  }, [deleteService, refetchServices]);

  return {
    services,
    loading: loadingProfile || loadingServices || creating || updating || deleting,
    isModalOpen,
    editingService,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveService,
    handleDeleteService,
  };
};
