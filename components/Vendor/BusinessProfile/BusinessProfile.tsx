import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Typography, Button } from '../../theme';
import { Clock, Pencil, MapPin, Phone, FileText, Trash2, Building2 } from 'lucide-react-native';
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

const CompactMeta: React.FC<{ profile: BusinessProfileData }> = ({ profile }) => (
  <View className="flex-row flex-wrap gap-2 mb-4">
    <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-xl px-3 py-2">
      <MapPin size={14} color="#a855f7" />
      <Typography variant="body-sm" className="text-gray-300 ml-2">
        {profile.serviceRadius}
      </Typography>
    </View>
    <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-xl px-3 py-2">
      <Phone size={14} color="#22c55e" />
      <Typography variant="body-sm" className="text-gray-300 ml-2">
        +91 {profile.contactNumber}
      </Typography>
    </View>
    {profile.gstNumber ? (
      <View className="flex-row items-center bg-gray-900 border border-gray-800 rounded-xl px-3 py-2">
        <FileText size={14} color="#f59e0b" />
        <Typography variant="body-sm" className="text-gray-300 ml-2">
          {profile.gstNumber}
        </Typography>
      </View>
    ) : null}
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

          <Typography variant="h3" className="text-white text-xl mb-3">
            {profile.businessName}
          </Typography>

          <CompactMeta profile={profile} />

          <View className="bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 flex-row items-center mb-4">
            <View className="w-9 h-9 bg-blue-500/10 rounded-xl items-center justify-center mr-3">
              <Clock size={18} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Typography variant="body-sm" className="text-gray-500">
                Operating Hours
              </Typography>
              <Typography variant="body-sm" className="text-white mt-0.5">
                {profile.operatingHours}
              </Typography>
            </View>
          </View>

          {profile.address ? (
            <View className="bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 mb-5">
              <Typography variant="body-sm" className="text-gray-500 mb-1">
                Address
              </Typography>
              <Typography variant="body-sm" className="text-gray-300 leading-5">
                {profile.address}
              </Typography>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleOpenEditModal}
            className="flex-row items-center justify-center bg-gray-900 border border-gray-800 rounded-2xl py-3.5 mb-3"
          >
            <Pencil size={16} color="#3b82f6" />
            <Typography className="text-primary-400 font-body-semibold ml-2">Edit Profile</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteProfile}
            disabled={loading}
            className="flex-row items-center justify-center py-3"
          >
            <Trash2 size={16} color="#ef4444" />
            <Typography className="text-red-400 font-body-medium ml-2 text-sm">Delete Profile</Typography>
          </TouchableOpacity>
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
