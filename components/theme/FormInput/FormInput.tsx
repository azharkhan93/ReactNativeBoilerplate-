import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Typography } from '../Typography';

interface FormInputProps extends TextInputProps {
    label?: string;
    containerClassName?: string;
    inputClassName?: string;
    icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    containerClassName = '',
    inputClassName = '',
    icon,
    ...props
}) => {
    const isMultiline = props.multiline;

    return (
        <View className={`mb-6 ${containerClassName}`}>
            {label && (
                <Typography variant="body" className="mb-2 ml-1">
                    {label}
                </Typography>
            )}
            <View className={`relative flex-row items-center bg-gray-900 border border-gray-800 rounded-2xl ${inputClassName}`}>
                {icon && <View className="pl-4">{icon}</View>}
                <TextInput
                    className={`flex-1 py-4 px-4 text-white font-body ${isMultiline ? 'text-top' : ''}`}
                    placeholderTextColor="#4b5563"
                    textAlignVertical={isMultiline ? 'top' : 'center'}
                    {...props}
                />
            </View>
        </View>
    );
};
