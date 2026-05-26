import React from 'react';
import { View } from 'react-native';
import { MapPin, Phone } from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';

export interface VendorContactProps {
  address?: string | null;
  contactNumber?: string | null;
}

export const VendorContact: React.FC<VendorContactProps> = ({
  address,
  contactNumber,
}) => {
  return (
    <View className="mt-8 border-t border-blue-200/30 pt-6 flex-col gap-4">
      <Typography
        variant="subheading"
        className="text-slate-900 font-body-semibold"
      >
        Location & Contact
      </Typography>
      {address && (
        <View className="flex-row items-start">
          <View className="bg-white p-2 rounded-lg border border-slate-200/60 mr-3 shadow-sm shadow-slate-100">
            <MapPin size={14} color="#64748b" />
          </View>
          <View className="flex-1 justify-center">
            <Typography
              variant="body-sm"
              className="text-slate-500 text-[10px] uppercase font-body-semibold"
            >
              Address
            </Typography>
            <Typography
              variant="body"
              className="text-slate-800 mt-0.5 font-body-medium"
            >
              {address}
            </Typography>
          </View>
        </View>
      )}
      {contactNumber && (
        <View className="flex-row items-start">
          <View className="bg-white p-2 rounded-lg border border-slate-200/60 mr-3 shadow-sm shadow-slate-100">
            <Phone size={14} color="#64748b" />
          </View>
          <View className="flex-1 justify-center">
            <Typography
              variant="body-sm"
              className="text-slate-500 text-[10px] uppercase font-body-semibold"
            >
              Phone Number
            </Typography>
            <Typography
              variant="body"
              className="text-slate-800 mt-0.5 font-body-medium"
            >
              {contactNumber}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};
