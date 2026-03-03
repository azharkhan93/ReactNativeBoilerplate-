import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Typography } from '../Typography';

interface FormInputProps extends TextInputProps {
    label: string;
    icon?: React.ReactNode;
    containerClassName?: string;
    inputClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    icon,
    containerClassName = '',
    inputClassName = '',
    ...props
}) => {
    return (
        <View className={containerClassName}>
            <Typography className="text-gray-400 font-body-semibold mb-2 ml-1">
                {label}
            </Typography>
            <View className="relative flex-row items-center">
                {icon && (
                    <View className="absolute left-4 z-10">
                        {icon}
                    </View>
                )}
                <TextInput
                    className={`flex-1 bg-gray-900 border border-gray-800 rounded-2xl py-4 text-white font-body ${icon ? 'pl-12 pr-4' : 'px-4'} ${inputClassName}`}
                    placeholderTextColor="#4b5563"
                    {...props}
                />
            </View>
        </View>
    );
};
