import React from 'react';
import { View } from 'react-native';
import { Typography, Button } from '@/components/theme';

interface SummaryStepProps {
  vendorName: string;
  washType: string;
  vehicleCategory: string;
  bookingDate: string;
  amount: number;
  loading: boolean;
  onConfirm: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  vendorName,
  washType,
  vehicleCategory,
  bookingDate,
  amount,
  loading,
  onConfirm,
}) => {
  const formattedDate = new Date(bookingDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View className="px-5 pb-8">
      <View className="bg-white border border-slate-200/60 rounded-3xl p-5 mb-6 shadow-sm shadow-slate-50">
        <Typography variant="subheading" className="text-slate-800 font-body-bold mb-4">
          Booking Details
        </Typography>

        <View className="flex-row justify-between py-2 border-b border-slate-100">
          <Typography className="text-slate-500 font-body-semibold">Provider</Typography>
          <Typography className="text-slate-900 font-body-bold">{vendorName}</Typography>
        </View>

        <View className="flex-row justify-between py-2 border-b border-slate-100">
          <Typography className="text-slate-500 font-body-semibold">Wash Type</Typography>
          <Typography className="text-slate-900 font-body-bold">{washType}</Typography>
        </View>

        <View className="flex-row justify-between py-2 border-b border-slate-100">
          <Typography className="text-slate-500 font-body-semibold">Vehicle Class</Typography>
          <Typography className="text-slate-900 font-body-bold uppercase">{vehicleCategory}</Typography>
        </View>

        <View className="flex-row justify-between py-2">
          <Typography className="text-slate-500 font-body-semibold">Scheduled Date</Typography>
          <Typography className="text-slate-900 font-body-bold">{formattedDate}</Typography>
        </View>
      </View>

      <View className="bg-primary-50/50 border border-primary-100/50 rounded-3xl p-5 mb-6">
        <Typography variant="subheading" className="text-primary-900 font-body-bold mb-3">
          Fare Summary
        </Typography>

        <View className="flex-row justify-between mb-1.5">
          <Typography className="text-primary-800 font-body-semibold">Base Wash Cost</Typography>
          <Typography className="text-primary-900 font-body-bold">₹{amount}</Typography>
        </View>
        <View className="flex-row justify-between mb-3">
          <Typography className="text-primary-800 font-body-semibold">Convenience Fee</Typography>
          <Typography className="text-primary-900 font-body-bold">FREE</Typography>
        </View>

        <View className="border-t border-primary-200/50 pt-3 flex-row justify-between items-center">
          <Typography className="text-primary-900 font-body-bold text-lg">Total Amount</Typography>
          <Typography className="text-primary-950 font-heading-bold text-2xl">₹{amount}</Typography>
        </View>
      </View>

      <Button
        onPress={onConfirm}
        variant="primary"
        loading={loading}
        className="w-full shadow-lg shadow-primary-500/20"
      >
        Proceed to Payment
      </Button>
    </View>
  );
};
