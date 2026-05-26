import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Typography } from '../../theme';
import { Upload, X } from 'lucide-react-native';

interface DropzoneProps {
  label?: string;
  onUpload: () => void;
  imageUri?: string | null;
  onRemove?: () => void;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  label,
  onUpload,
  imageUri,
  onRemove,
  className = '',
}) => {
  return (
    <View className={`mb-6 ${className}`}>
      {label && (
        <Typography variant="body" className="mb-2 ml-1">
          {label}
        </Typography>
      )}
      
      {imageUri ? (
        <View className="relative w-full h-48 rounded-3xl overflow-hidden border border-slate-200">
          <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
          <TouchableOpacity 
            onPress={onRemove}
            className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full items-center justify-center border border-white/20"
          >
            <X size={16} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onUpload}
          className="w-full h-48 rounded-3xl border-2 border-dashed border-slate-200 bg-white items-center justify-center shadow-sm shadow-slate-100"
        >
          <View className="w-12 h-12 bg-primary-500/10 rounded-full items-center justify-center mb-3">
            <Upload size={24} color="#3b82f6" />
          </View>
          <Typography className="text-slate-600 font-body-semibold">Tap to upload business documents</Typography>
          <Typography variant="body-sm" className="text-slate-400 mt-1">PNG, JPG up to 10MB</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};
