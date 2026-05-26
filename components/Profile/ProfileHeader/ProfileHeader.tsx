import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, Settings, MoreVertical, LogOut } from 'lucide-react-native';
import { Typography } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ProfileHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onRightActionPress?: () => void;
  rightIcon?: 'settings' | 'more' | 'logout';
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  onRightActionPress,
  rightIcon = 'more',
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View
      className="bg-notch px-5 pb-4 flex-row items-center justify-between border-b border-blue-200/50 rounded-b-2xl z-50 mb-6"
      style={{ paddingTop: Math.max(insets.top, 20) + 10 }}
    >
      <View className="w-10">
        {showBackButton && (
          <TouchableOpacity 
            onPress={onBackPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200/50"
          >
            <ChevronLeft size={22} color="#475569" />
          </TouchableOpacity>
        )}
      </View>

      <Typography variant="h3" className="text-slate-900 text-lg font-heading-bold">
        {title}
      </Typography>

      <View className="w-10">
        {onRightActionPress ? (
          <TouchableOpacity 
            onPress={onRightActionPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200/50"
            activeOpacity={0.7}
          >
            {rightIcon === 'settings' ? (
              <Settings size={20} color="#475569" />
            ) : rightIcon === 'logout' ? (
              <LogOut size={18} color="#ef4444" />
            ) : (
              <MoreVertical size={20} color="#475569" />
            )}
          </TouchableOpacity>
        ): null}
      </View>
    </View>
  );
};
