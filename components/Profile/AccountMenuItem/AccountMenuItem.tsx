import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Container, Typography } from '../../theme';

export interface AccountMenuItemProps {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  onPress?: () => void;
}

export const AccountMenuItem: React.FC<AccountMenuItemProps> = ({
  label,
  icon: Icon,
  iconColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="py-4"
    >
      <Container variant="between" className="items-center">
        <Container variant="row" gap={4} className="items-center flex-1">
          <Container
            variant="centered"
            className="rounded-full"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 40,
              height: 40,
              backgroundColor: `${iconColor}20`,
            }}
          >
            <Icon size={20} color={iconColor} />
          </Container>
          <Typography variant="body">
            {label}
          </Typography>
        </Container>
        <ChevronRight size={20} color="#9ca3af" />
      </Container>
    </TouchableOpacity>
  );
};
