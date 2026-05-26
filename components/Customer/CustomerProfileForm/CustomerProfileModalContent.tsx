import React, { useState, useCallback } from 'react';
import { useCustomerProfile } from './hooks/useCustomerProfile';
import { CustomerProfileDetails } from '../CustomerProfileDetails';
import { CustomerProfileForm } from './CustomerProfileForm';
import { View, ActivityIndicator } from 'react-native';

interface CustomerProfileModalContentProps {
  onClose: () => void;
}

export const CustomerProfileModalContent: React.FC<CustomerProfileModalContentProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Hook handles save callbacks, deletes, and details
  const {
    profile,
    loading,
    hasProfile,
    handleDelete,
  } = useCustomerProfile();

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleDeleteClick = useCallback(async () => {
    await handleDelete();
    setIsEditing(false);
    onClose();
  }, [handleDelete, onClose]);

  // If loading the initial profile fetch, show loading indicator
  if (loading && !profile.name && !isEditing) {
    return (
      <View className="flex-1 items-center justify-center p-12 bg-notch">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Determine which screen component to render
  if (hasProfile && !isEditing) {
    return (
      <CustomerProfileDetails
        profile={profile}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        deleting={loading}
      />
    );
  }

  return (
    <CustomerProfileForm
      onClose={hasProfile ? handleEditCancel : onClose}
      isEditMode={hasProfile}
    />
  );
};
