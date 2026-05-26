import React from 'react';
import { View } from 'react-native';
import { Star, MapPin, Clock } from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';

export interface VendorInfoProps {
  businessName: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  serviceRadius?: string | null;
  operatingHours?: string | null;
}

export const VendorInfo: React.FC<VendorInfoProps> = ({
  businessName,
  startingPrice,
  rating,
  reviewCount,
  serviceRadius,
  operatingHours,
}) => {
  return (
    <View className="flex-col">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-4">
          <Typography
            variant="h2"
            className="text-slate-900 font-heading-bold leading-tight"
          >
            {businessName}
          </Typography>
        </View>
        <View className="items-end">
          <Typography
            variant="body-sm"
            className="text-slate-500 uppercase tracking-widest font-body-semibold text-[10px]"
          >
            Starting from
          </Typography>
          <Typography
            variant="h3"
            className="text-primary-600 font-heading-bold"
          >
            ₹{startingPrice}
          </Typography>
        </View>
      </View>

      <View className="flex-row items-center flex-wrap gap-x-4 gap-y-2 mt-4 py-3 border-y border-blue-200/30">
        <View className="flex-row items-center">
          <Star size={14} color="#FBBF24" fill="#FBBF24" />
          <Typography
            variant="body-sm"
            className="text-slate-900 ml-1 font-body-semibold"
          >
            {rating.toFixed(1)}
          </Typography>
          <Typography
            variant="body-sm"
            className="text-slate-500 ml-1 font-body"
          >
            ({reviewCount} reviews)
          </Typography>
        </View>
        <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        {serviceRadius && (
          <View className="flex-row items-center">
            <MapPin size={13} color="#3b82f6" />
            <Typography
              variant="body-sm"
              className="text-slate-700 ml-1 font-body-medium"
            >
              {serviceRadius} radius
            </Typography>
          </View>
        )}
        {operatingHours && (
          <View className="flex-row items-center">
            <View className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-2" />
            <View className="flex-row items-center">
              <Clock size={13} color="#16a34a" />
              <Typography
                variant="body-sm"
                className="text-slate-700 ml-1 font-body-medium"
                numberOfLines={1}
              >
                {operatingHours}
              </Typography>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
