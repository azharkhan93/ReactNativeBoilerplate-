import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Typography, Button } from '../../theme';
import { Pencil, Trash2, Building2 } from 'lucide-react-native';
import {
  useBusinessProfile,
  BusinessProfileFormData,
} from './hooks/useBusinessProfile';
import { BusinessProfileForm } from './BusinessProfileForm';
import {
  BusinessExtendedDetails,
  BusinessExtendedDetailsForm,
  WhyChooseMeForm,
} from './components';

interface BusinessDetailsProps {
  profile: BusinessProfileFormData;
  onEditPress: () => void;
  onDeletePress: () => void;
  loading: boolean;
}

interface DetailRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, isLast }) => (
  <View className={`flex-row items-start justify-between py-3 ${isLast ? '' : 'border-b border-gray-800/60'}`}>
    <Typography variant="body-sm" className="text-gray-500 font-body">
      {label}
    </Typography>
    <Typography variant="body-sm" className="text-white font-body-semibold text-right max-w-[65%] leading-5">
      {value || '—'}
    </Typography>
  </View>
);

const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  profile,
  onEditPress,
  onDeletePress,
  loading,
}) => (
  <View className="bg-gray-900 border border-gray-800 rounded-3xl p-4 mb-5">
    <View className="flex-row items-center justify-between pb-3 border-b border-gray-800/60 mb-4">
      <Typography variant="subheading" className="text-white font-body-semibold">
        Business Details
      </Typography>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onEditPress}
          className="w-8 h-8 bg-gray-800 rounded-full items-center justify-center border border-gray-700"
          activeOpacity={0.7}
        >
          <Pencil size={13} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDeletePress}
          disabled={loading}
          className="w-8 h-8 bg-red-500/10 rounded-full items-center justify-center border border-red-500/10"
          activeOpacity={0.7}
        >
          <Trash2 size={13} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>

    <View className="rounded-2xl overflow-hidden border border-gray-800 mb-4 bg-gray-950">
      {profile.imageUri ? (
        <Image
          source={{ uri: profile.imageUri }}
          className="w-full h-40"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-40 bg-gray-900 items-center justify-center">
          <Building2 size={32} color="#4B5563" />
        </View>
      )}
    </View>

    <DetailRow label="Business Name" value={profile.businessName || ''} />
    <DetailRow label="GST Number" value={profile.gstNumber || ''} />
    <DetailRow
      label="Contact Number"
      value={profile.contactNumber ? `+91 ${profile.contactNumber}` : ''}
    />
    <DetailRow label="Business Address" value={profile.address || ''} />
    <DetailRow label="Service Radius" value={profile.serviceRadius || ''} />
    <DetailRow
      label="Operating Hours"
      value={profile.operatingHours || ''}
      isLast
    />
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

  const [isExtendedModalOpen, setIsExtendedModalOpen] = useState(false);
  const [isWhyChooseMeModalOpen, setIsWhyChooseMeModalOpen] = useState(false);

  const handleOpenExtended = useCallback(() => setIsExtendedModalOpen(true), []);
  const handleCloseExtended = useCallback(() => setIsExtendedModalOpen(false), []);
  const handleOpenWhyChooseMe = useCallback(() => setIsWhyChooseMeModalOpen(true), []);
  const handleCloseWhyChooseMe = useCallback(() => setIsWhyChooseMeModalOpen(false), []);

  const handleSaveExtended = useCallback(async (updatedData: BusinessProfileFormData) => {
    await handleSaveProfile(updatedData);
    setIsExtendedModalOpen(false);
  }, [handleSaveProfile]);

  const handleSaveWhyChooseMe = useCallback(async (updatedWhyChooseMe: string) => {
    if (profile) {
      await handleSaveProfile({
        ...profile,
        whyChooseMe: updatedWhyChooseMe,
      });
      setIsWhyChooseMeModalOpen(false);
    }
  }, [profile, handleSaveProfile]);

  if (loading && !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-950 p-10 min-h-[300px]">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Typography className="text-gray-400 mt-4 font-body">
          Loading Business Profile...
        </Typography>
      </View>
    );
  }

  if (!profile) {
    return (
      <View className="flex-1 bg-gray-950">
        <View className="px-5 py-8 items-center">
          <Building2 size={40} color="#3b82f6" />
          <Typography
            variant="subheading"
            className="text-white mt-4 mb-6 text-center"
          >
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
    <>
      <ScrollView
        className="flex-1 bg-gray-950"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4 pb-8">
          <BusinessDetails
            profile={profile}
            onEditPress={handleOpenEditModal}
            onDeletePress={handleDeleteProfile}
            loading={loading}
          />

          <BusinessExtendedDetails
            profile={profile}
            onEditPress={handleOpenExtended}
            onWhyChooseMeEditPress={handleOpenWhyChooseMe}
          />
        </View>
      </ScrollView>

      <BusinessProfileForm
        visible={isModalOpen}
        initialProfile={editingProfile}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        loading={loading}
      />

      <BusinessExtendedDetailsForm
        visible={isExtendedModalOpen}
        initialData={profile}
        onClose={handleCloseExtended}
        onSave={handleSaveExtended}
        loading={loading}
      />

      <WhyChooseMeForm
        visible={isWhyChooseMeModalOpen}
        initialValue={profile.whyChooseMe}
        onClose={handleCloseWhyChooseMe}
        onSave={handleSaveWhyChooseMe}
        loading={loading}
      />
    </>
  );
};
