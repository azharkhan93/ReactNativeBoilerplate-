import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../../../theme';
import { Home, Briefcase, Building, Pencil, Trash2 } from 'lucide-react-native';
import { AddressData } from '../../hooks/useCustomerAddresses';

interface AddressItemCardProps {
  address: AddressData;
  onEdit: () => void;
  onRemove: () => void;
}

const TYPE_ICONS = {
  home: <Home size={18} color="#3b82f6" />,
  work: <Briefcase size={18} color="#fb923c" />,
  office: <Building size={18} color="#10b981" />,
};

const TYPE_COLORS = {
  home: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  work: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
  },
  office: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
};

export const AddressItemCard: React.FC<AddressItemCardProps> = ({
  address,
  onEdit,
  onRemove,
}) => {
  const colors = TYPE_COLORS[address.type];
  return (
    <View className="bg-gray-900/60 border border-gray-800 rounded-3xl p-5 mb-4 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 mr-3">
        {/* Left Icon Container */}
        <View className="w-12 h-12 bg-gray-800 border border-gray-700/50 rounded-2xl items-center justify-center mr-4">
          {TYPE_ICONS[address.type]}
        </View>

        {/* Address text */}
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Typography className="text-white font-body-bold text-sm">
              {address.label}
            </Typography>
            <View
              className={`px-2 py-0.5 rounded-full border ${colors.bg} ${colors.border}`}
            >
              <Typography
                className={`text-[9px] font-body-bold tracking-widest uppercase ${colors.text}`}
              >
                {address.type}
              </Typography>
            </View>
          </View>
          <Typography className="text-gray-400 text-xs mt-1 leading-5">
            {address.street}, {address.city}, {address.state} {address.zipCode}
          </Typography>
        </View>
      </View>

      {/* Right Actions */}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onEdit}
          className="w-8 h-8 bg-gray-800 rounded-xl items-center justify-center border border-gray-700/50"
          activeOpacity={0.7}
        >
          <Pencil size={13} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRemove}
          className="w-8 h-8 bg-red-500/10 rounded-xl items-center justify-center border border-red-500/20"
          activeOpacity={0.7}
        >
          <Trash2 size={13} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
