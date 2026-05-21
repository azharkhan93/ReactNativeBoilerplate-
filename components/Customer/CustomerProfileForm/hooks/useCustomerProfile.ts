import { useState, useCallback } from 'react';

export interface CustomerProfileData {
  name: string;
  phone: string;
  email: string;
  location: string;
}

const DEFAULT_PROFILE: CustomerProfileData = {
  name: 'Md Abu Ubayda',
  phone: '+88001712346789',
  email: 'ubayda@example.com',
  location: 'Greater Seattle Area, WA',
};

export const useCustomerProfile = (onSaveCallback?: () => void) => {
  const [profile, setProfile] = useState<CustomerProfileData>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerProfileData, string>>>({});

  const handleChange = useCallback((field: keyof CustomerProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const handleSave = useCallback(async () => {
    const newErrors: Partial<Record<keyof CustomerProfileData, string>> = {};
    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API saving delay
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    setLoading(false);
    onSaveCallback?.();
  }, [profile, onSaveCallback]);

  return {
    profile,
    loading,
    errors,
    handleChange,
    handleSave,
  };
};
