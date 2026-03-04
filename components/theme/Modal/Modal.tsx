import React from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, Platform, Dimensions, ScrollView, TouchableWithoutFeedback, View, DimensionValue, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { Typography } from '../Typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ModalProps extends RNModalProps {
  title?: string;
  className?: string;
  contentClassName?: string;
  height?: DimensionValue;
  scrollable?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible, title, children, className, contentClassName, height, scrollable = true,
  animationType = 'slide', transparent = true, onRequestClose, ...props
}) => {
  const insets = useSafeAreaInsets();

  const contentStyle = {
    height: height || undefined,
    maxHeight: SCREEN_HEIGHT * 0.9,
    minHeight: height ? undefined : 200,
    paddingBottom: insets.bottom + (height ? 10 : 20),
    ...Platform.select({
      ios: { shadowColor: '#3b82f6', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 12 },
      android: { elevation: 8, shadowColor: '#3b82f6' }
    })
  };

  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <RNModal visible={visible} animationType={animationType} transparent={transparent} onRequestClose={onRequestClose} statusBarTranslucent {...props}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View className={`flex-1 bg-black/50 justify-end pt-[${insets.top}px] ${className || ''}`}>
          <TouchableWithoutFeedback>
            <View className={`bg-gray-950 rounded-t-3xl w-full ${contentClassName || ''}`} style={contentStyle}>
              {(title || onRequestClose) && (
                <View className="px-6 py-4 border-b border-gray-800 flex-row items-center justify-between">
                  <Typography variant="h3" className="text-white">{title || ' '}</Typography>
                  {onRequestClose ? (
                    <TouchableOpacity onPress={onRequestClose} className="p-1 -mr-1" hitSlop={10}>
                      <X size={20} color="#FFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                  ): null}
                </View>
              )}
              <ContentWrapper className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}>
                {children}
              </ContentWrapper>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

