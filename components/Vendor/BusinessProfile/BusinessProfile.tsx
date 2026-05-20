import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Typography, Button } from '../../theme';
import { Pencil, Trash2, Building2 } from 'lucide-react-native';
import { useBusinessProfile, BusinessProfileData } from './hooks/useBusinessProfile';
import { BusinessProfileForm } from './BusinessProfileForm';

const ProfileImage: React.FC<{ profile: BusinessProfileData }> = ({ profile }) => (
  <View className="rounded-3xl overflow-hidden border border-gray-800 mb-4">
    {profile.imageUri ? (
      <Image source={{ uri: profile.imageUri }} className="w-full h-44" resizeMode="cover" />
    ) : (
      <View className="w-full h-44 bg-gray-900 items-center justify-center">
        <Building2 size={36} color="#374151" />
      </View>
    )}
  </View>
);

interface DetailRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, isLast }) => (
  <View className={`py-3 ${isLast ? '' : 'border-b border-gray-800/60'}`}>
    <Typography variant="body-sm" className="text-gray-500 mb-1">
      {label}
    </Typography>
    <Typography variant="body-sm" className="text-white leading-5">
      {value || '—'}
    </Typography>
  </View>
);

const BusinessDetails: React.FC<{ profile: BusinessProfileData }> = ({ profile }) => (
  <View className="bg-gray-900 border border-gray-800 rounded-2xl px-4 mb-5">
    <Typography variant="subheading" className="text-white py-4 border-b border-gray-800/60">
      Business Details
    </Typography>

    <DetailRow label="Business Name" value={profile.businessName} />
    <DetailRow label="GST Number" value={profile.gstNumber} />
    <DetailRow label="Contact Number" value={profile.contactNumber ? `+91 ${profile.contactNumber}` : ''} />
    <DetailRow label="Business Address" value={profile.address} />
    <DetailRow label="Service Radius" value={profile.serviceRadius} />
    <DetailRow label="Operating Hours" value={profile.operatingHours} isLast />
  </View>
);

export const BusinessProfile: React.FC = () => {
  const {
    profile,
    loading,
    isModalOpen,
    editingProfile,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveProfile,
    handleDeleteProfile,
  } = useBusinessProfile();

  if (loading && !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-950 p-10 min-h-[300px]">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography className="text-gray-400 mt-4 font-body">Loading Business Profile...</Typography>
      </View>
    );
  }

  if (!profile) {
    return (
      <View className="flex-1 bg-gray-950">
        <View className="px-5 py-8 items-center">
          <Building2 size={40} color="#3b82f6" />
          <Typography variant="subheading" className="text-white mt-4 mb-6 text-center">
            Set Up Your Business
          </Typography>
          <Button variant="primary" onPress={handleOpenAddModal}>
            Add Business Details →
          </Button>
        </View>

        <BusinessProfileForm
          visible={isModalOpen}
          initialProfile={editingProfile}
          onClose={handleCloseModal}
          onSave={handleSaveProfile}
          loading={loading}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-5 pt-4">
          <ProfileImage profile={profile} />
          <BusinessDetails profile={profile} />

          <View className="flex-row items-stretch gap-3">
            <TouchableOpacity
              onPress={handleOpenEditModal}
              className="flex-1 flex-row items-center justify-center bg-gray-900 border border-gray-800 rounded-2xl py-3.5"
            >
              <Pencil size={16} color="#3b82f6" />
              <Typography className="text-primary-400 font-body-semibold ml-2">Edit Profile</Typography>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteProfile}
              disabled={loading}
              className="flex-1 flex-row items-center justify-center bg-red-500/10 border border-red-500/25 rounded-2xl py-3.5"
            >
              <Trash2 size={16} color="#ef4444" />
              <Typography className="text-red-400 font-body-semibold ml-2">Delete</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BusinessProfileForm
        visible={isModalOpen}
        initialProfile={editingProfile}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        loading={loading}
      />
    </View>
  );
};
