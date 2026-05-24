import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../../../theme';

interface LocationSupportProps {
  availableAtHome: boolean;
  availableAtCenter: boolean;
  onToggleHome: () => void;
  onToggleCenter: () => void;
}

export const LocationSupport: React.FC<LocationSupportProps> = ({
  availableAtHome,
  availableAtCenter,
  onToggleHome,
  onToggleCenter,
}) => {
  return (
    <View className="mb-6">
      <Typography variant="body" className="text-gray-400 font-body-semibold mb-3 ml-1">
        Service Location Support
      </Typography>
      <View className="flex-row gap-3">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleHome}
          className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
            availableAtHome
              ? 'bg-primary-500/10 border-primary-500'
              : 'bg-gray-900 border-gray-800'
          }`}
        >
          <Typography
            className={`font-body-bold text-sm text-center ${
              availableAtHome ? 'text-primary-400' : 'text-gray-400'
            }`}
          >
            Home / Doorstep
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleCenter}
          className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
            availableAtCenter
              ? 'bg-primary-500/10 border-primary-500'
              : 'bg-gray-900 border-gray-800'
          }`}
        >
          <Typography
            className={`font-body-bold text-sm text-center ${
              availableAtCenter ? 'text-primary-400' : 'text-gray-400'
            }`}
          >
            Center / Workshop
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};
