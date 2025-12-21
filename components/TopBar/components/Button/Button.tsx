import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className,
  textClassName,
}: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-lg items-center justify-center min-h-[48px]';
  
  const variantStyles = {
    primary: 'bg-primary-500 active:bg-primary-600',
    secondary: 'bg-gray-200 active:bg-gray-300 dark:bg-gray-700 dark:active:bg-gray-600',
  };

  const textVariantStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-gray-900 dark:text-white font-semibold',
  };

  const disabledStyles = disabled || loading ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabledStyles,
        className
      )}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#ffffff' : '#000000'}
          size="small"
        />
      ) : (
        <Text
          className={cn(
            'text-body',
            textVariantStyles[variant],
            textClassName
          )}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

