import React from 'react';
import { View, TextInput, TextInputProps, Platform } from 'react-native';
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

  const handleTextChange = (text: string) => {
    onChangeText?.(text, name);
  };

  return (
    <View className={`mb-5 ${containerClassName}`}>
      {label ? (
        <Typography variant="body" className="mb-2.5 ml-1 text-gray-300">
          {label}
        </Typography>
      ) : null}

      <View
        className={`w-full flex-row bg-gray-900 border rounded-2xl overflow-hidden ${
          error ? 'border-red-500' : 'border-gray-800'
        } ${isMultiline ? 'items-start' : 'items-center'} ${inputClassName}`}
        style={isMultiline ? { minHeight: 120 } : { minHeight: SINGLE_LINE_HEIGHT }}
      >
        {icon ? <View className="pl-4 justify-center self-center">{icon}</View> : null}

        {prefix ? (
          <View
            className="justify-center px-4 border-r border-gray-800"
            style={{ minHeight: isMultiline ? 120 : SINGLE_LINE_HEIGHT }}
          >
            <Typography className="text-gray-400 font-body-medium text-base leading-5">
              {prefix}
            </Typography>
          </View>
        ) : null}

        <TextInput
          className="flex-1 text-white font-body text-base"
          placeholderTextColor="#4b5563"
          multiline={isMultiline}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          onChangeText={handleTextChange}
          {...props}
          style={[
            isMultiline
              ? {
                  paddingHorizontal: 16,
                  paddingTop: 14,
                  paddingBottom: 14,
                  minHeight: 100,
                  lineHeight: 22,
                }
              : {
                  paddingHorizontal: prefix ? 12 : 16,
                  paddingVertical: Platform.OS === 'ios' ? 14 : 10,
                  minHeight: SINGLE_LINE_HEIGHT,
                  lineHeight: 22,
                  ...(Platform.OS === 'android'
                    ? { includeFontPadding: false, textAlignVertical: 'center' as const }
                    : {}),
                },
            props.style,
          ]}
        />
      </View>

      {error ? (
        <Typography variant="body-sm" className="text-red-500 mt-1.5 ml-1">
          {error}
        </Typography>
      ) : null}
    </View>
  );
};
