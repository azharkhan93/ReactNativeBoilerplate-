import React from 'react';
import { View, Keyboard, StyleSheet, ViewProps } from 'react-native';

interface KeyboardDismissViewProps extends ViewProps {
  children: React.ReactNode;
}

export const KeyboardDismissView: React.FC<KeyboardDismissViewProps> = ({
  children,
  style,
  ...props
}) => {
  const handleStartShouldSetResponder = React.useCallback(() => {
    Keyboard.dismiss();
    return false; 
  }, []);

  return (
    <View
      style={[styles.container, style]}
      onStartShouldSetResponder={handleStartShouldSetResponder}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
