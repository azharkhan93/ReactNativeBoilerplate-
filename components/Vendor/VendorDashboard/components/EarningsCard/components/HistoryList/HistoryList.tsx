import React from 'react';
import { View } from 'react-native';
import { MOCK_PAYMENT_HISTORY } from '../../constants';
import { HistoryItem } from '../HistoryItem';

export const HistoryList: React.FC = () => {
  return (
    <View className="px-5 pt-2">
      {MOCK_PAYMENT_HISTORY.map(item => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </View>
  );
};
