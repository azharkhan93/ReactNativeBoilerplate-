import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LogOut, ChevronRight } from 'lucide-react-native';
import { Typography } from '../../theme';

export interface LogoutButtonProps {
  onPress: () => void | Promise<void>;
  loading?: boolean;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onPress,
  loading = false,
  className = '',
}) => {
  return (
    <View className={`px-5 mb-8 ${className}`}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={loading}
        className={`bg-red-500/10 border border-red-500/20 rounded-3xl py-4 px-5 flex-row items-center justify-between ${
          loading ? 'opacity-50' : ''
        }`}
      >
        <View className="flex-row items-center gap-4 flex-1">
          <View className="w-11 h-11 rounded-xl bg-red-500/20 items-center justify-center">
            <LogOut size={20} color="#f87171" />
          </View>
          <View className="flex-column flex-1">
            <Typography variant="body" className="font-body-semibold text-red-400">
              {loading ? 'Logging Out...' : 'Log Out'}
            </Typography>
            <Typography variant="body-sm" className="text-red-500/60 mt-0.5">
              Securely sign out of your account
            </Typography>
          </View>
        </View>
        <ChevronRight size={18} color="#f87171" />
      </TouchableOpacity>
    </View>
  );
};
