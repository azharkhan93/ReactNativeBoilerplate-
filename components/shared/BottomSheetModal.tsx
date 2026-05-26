import React from 'react';
import {  DimensionValue } from 'react-native';

import {  Modal } from '@/components/theme';

export interface BottomSheetModalProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    height?: DimensionValue;
    scrollable?: boolean;
}


export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
    visible, title, onClose, children, height, scrollable = false,
}) => {
    return (
        <Modal
            visible={visible}
            title={title}
            onRequestClose={onClose}
            height={height}
            scrollable={scrollable}
            contentClassName="bg-notch"
        >
            {children}
        </Modal>
    );
};
