/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Container, Typography } from '../../theme';

export interface AccountMenuItemProps {
  label: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export const AccountMenuItem: React.FC<AccountMenuItemProps> = ({
  label,
  subtitle,
  icon: Icon,
  iconColor,
  onPress,
  showChevron = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="py-4 px-1"
    >
      <Container variant="between" className="items-center">
        <Container variant="row" gap={4} className="items-center flex-1">
          <Container
            variant="centered"
            className="rounded-xl"
            style={{
              width: 44,
              height: 44,
              backgroundColor: `${iconColor}15`,
            }}
          >
            <Icon size={20} color={iconColor} />
          </Container>
          <Container variant="column" className="flex-1">
            <Typography variant="body" className="font-body-semibold text-slate-800">
              {label}
            </Typography>
            {subtitle ? (
              <Typography variant="body-sm" className="text-gray-500 mt-0.5">
                {subtitle}
              </Typography>
            ) : null}
          </Container>
        </Container>
        {showChevron && <ChevronRight size={18} color="#4b5563" />}
      </Container>
    </TouchableOpacity>
  );
};
