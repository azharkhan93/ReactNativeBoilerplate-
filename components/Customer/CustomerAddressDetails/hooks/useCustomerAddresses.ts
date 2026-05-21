import { useState, useCallback } from 'react';

export interface AddressData {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'home' | 'work' | 'office';
}

const DEFAULT_ADDRESSES: AddressData[] = [
  {
    id: 'a1',
    label: 'Apartment 4B',
    street: '123 Main St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    type: 'home',
  },
  {
    id: 'a2',
    label: 'Tech Corp Seattle',
    street: '789 Innovation Way',
    city: 'Bellevue',
    state: 'WA',
    zipCode: '98004',
    type: 'office',
  },
];

export const useCustomerAddresses = () => {
  const [addresses, setAddresses] = useState<AddressData[]>(DEFAULT_ADDRESSES);
  const [loading, setLoading] = useState(false);

  const handleAddAddress = useCallback((data: Omit<AddressData, 'id'>) => {
    setAddresses(prev => [
      ...prev,
      {
        ...data,
        id: `addr-${Date.now()}`,
      },
    ]);
  }, []);

  const handleUpdateAddress = useCallback((id: string, data: Omit<AddressData, 'id'>) => {
    setAddresses(prev =>
      prev.map(addr => (addr.id === id ? { ...data, id } : addr))
    );
  }, []);

  const handleRemoveAddress = useCallback((id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  }, []);

  return {
    addresses,
    loading,
    handleAddAddress,
    handleUpdateAddress,
    handleRemoveAddress,
  };
};
