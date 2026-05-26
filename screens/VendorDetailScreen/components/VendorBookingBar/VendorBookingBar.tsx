import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme/Typography';
import { Button } from '@/components/theme/Button';

export interface VendorBookingBarProps {
  resolvedPrice: number;
  isSelectionComplete: boolean;
  insets: { bottom: number };
  onBookNow: () => void;
}

export const VendorBookingBar: React.FC<VendorBookingBarProps> = ({
  resolvedPrice,
  isSelectionComplete,
  insets,
  onBookNow,
}) => {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 px-5 pt-4 pb-6 flex-row items-center justify-between shadow-2xl shadow-slate-300"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <Typography variant="h2" className="text-slate-900 font-heading-bold">
        ₹{resolvedPrice}
      </Typography>
      <Button
        variant={isSelectionComplete ? 'primary' : 'disabled'}
        className="w-1/2 shadow shadow-primary-200"
        onPress={onBookNow}
      >
        {isSelectionComplete ? 'Book Now' : 'Select Options'}
      </Button>
    </View>
  );
};
