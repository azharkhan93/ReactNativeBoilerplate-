import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/theme';
import { Pencil, Trash2 } from 'lucide-react-native';
import { CARD_STYLE } from '../../constants';
import { BreakTime } from '../../types/types';

interface BreakItemCardProps {
  breakItem: BreakTime;
  onEdit: () => void;
  onRemove: () => void;
}

export const BreakItemCard: React.FC<BreakItemCardProps> = ({
  breakItem,
  onEdit,
  onRemove,
}) => (
  <View
    className={`${CARD_STYLE} flex-row items-center justify-between border border-slate-200 rounded-3xl p-5 mb-3 bg-white`}
  >
    <View className="flex-1 mr-4">
      <Typography className="text-slate-900 font-body-bold text-sm">
        {breakItem.label}
      </Typography>
      <Typography className="text-slate-500 text-[12px] mt-0.5 font-body-semibold uppercase tracking-wider">
        {breakItem.time} • {breakItem.repeat}
      </Typography>
    </View>
    <View className="flex-row items-center gap-2">
      <TouchableOpacity
        onPress={onEdit}
        className="w-8 h-8 bg-[#F1F6FD] rounded-xl items-center justify-center border border-slate-200"
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
