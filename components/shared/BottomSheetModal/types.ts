import React from 'react';
import { DimensionValue } from 'react-native';

export interface BottomSheetModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  height?: DimensionValue;
  scrollable?: boolean;
}
