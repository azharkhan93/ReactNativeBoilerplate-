import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Typography } from '../Typography';

interface FormInputProps extends TextInputProps {
    label: string;
    containerClassName?: string;
    inputClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    containerClassName = '',
    inputClassName = '',
    ...props
}) => {
    const isMultiline = props.multiline;

    return (
        <View className={`mb-6 ${containerClassName}`}>
            <Typography variant="body" className="mb-2 ml-1">
                {label}
            </Typography>
            <View className={`relative flex-row ${isMultiline ? 'items-start' : 'items-center'}`}>
                <TextInput
                    className={`flex-1 bg-gray-900 border border-gray-800 rounded-2xl py-4 px-4 text-white font-body ${inputClassName}`}
                    placeholderTextColor="#4b5563"
                    textAlignVertical={isMultiline ? 'top' : 'center'}
                    {...props}
                />
            </View>
        </View>
    );
};
