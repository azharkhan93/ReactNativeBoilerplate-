import React from 'react';
import { View } from 'react-native';
import { Typography, FormInput } from '../../../../theme';

interface PricingMatrixProps {
  hatchbackPrice: string;
  sedanPrice: string;
  suvPrice: string;
  luxuryPrice: string;
  onChangePrice: (category: 'hatchback' | 'sedan' | 'suv' | 'luxury', value: string) => void;
}

export const PricingMatrix: React.FC<PricingMatrixProps> = ({
  hatchbackPrice,
  sedanPrice,
  suvPrice,
  luxuryPrice,
  onChangePrice,
}) => {
  return (
    <View className="mb-6">
      <Typography variant="body" className="text-gray-400 font-body-semibold mb-1 ml-1">
        Vehicle Category Pricing Matrix
      </Typography>
      <Typography variant="body-sm" className="text-gray-500 mb-4 ml-1">
        Set specific pricing for each car size (leave blank if unsupported)
      </Typography>
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <FormInput
            label="Hatchback Price (₹)"
            placeholder="e.g. 299"
            keyboardType="numeric"
            value={hatchbackPrice}
            onChangeText={(text: string) => onChangePrice('hatchback', text)}
          />
        </View>
        <View className="flex-1">
          <FormInput
            label="Sedan Price (₹)"
            placeholder="e.g. 399"
            keyboardType="numeric"
            value={sedanPrice}
            onChangeText={(text: string) => onChangePrice('sedan', text)}
          />
        </View>
      </View>
      <View className="flex-row gap-4">
        <View className="flex-1">
          <FormInput
            label="SUV Price (₹)"
            placeholder="e.g. 499"
            keyboardType="numeric"
            value={suvPrice}
            onChangeText={(text: string) => onChangePrice('suv', text)}
          />
        </View>
        <View className="flex-1">
          <FormInput
            label="Luxury Price (₹)"
            placeholder="e.g. 699"
            keyboardType="numeric"
            value={luxuryPrice}
            onChangeText={(text: string) => onChangePrice('luxury', text)}
          />
        </View>
      </View>
    </View>
  );
};
