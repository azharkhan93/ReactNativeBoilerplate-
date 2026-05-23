import React from 'react';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { HistoryList } from '../HistoryList';

export interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ visible, onClose }) => {
  return (
    <BottomSheetModal
      visible={visible}
      title="Earnings History"
      onClose={onClose}
      height="80%"
      scrollable={true}
    >
      <HistoryList />
    </BottomSheetModal>
  );
};
