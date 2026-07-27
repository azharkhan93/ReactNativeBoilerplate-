import React, { useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Building2 } from 'lucide-react-native';
import { Typography, Button } from '../../theme';
import { AppSkeletonLoader } from '@/components/shared';
import {
  useBusinessProfile,
  BusinessProfileFormData,
} from './hooks/useBusinessProfile';
import { BusinessProfileForm } from './BusinessProfileForm';
import {
  BusinessDetails,
  BusinessExtendedDetails,
  BusinessExtendedDetailsForm,
  WhyChooseMeForm,
} from './components';
import { businessProfileStyles } from './styles';

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

  const [isExtendedModalOpen, setIsExtendedModalOpen] = useState<boolean>(false);
  const [isWhyChooseMeModalOpen, setIsWhyChooseMeModalOpen] = useState<boolean>(false);

  const handleOpenExtended = useCallback(
    (): void => setIsExtendedModalOpen(true),
    [],
  );
  const handleCloseExtended = useCallback(
    (): void => setIsExtendedModalOpen(false),
    [],
  );
  const handleOpenWhyChooseMe = useCallback(
    (): void => setIsWhyChooseMeModalOpen(true),
    [],
  );
  const handleCloseWhyChooseMe = useCallback(
    (): void => setIsWhyChooseMeModalOpen(false),
    [],
  );

  const handleSaveExtended = useCallback(
    async (updatedData: BusinessProfileFormData): Promise<void> => {
      await handleSaveProfile(updatedData);
      setIsExtendedModalOpen(false);
    },
    [handleSaveProfile],
  );

  const handleSaveWhyChooseMe = useCallback(
    async (updatedWhyChooseMe: string): Promise<void> => {
      if (profile) {
        await handleSaveProfile({
          ...profile,
          whyChooseMe: updatedWhyChooseMe,
        });
        setIsWhyChooseMeModalOpen(false);
      }
    },
    [profile, handleSaveProfile],
  );

  if (loading && !profile) {
    return <AppSkeletonLoader />;
  }

  if (!profile) {
    return (
      <View className={businessProfileStyles.emptyRoot}>
        <View className={businessProfileStyles.emptyContainer}>
          <Building2 size={40} color="#3b82f6" />
          <Typography
            variant="subheading"
            className={businessProfileStyles.emptyTitle}
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
        className={businessProfileStyles.root}
        showsVerticalScrollIndicator={false}
      >
        <View className={businessProfileStyles.container}>
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
