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
    <View className="flex-1 px-8 justify-center bg-notch pb-12">
      {/* Top Actions Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Typography variant="subheading" className="text-slate-900 font-heading-bold text-xl">
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
      <View className="bg-white border border-slate-200/60 rounded-3xl p-8 mb-4 shadow-sm shadow-slate-100">
        {/* Full Name */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-4">
            <User size={18} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-slate-500 font-body-medium">
              Full Name
            </Typography>
            <Typography className="text-slate-800 font-body-semibold text-base mt-0.5">
              {profile.name}
            </Typography>
          </View>
        </View>

        <View className="h-[1px] bg-slate-100 w-full my-4" />

        {/* Contact Number */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-4">
            <Phone size={18} color="#16a34a" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-slate-500 font-body-medium">
              Contact Number
            </Typography>
            <Typography className="text-slate-800 font-body-semibold text-base mt-0.5">
              {profile.phone}
            </Typography>
          </View>
        </View>

        <View className="h-[1px] bg-slate-100 w-full my-4" />

        {/* Email Address */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-4">
            <Mail size={18} color="#8b5cf6" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-slate-500 font-body-medium">
              Email Address
            </Typography>
            <Typography className="text-slate-800 font-body-semibold text-base mt-0.5">
              {profile.email}
            </Typography>
          </View>
        </View>

        <View className="h-[1px] bg-slate-100 w-full my-4" />

        {/* Location */}
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-4">
            <MapPin size={18} color="#ec4899" />
          </View>
          <View className="flex-1">
            <Typography variant="body-sm" className="text-slate-500 font-body-medium">
              Location Support
            </Typography>
            <Typography className="text-slate-800 font-body-semibold text-base mt-0.5">
              {formattedLocation}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};
