import React from 'react';
import { View } from 'react-native';
import { Container, Typography } from '../../theme';
import { AccountMenuItem } from '../AccountMenuItem';
import { AccountMenuItemData } from '../../../screens/ProfileScreen/constants';

export interface AccountOverviewSectionProps {
  items: AccountMenuItemData[];
  onItemPress?: (itemId: string) => void;
}

export const AccountOverviewSection: React.FC<AccountOverviewSectionProps> = ({
  items,
  onItemPress,
}) => {
  return (
    <Container
      className="bg-white rounded-t-3xl mt-4 px-6 pt-6 pb-4"
     
    >
      <Typography variant="h3" className="text-gray-900 font-heading-semibold mb-4">
        Account Overview
      </Typography>
      
      <View>
        {items.map((item, index) => (
          <View key={item.id}>
            <AccountMenuItem
              label={item.label}
              icon={item.icon}
              iconColor={item.iconColor}
              onPress={() => onItemPress?.(item.id)}
            />
            {index < items.length - 1 && (
              <View className="h-px " />
            )}
          </View>
        ))}
      </View>
    </Container>
  );
};
