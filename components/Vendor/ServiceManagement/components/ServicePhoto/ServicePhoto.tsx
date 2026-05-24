import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Typography } from '../../../../theme';

interface ServicePhotoProps {
  imageUrl: string | null;
  uploading: boolean;
  onTriggerUpload: () => void;
}

export const ServicePhoto: React.FC<ServicePhotoProps> = ({
  imageUrl,
  uploading,
  onTriggerUpload,
}) => {
  return (
    <View className="mb-6">
      <Typography
        variant="body"
        className="text-gray-400 font-body-semibold mb-3 ml-1"
      >
        Service Photo
      </Typography>
      <View className="flex-row gap-4 items-center">
        <TouchableOpacity
          onPress={onTriggerUpload}
          disabled={uploading}
          className="w-24 h-24 bg-gray-900 rounded-2xl items-center justify-center border-2 border-dashed border-gray-800"
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#3b82f6" />
          ) : (
            <Camera size={24} color="#4b5563" />
          )}
        </TouchableOpacity>

        {imageUrl ? (
          <View className="w-24 h-24 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <Image
              source={{ uri: imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        ) : (
          <View className="w-24 h-24 bg-gray-900/50 rounded-2xl items-center justify-center border border-gray-800">
            <Typography variant="body-sm" className="text-gray-600">
              No Photo
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};
