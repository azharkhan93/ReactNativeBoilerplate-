import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/theme';
import { Pencil, Trash2 } from 'lucide-react-native';
import { CARD_STYLE } from '../../constants';
import { AvailabilityException } from '../../types/types';

interface ExceptionItemCardProps {
  exception: AvailabilityException;
  onEdit: () => void;
  onRemove: () => void;
}

export const ExceptionItemCard: React.FC<ExceptionItemCardProps> = ({
  exception,
  onEdit,
  onRemove,
}) => (
  <View
    className={`${CARD_STYLE} flex-row items-center justify-between border border-gray-800 rounded-3xl p-4 mb-3 bg-gray-900/60`}
  >
    <View className="flex-row items-center flex-1">
      <View className="bg-primary-500/10 border border-primary-500/25 rounded-2xl px-3 py-2 items-center mr-4 min-w-[52px]">
        <Typography className="text-primary-400 text-[10px] font-body-bold tracking-wider uppercase">
          {exception.month}
        </Typography>
        <Typography className="text-white text-base font-heading-bold leading-5">
          {exception.day}
        </Typography>
      </View>
      <View className="flex-1 mr-2">
        <Typography className="text-white font-body-bold text-sm" numberOfLines={1}>
          {exception.label}
        </Typography>
        <View
          className={`self-start mt-1.5 px-2 py-0.5 rounded-full ${
            exception.type === 'blocked'
              ? 'bg-red-500/10 border border-red-500/20'
              : 'bg-amber-500/10 border border-amber-500/20'
          }`}
        >
          <Typography
            className={`text-[9px] font-body-bold tracking-widest uppercase ${
              exception.type === 'blocked' ? 'text-red-400' : 'text-amber-400'
            }`}
          >
            {exception.type === 'blocked' ? 'Blocked Out' : 'Shortened Hours'}
          </Typography>
        </View>
      </View>
    </View>
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
