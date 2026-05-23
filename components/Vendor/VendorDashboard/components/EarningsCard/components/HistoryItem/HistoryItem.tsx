import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/theme';
import { CreditCard, Landmark, DollarSign, Wallet } from 'lucide-react-native';
import { PaymentHistoryItem } from '../../constants';

export interface HistoryItemProps {
  item: PaymentHistoryItem;
}

const getPaymentIcon = (method: string) => {
  const lowerMethod = method.toLowerCase();
  if (
    lowerMethod.includes('visa') ||
    lowerMethod.includes('mastercard') ||
    lowerMethod.includes('apple') ||
    lowerMethod.includes('google')
  ) {
    return <CreditCard size={18} color="#3b82f6" />;
  }
  if (lowerMethod.includes('bank')) {
    return <Landmark size={18} color="#10b981" />;
  }
  if (lowerMethod.includes('cash')) {
    return <DollarSign size={18} color="#f59e0b" />;
  }
  return <Wallet size={18} color="#8b5cf6" />;
};

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const paymentIcon = getPaymentIcon(item.paymentMethod);

  return (
    <View className="flex-row items-center justify-between p-4 mb-3 bg-gray-900 border border-gray-800 rounded-2xl">
      <View className="flex-row items-center flex-1 mr-3">
        <View className="w-10 h-10 bg-gray-800/80 rounded-full items-center justify-center mr-3">
          {paymentIcon}
        </View>
        <View className="flex-1">
          <Typography className="text-white font-body-semibold">
            {item.customerName}
          </Typography>
          <Typography variant="body-sm" className="text-gray-400 mt-0.5">
            {item.serviceName}
          </Typography>
          <Typography variant="body" className="text-gray-500 mt-1">
            {item.date} • {item.time}
          </Typography>
        </View>
      </View>
      <View className="items-end">
        <Typography className="text-green-400 font-body-bold">
          +${item.amount.toFixed(2)}
        </Typography>
        <Typography variant="body" className="text-gray-500 mt-1 font-body-medium">
          {item.paymentMethod}
        </Typography>
      </View>
    </View>
  );
};
