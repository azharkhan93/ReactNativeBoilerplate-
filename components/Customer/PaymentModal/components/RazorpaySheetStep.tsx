import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography, Button } from '@/components/theme';
import { ShieldCheck, Smartphone, CreditCard, Check } from 'lucide-react-native';

interface RazorpaySheetStepProps {
  orderId: string;
  amount: number;
  paymentMethod: 'card' | 'upi';
  onChangeMethod: (method: 'card' | 'upi') => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const RazorpaySheetStep: React.FC<RazorpaySheetStepProps> = ({
  orderId,
  amount,
  paymentMethod,
  onChangeMethod,
  onSubmit,
  onCancel,
}) => {
  return (
    <View className="px-5 pb-8">
      <View className="bg-[#0b2241] rounded-3xl p-6 items-center mb-6 shadow-md">
        <ShieldCheck size={36} color="#3b82f6" />
        <Typography className="text-white font-body-bold text-lg mt-3">Razorpay Secured Checkout</Typography>
        <Typography className="text-slate-300 font-body-medium text-xs mt-1">Order ID: {orderId}</Typography>
        <Typography className="text-white font-heading-bold text-3xl mt-4">₹{amount}</Typography>
      </View>

      <Typography variant="body-sm" className="text-slate-500 font-body-bold mb-3 uppercase tracking-wider">
        Select Mock Payment Method
      </Typography>

      <View className="space-y-3 mb-6 flex-col">
        {/* UPI Option */}
        <TouchableOpacity
          onPress={() => onChangeMethod('upi')}
          activeOpacity={0.7}
          className={`p-4 rounded-2xl flex-row items-center justify-between border ${
            paymentMethod === 'upi' ? 'bg-primary-50/40 border-primary-500' : 'bg-white border-slate-200'
          }`}
        >
          <View className="flex-row items-center space-x-3.5">
            <Smartphone size={20} color={paymentMethod === 'upi' ? '#3b82f6' : '#64748b'} />
            <View className="flex-col">
              <Typography className="text-slate-900 font-body-bold">UPI / GPay / PhonePe</Typography>
              <Typography className="text-slate-500 text-xs font-body-medium">Pay instantly using simulated UPI</Typography>
            </View>
          </View>
          {paymentMethod === 'upi' ? (
            <View className="w-5 h-5 bg-primary-500 rounded-full items-center justify-center">
              <Check size={12} color="white" />
            </View>
          ) : (
            <View className="w-5 h-5 border border-slate-300 rounded-full" />
          )}
        </TouchableOpacity>

        {/* Card Option */}
        <TouchableOpacity
          onPress={() => onChangeMethod('card')}
          activeOpacity={0.7}
          className={`p-4 rounded-2xl flex-row items-center justify-between border mt-3 ${
            paymentMethod === 'card' ? 'bg-primary-50/40 border-primary-500' : 'bg-white border-slate-200'
          }`}
        >
          <View className="flex-row items-center space-x-3.5">
            <CreditCard size={20} color={paymentMethod === 'card' ? '#3b82f6' : '#64748b'} />
            <View className="flex-col">
              <Typography className="text-slate-900 font-body-bold">Credit / Debit Card</Typography>
              <Typography className="text-slate-500 text-xs font-body-medium">Visa, MasterCard, RuPay mock billing</Typography>
            </View>
          </View>
          {paymentMethod === 'card' ? (
            <View className="w-5 h-5 bg-primary-500 rounded-full items-center justify-center">
              <Check size={12} color="white" />
            </View>
          ) : (
            <View className="w-5 h-5 border border-slate-300 rounded-full" />
          )}
        </TouchableOpacity>
      </View>

      <Button onPress={onSubmit} variant="primary" className="w-full bg-emerald-600 shadow-lg shadow-emerald-600/20">
        Authorize Mock Payment
      </Button>

      <TouchableOpacity
        onPress={onCancel}
        activeOpacity={0.7}
        className="w-full py-4 mt-3 rounded-2xl items-center justify-center bg-white border border-slate-200"
      >
        <Typography className="text-slate-600 font-body-semibold">Cancel Transaction</Typography>
      </TouchableOpacity>
    </View>
  );
};
