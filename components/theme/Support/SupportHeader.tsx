import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, Info, Phone } from 'lucide-react-native';
import { Typography } from '../Typography';

export interface SupportHeaderProps {
  onBack?: () => void;
  agentName?: string;
  isOnline?: boolean;
}

export const SupportHeader: React.FC<SupportHeaderProps> = ({
  onBack,
  agentName = 'Support Agent',
  isOnline = true,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 border-b border-blue-200/50 bg-[#F1F6FD] rounded-b-2xl shadow-sm shadow-blue-100/30 z-10">
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={onBack}
          className="w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm shadow-slate-100"
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>

        <View className="ml-3">
          <Typography variant="subheading" className="font-semibold text-slate-900 text-base">
            {agentName}
          </Typography>
          <View className="flex-row items-center mt-0.5">
            <View
              className={`w-2 h-2 rounded-full mr-1.5 ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            />
            <Typography
              variant="body-sm"
              className="text-slate-500 text-xs font-medium"
            >
              {isOnline ? 'Online 24/7' : 'Offline'}
            </Typography>
          </View>
        </View>
      </View>

      <View className="flex-row items-center space-x-2 gap-2">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm shadow-slate-100"
          activeOpacity={0.7}
        >
          <Phone size={18} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm shadow-slate-100"
          activeOpacity={0.7}
        >
          <Info size={18} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


