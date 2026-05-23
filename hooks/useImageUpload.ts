import { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadAssetToCloudinary } from '@/utils/uploadHelper';

export interface UseImageUploadOptions {
  fileName?: string;
  fileType?: string;
  onSuccess?: (url: string) => void;
}

export const useImageUpload = (options?: UseImageUploadOptions) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const triggerUpload = useCallback(async () => {
    setError(null);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setUploading(true);
        const response = await uploadAssetToCloudinary(
          uri,
          options?.fileName || 'uploaded_image.jpg',
          options?.fileType || 'image/jpeg',
        );
        
        if (options?.onSuccess) {
          options.onSuccess(response.url);
        }
        return response.url;
      }
    } catch (err) {
      const uploadError = err instanceof Error ? err : new Error('Image upload failed');
      setError(uploadError);
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
    return null;
  }, [options]);

  return {
    triggerUpload,
    uploading,
    error,
  };
};
