import React from 'react';
import { View, TextInput, TextInputProps, Platform, StyleSheet } from 'react-native';
import { Typography } from '../Typography';

interface FormInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string;
  name?: string;
  containerClassName?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
  prefix?: string;
  error?: string;
  onChangeText?: (text: string, name?: string) => void;
}

const SINGLE_LINE_HEIGHT = 52;
const MULTI_LINE_HEIGHT = 120;

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  containerClassName = '',
  inputClassName = '',
  icon,
  prefix,
  error,
  onChangeText,
  multiline,
  ...props
}) => {
  const isMultiline = !!multiline;

  // Memoized change handler for optimal typing performance
  const handleTextChange = React.useCallback(
    (text: string) => {
      onChangeText?.(text, name);
    },
    [onChangeText, name],
  );

  // Dynamic layout boundaries extracted cleanly from presentation
  const containerStyle = isMultiline ? styles.containerMultiline : styles.containerSingleLine;
  const prefixStyle = isMultiline ? styles.prefixMultiline : styles.prefixSingleLine;

  // Memoized input style merging platform metrics cleanly
  const inputStyle = React.useMemo(() => {
    const baseStyle = isMultiline
      ? styles.inputMultiline
      : {
          ...styles.inputSingleLine,
          paddingHorizontal: prefix ? 12 : 16,
        };

    const androidStyle = Platform.OS === 'android' && !isMultiline
      ? styles.androidSingleLine
      : {};

    return [baseStyle, androidStyle, props.style];
  }, [isMultiline, prefix, props.style]);

  return (
    <View className={`mb-5 ${containerClassName}`}>
      {label && (
        <Typography variant="body" className="mb-2.5 ml-1 text-gray-300">
          {label}
        </Typography>
      )}

      <View
        className={`w-full flex-row bg-gray-900 border rounded-2xl overflow-hidden ${
          error ? 'border-red-500' : 'border-gray-800'
        } ${isMultiline ? 'items-start' : 'items-center'} ${inputClassName}`}
        style={containerStyle}
      >
        {icon && <View className="pl-4 justify-center self-center">{icon}</View>}

        {prefix && (
          <View className="justify-center px-4 border-r border-gray-800" style={prefixStyle}>
            <Typography className="text-gray-400 font-body-medium text-base leading-5">
              {prefix}
            </Typography>
          </View>
        )}

        <TextInput
          className="flex-1 text-white font-body text-base"
          placeholderTextColor="#4b5563"
          multiline={isMultiline}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          onChangeText={handleTextChange}
          {...props}
          style={inputStyle}
        />
      </View>

      {error && (
        <Typography variant="body-sm" className="text-red-500 mt-1.5 ml-1">
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerMultiline: {
    minHeight: MULTI_LINE_HEIGHT,
  },
  containerSingleLine: {
    minHeight: SINGLE_LINE_HEIGHT,
  },
  prefixMultiline: {
    minHeight: MULTI_LINE_HEIGHT,
  },
  prefixSingleLine: {
    minHeight: SINGLE_LINE_HEIGHT,
  },
  inputMultiline: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    minHeight: 100,
  },
  inputSingleLine: {
    paddingVertical: 0,
    height: '100%',
  },
  androidSingleLine: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
