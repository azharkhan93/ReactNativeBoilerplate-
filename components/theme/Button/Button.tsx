import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../Typography';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className,
  disabled,
  activeOpacity = 0.8,
  ...props
}) => {
  const isDisabled = disabled || variant === 'disabled' || loading;

  // Size styles
  const sizeStyles = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
  };

  // Variant styles - clean design without border effects
  const variantContainerStyles = {
    primary: 'bg-purple-500 rounded-full',
    secondary: 'bg-secondary-500 rounded-full',
    disabled: 'bg-gray-300 rounded-full',
  };

  const variantTextStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    disabled: 'text-gray-500',
  };

  const indicatorColors = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    disabled: '#9CA3AF',
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : activeOpacity}
      className={cn(
        'flex-row items-center justify-center rounded-full',
        sizeStyles[size],
        variantContainerStyles[variant],
        isDisabled && 'opacity-60',
        className
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={indicatorColors[variant]}
        />
      ) : (
        <Typography
          variant={size === 'lg' ? 'body-lg' : size === 'sm' ? 'body-sm' : 'body'}
          className={cn(
            variantTextStyles[variant],
            'font-body-semibold'
          )}
        >
          {children}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
