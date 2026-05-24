import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '../../theme';
import {
  useCustomerAddresses,
  AddressData,
} from './hooks/useCustomerAddresses';
import { AddressItemCard } from './components/AddressItemCard';
import { CustomerAddressForm } from './components/CustomerAddressForm';
import { Plus, MapPin } from 'lucide-react-native';

export const CustomerAddressDetails: React.FC = () => {
  const {
    addresses,
    handleAddAddress,
    handleUpdateAddress,
    handleRemoveAddress,
  } = useCustomerAddresses();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(
    null,
  );

  const handleAddClick = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEditClick = (address: AddressData) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleFormSave = (data: Omit<AddressData, 'id'>) => {
    if (editingAddress) {
      handleUpdateAddress(editingAddress.id, data);
    } else {
      handleAddAddress(data);
    }
    setShowForm(false);
    setEditingAddress(null);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="px-5 pt-2 pb-8 bg-gray-950">
        {/* Header Block */}
        <View className="items-center mb-6 mt-2">
          <View className="w-12 h-12 bg-primary-500/10 border border-primary-500/25 rounded-full items-center justify-center mb-3">
            <MapPin size={20} color="#3b82f6" />
          </View>
          <Typography
            variant="subheading"
            className="text-white text-center font-body-bold"
          >
            Saved Addresses
          </Typography>
          <Typography
            variant="body-sm"
            className="text-gray-400 text-center px-4 mt-1 leading-5"
          >
            Manage your delivery and service addresses for faster bookings.
          </Typography>
        </View>

        {!showForm ? (
          <TouchableOpacity
            onPress={handleAddClick}
            className="mb-6 flex-row items-center justify-center gap-1.5 py-2"
            activeOpacity={0.7}
          >
            <Plus size={16} color="#3b82f6" />
            <Typography className="text-primary-400 font-body-bold text-sm">
              Add New Address
            </Typography>
          </TouchableOpacity>
        ) : null}

        {showForm ? (
          <CustomerAddressForm
            initialAddress={editingAddress}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
            isEdit={!!editingAddress}
          />
        ) : null}

        {/* Addresses List */}
        {addresses.map(addr => (
          <AddressItemCard
            key={addr.id}
            address={addr}
            onEdit={() => handleEditClick(addr)}
            onRemove={() => handleRemoveAddress(addr.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
