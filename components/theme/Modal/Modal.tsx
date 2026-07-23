/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, Platform, Dimensions, ScrollView, TouchableWithoutFeedback, View, DimensionValue, TouchableOpacity, Keyboard } from 'react-native';
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

  return (
    <RNModal visible={visible} animationType={animationType} transparent={transparent} onRequestClose={onRequestClose} statusBarTranslucent {...props}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View className={`flex-1 bg-black/50 justify-end pt-[${insets.top}px] ${className || ''}`}>
          <TouchableWithoutFeedback>
            <View className={`bg-notch rounded-t-3xl w-full ${contentClassName || ''}`} style={contentStyle}>
           
              <View className="w-full items-center pt-3 pb-1">
                <View className="w-10 h-1.5 bg-slate-300/80 rounded-full" />
              </View>

              {(title || onRequestClose) && (
                <View className="px-6 pt-2 pb-4 border-b border-blue-200/40 flex-row items-center justify-between">
                  <Typography variant="h3" className="text-slate-900 font-heading-bold">{title || ' '}</Typography>
                  {onRequestClose ? (
                    <TouchableOpacity
                      onPress={onRequestClose}
                      className="w-8 h-8 bg-white/80 rounded-full items-center justify-center border border-slate-200/40"
                      hitSlop={10}
                    >
                      <X size={16} color="#64748b" strokeWidth={2.5} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
              {scrollable ? (
                <ScrollView
                  style={{ flex: 1 }}
                  showsVerticalScrollIndicator
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled
                 
                  contentContainerStyle={{ paddingBottom: 24 }}
                >
                  {children}
                </ScrollView>
              ) : (
                <View style={{ flex: 1 }}>{children}</View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

