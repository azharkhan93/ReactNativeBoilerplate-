import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { User, Mail, Phone, MapPin, Trash2, Edit } from 'lucide-react-native';
import { Typography} from '../../theme';

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
  // Memoized formatted location to avoid inline evaluation
  const formattedLocation = useMemo(() => (
    profile.location || 'Not Configured'
  ), [profile.location]);

  return (
    <View className="px-5 pt-2 pb-8 bg-gray-950">
      {/* Header Info */}
      <View className="items-center mb-6 mt-2">
        <View className="w-12 h-12 bg-primary-500/10 border border-primary-500/25 rounded-full items-center justify-center mb-3">
          <User size={20} color="#3b82f6" />
        </View>
        <Typography variant="subheading" className="text-white text-center font-body-bold">
          Account Profile Details
        </Typography>
        <Typography variant="body-sm" className="text-gray-400 text-center px-4 mt-1 leading-5">
          These details are used to customize your car wash bookings and delivery notifications.
        </Typography>
      </View>

      {/* Info Card Container */}
      <View className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-6 shadow-2xl gap-5">
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

      {/* Actions */}
      <View className="flex-row gap-4">
        {/* Edit Button */}
        <TouchableOpacity
          onPress={onEdit}
          disabled={deleting}
          activeOpacity={0.7}
          className="flex-1 py-4 bg-primary-600 rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary-600/20"
        >
          <Edit size={16} color="#ffffff" />
          <Typography className="text-white font-body-bold ml-2">
            Edit Details
          </Typography>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={onDelete}
          disabled={deleting}
          activeOpacity={0.7}
          className="flex-1 py-4 bg-red-950/40 border border-red-900/30 rounded-2xl flex-row items-center justify-center"
        >
          <Trash2 size={16} color="#ef4444" />
          <Typography className="text-red-500 font-body-bold ml-2">
            {deleting ? 'Deleting...' : 'Delete Profile'}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};
