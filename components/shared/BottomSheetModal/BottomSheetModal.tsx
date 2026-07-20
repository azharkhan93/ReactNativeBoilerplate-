import React from 'react';
import { Modal } from '@/components/theme';
import { BottomSheetModalProps } from './types';
import { bottomSheetModalStyles } from './styles';

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  title,
  onClose,
  children,
  height,
  scrollable = false,
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onRequestClose={onClose}
      height={height}
      scrollable={scrollable}
      contentClassName={bottomSheetModalStyles.contentClassName}
    >
      {children}
    </Modal>
  );
};
