import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { Typography } from '@/components/theme';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../StatusBadge';
import { MOCK_RECENT_ACTIVITY } from '@/utils/constants';

export const RecentActivitySection: React.FC = () => (
  <View className="mt-4 mb-6">
    <Typography
      variant="body"
      className="text-slate-500 font-body-bold text-[11px] tracking-[2px] uppercase mb-4"
    >
      Recent Activity
    </Typography>
    {MOCK_RECENT_ACTIVITY.map(item => (
      <View
        key={item.id}
        className="bg-white rounded-2xl px-5 py-4 mb-3 border border-slate-200"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-3">
            <Avatar name={item.customerName} size={40} />
            <View className="ml-3 flex-1">
              <Typography className="text-slate-900 font-body-bold text-[15px]">
                {item.customerName}
              </Typography>
              <Typography className="text-slate-500 font-body-bold text-[11px] tracking-widest mt-0.5">
                {item.serviceName}
              </Typography>
            </View>
          </View>
          <StatusBadge status={item.status} />
        </View>
        <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-slate-100">
          <Typography className="text-slate-400 text-sm">
            {item.subtitle}
          </Typography>
          {item.rating ? (
            <View className="flex-row items-center">
              <Star size={13} color="#f59e0b" fill="#f59e0b" />
              <Typography className="text-slate-600 text-sm ml-1">
                {item.rating.toFixed(1)}
              </Typography>
            </View>
          ) : (
            <TouchableOpacity>
              <Typography className="text-primary-400 font-body-semibold text-sm">
                View Details
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </View>
    ))}
  </View>
);
