import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { User, Mail, Phone, MapPin, Trash2, Edit } from 'lucide-react-native';
import { Typography } from '../../theme';

interface ProfileInfo {
  name: string;
  phone: string;
  email: string;
  location?: string | null;
}

export interface CustomerProfileDetailsProps {
  profile: ProfileInfo;
  onEdit: () => void;
  onDelete: () => void;
  deleting?: boolean;
}

export const CustomerProfileDetails: React.FC<CustomerProfileDetailsProps> = ({
  profile,
  onEdit,
  onDelete,
  deleting = false,
}) => {
  const formattedLocation = useMemo(() => (
    profile.location || 'Not Configured'
  ), [profile.location]);

  return (
    <View className="px-5 pt-2 pb-8 bg-gray-950">
      {/* Top Actions Header */}
      <View className="flex-row items-center justify-between mb-8 mt-2">
        <Typography variant="subheading" className="text-white font-heading-bold text-xl">
          Profile Details
        </Typography>

        <View className="flex-row items-center gap-3">
          {/* Edit Icon Button */}
          <TouchableOpacity
            onPress={onEdit}
            disabled={deleting}
            activeOpacity={0.7}
            className="w-10 h-10 bg-primary-500/10 border border-primary-500/25 rounded-2xl items-center justify-center"
          >
            <Edit size={18} color="#3b82f6" />
          </TouchableOpacity>

          {/* Delete Icon Button */}
          <TouchableOpacity
            onPress={onDelete}
            disabled={deleting}
            activeOpacity={0.7}
            className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-2xl items-center justify-center"
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Card Container */}
      <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-4 shadow-2xl gap-5">
        {/* Full Name */}
        <View className="flex-row items-center border-b border-gray-800/50 pb-4">
          <View className="w-10 h-10 rounded-2xl bg-gray-800/50 items-center justify-center mr-4">
            <User size={18} color="#9ca3af" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-gray-500 font-body-medium">
              Full Name
            </Typography>
            <Typography className="text-white font-body-semibold text-base mt-0.5">
              {profile.name}
            </Typography>
          </View>
        </View>

        {/* Contact Number */}
        <View className="flex-row items-center border-b border-gray-800/50 pb-4">
          <View className="w-10 h-10 rounded-2xl bg-gray-800/50 items-center justify-center mr-4">
            <Phone size={18} color="#9ca3af" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-gray-500 font-body-medium">
              Contact Number
            </Typography>
            <Typography className="text-white font-body-semibold text-base mt-0.5">
              {profile.phone}
            </Typography>
          </View>
        </View>

        {/* Email Address */}
        <View className="flex-row items-center border-b border-gray-800/50 pb-4">
          <View className="w-10 h-10 rounded-2xl bg-gray-800/50 items-center justify-center mr-4">
            <Mail size={18} color="#9ca3af" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-gray-500 font-body-medium">
              Email Address
            </Typography>
            <Typography className="text-white font-body-semibold text-base mt-0.5">
              {profile.email}
            </Typography>
          </View>
        </View>

        {/* Location */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-2xl bg-gray-800/50 items-center justify-center mr-4">
            <MapPin size={18} color="#9ca3af" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-gray-500 font-body-medium">
              Location Support
            </Typography>
            <Typography className="text-white font-body-semibold text-base mt-0.5">
              {formattedLocation}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};
