/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

interface BusinessFormData {
  businessName: string;
  gstNumber: string;
  address: string;
  contactNumber: string;
  imageUri: string | null;
}

export const useBusinessProfile = () => {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: '',
    gstNumber: '',
    address: '',
    contactNumber: '',
    imageUri: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BusinessFormData, string>>>({});

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof BusinessFormData, string>> = {};
    
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.address) newErrors.address = 'Business address is required';
    
    if (!formData.gstNumber) {
      newErrors.gstNumber = 'GST number is required';
    } else if (!GST_REGEX.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Invalid GST format (e.g. 22AAAAA0000A1Z5)';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = 'Enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (field: keyof BusinessFormData, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = useCallback(() => {
    if (validate()) {
      console.log('Submitting business profile:', formData);
      // API call here
    }
  }, [formData, validate]);

  const handleImageUpload = useCallback(() => {
    // Mock image upload
    handleChange('imageUri', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800');
  }, []);

  const handleImageRemove = useCallback(() => {
    handleChange('imageUri', null);
  }, []);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleImageRemove,
  };
};
