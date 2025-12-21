import React from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from '../Container';
import { Typography } from '../Typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ModalProps extends RNModalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  className,
  contentClassName,
  animationType = 'slide',
  transparent = true,
  onRequestClose,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onRequestClose}
      statusBarTranslucent={Platform.OS === 'android'}
      {...props}
    >
      <Container
        variant="column-centered"
        className={`flex-1 bg-black/50 ${className || ''}`}
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <Container
          variant="column"
          className={`bg-white rounded-t-3xl rounded-b-lg w-full ${
            contentClassName || ''
          }`}
          style={{
            maxHeight: SCREEN_HEIGHT * 0.9,
            ...(Platform.OS === 'ios' && {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
            }),
            ...(Platform.OS === 'android' && {
              elevation: 10,
            }),
          }}
        >
          {title && (
            <Container variant="between" className="px-6 py-4 border-b border-gray-200">
              <Typography variant="h3" className="text-gray-900">
                {title}
              </Typography>
            </Container>
          )}
          <Container variant="column" className="flex-1">
            {children}
          </Container>
        </Container>
      </Container>
    </RNModal>
  );
};

