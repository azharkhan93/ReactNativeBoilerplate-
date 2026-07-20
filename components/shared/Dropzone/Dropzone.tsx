import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Typography } from '../../theme';
import { Upload, X } from 'lucide-react-native';
import { DropzoneProps } from './types';
import { dropzoneStyles } from './styles';

export const Dropzone: React.FC<DropzoneProps> = ({
  label,
  onUpload,
  imageUri,
  onRemove,
  className = '',
}) => {
  return (
    <View className={`${dropzoneStyles.container} ${className}`}>
      {label && (
        <Typography variant="body" className={dropzoneStyles.label}>
          {label}
        </Typography>
      )}

      {imageUri ? (
        <View className={dropzoneStyles.previewContainer}>
          <Image source={{ uri: imageUri }} className={dropzoneStyles.image} resizeMode="cover" />
          <TouchableOpacity
            onPress={onRemove}
            className={dropzoneStyles.removeButton}
          >
            <X size={16} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onUpload}
          className={dropzoneStyles.uploadButton}
        >
          <View className={dropzoneStyles.iconWrapper}>
            <Upload size={24} color="#3b82f6" />
          </View>
          <Typography className={dropzoneStyles.titleText}>Tap to upload business documents</Typography>
          <Typography variant="body-sm" className={dropzoneStyles.subText}>PNG, JPG up to 10MB</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};
