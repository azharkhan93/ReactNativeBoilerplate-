import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Typography } from '@/components/theme';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageUpload } from '@/hooks/useImageUpload';

import { AvatarUploadContentProps } from './types';
import { avatarUploadStyles } from './styles';

export const AvatarUploadContent: React.FC<AvatarUploadContentProps> = ({
  avatarUrl,
  onSave,
  onClose,
}) => {
  const [currentUri, setCurrentUri] = useState<string | null>(avatarUrl);

  const { triggerUpload, uploading } = useImageUpload({
    fileName: 'profile_avatar.jpg',
    onSuccess: setCurrentUri,
  });

  const handleRemove = useCallback(() => setCurrentUri(null), []);

  const handleSave = useCallback(
    () => onSave(currentUri),
    [onSave, currentUri],
  );

  const saveLabel = uploading ? 'Uploading...' : 'Save Image';

  return (
    <View className={avatarUploadStyles.container}>
      <Typography variant="subheading" className={avatarUploadStyles.title}>
        Upload Profile Picture
      </Typography>

      <Dropzone
        label="Avatar Image"
        onUpload={triggerUpload}
        onRemove={handleRemove}
        imageUri={currentUri}
      />

      <View className={avatarUploadStyles.actions}>
        <TouchableOpacity
          onPress={onClose}
          className={avatarUploadStyles.cancelButton}
        >
          <Typography className={avatarUploadStyles.cancelLabel}>Cancel</Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          disabled={uploading}
          className={avatarUploadStyles.saveButton(uploading)}
        >
          <Typography className={avatarUploadStyles.saveLabel}>
            {saveLabel}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};
