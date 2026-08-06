import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { VendorItem, VendorSearchResultsOverlayProps } from './types';
import { vendorSearchResultsStyles } from './styles';

const VendorSearchResultItem: React.FC<{
  item: VendorItem;
  onPress: (id: string) => void;
}> = React.memo(({ item, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [item.id, onPress]);

  return (
    <TouchableOpacity
      className={vendorSearchResultsStyles.itemContainer}
      onPress={handlePress}
    >
      <Text className={vendorSearchResultsStyles.itemText}>
        {item.businessName}
      </Text>
    </TouchableOpacity>
  );
});

export const VendorSearchResultsOverlay: React.FC<VendorSearchResultsOverlayProps> = React.memo(
  ({ vendors, onSelectVendor }) => {
    if (vendors.length === 0) return null;

    return (
      <View className={vendorSearchResultsStyles.overlay}>
        {vendors.map(v => (
          <VendorSearchResultItem
            key={v.id}
            item={v}
            onPress={onSelectVendor}
          />
        ))}
      </View>
    );
  },
);
