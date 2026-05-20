import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MapPin, BadgeCheck, Pencil, Phone } from 'lucide-react-native';
import { Typography} from '../../theme';
import { ProfileAvatar } from '../ProfileAvatar';

export interface ProfileUserInfoProps {
  name: string;
  subtitle?: string;
  location?: string;
  isVerified?: boolean;
  avatarUrl?: string;
  onEditAvatar?: () => void;
  onEditProfile?: () => void;
  showEditButton?: boolean;
}

export const ProfileUserInfo: React.FC<ProfileUserInfoProps> = ({
  name,
  subtitle,
  location,
  isVerified,
  onEditAvatar,
  onEditProfile,
  showEditButton = true,
}) => (
  <View className="items-center px-5 mb-6">
    <View className="mb-4">
      <ProfileAvatar size={100} onEditPress={onEditAvatar} />
    </View>
    
    <Typography variant="h2" className="text-white text-2xl mb-1 text-center">
      {name}
    </Typography>
    
    {(subtitle || location) && (
      <View className="flex-row items-center mb-2">
        {location ? <MapPin size={14} color="#94a3b8" /> : <Phone size={14} color="#94a3b8" />}
        <Typography variant="body-sm" className="text-gray-400 ml-1">
          {location || subtitle}
        </Typography>
      </View>
    )}

    {isVerified && (
      <View className="flex-row items-center mb-6">
        <BadgeCheck size={14} color="#22c55e" />
        <Typography variant="body-sm" className="text-green-400 ml-1 font-body-medium">
          Verified Provider
        </Typography>
      </View>
    )}

    {showEditButton && onEditProfile && (
      <TouchableOpacity
        className="w-full bg-primary-600/20 py-3.5 rounded-2xl flex-row items-center justify-center border border-primary-600/30"
        activeOpacity={0.8}
        onPress={onEditProfile}
      >
        <Pencil size={16} color="#60a5fa" />
        <Typography className="text-blue-400 font-body-bold ml-2">Edit Profile</Typography>
      </TouchableOpacity>
    )}
  </View>
);
