import React, { useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View, LayoutChangeEvent } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../Typography';
import { PolygonBackground } from './PolygonBackground';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'outlined' | 'disabled';
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isDisabled = disabled || variant === 'disabled' || loading;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  // Size styles
  const sizeStyles = {
    sm: 'py-2 px-6 min-w-[100px]',
    md: 'py-3.5 px-8 min-w-[140px]',
    lg: 'py-5 px-10 min-w-[180px]',
  };

  const variantTextStyles = {
    primary: 'text-white',
    outlined: 'text-primary-400',
    disabled: 'text-gray-500',
  };

  const indicatorColors = {
    primary: '#FFFFFF',
    outlined: '#3b82f6',
    disabled: '#4b5563',
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onLayout={onLayout}
      activeOpacity={isDisabled ? 1 : activeOpacity}
      className={cn(
        'relative items-center justify-center overflow-hidden',
        sizeStyles[size],
        isDisabled && 'opacity-60',
        className
      )}
      {...props}
    >
      {dimensions.width > 0 && (
        <PolygonBackground
          variant={variant}
          width={dimensions.width}
          height={dimensions.height}
        />
      )}

      {loading ? (
        <ActivityIndicator
          size="small"
          color={indicatorColors[variant === 'disabled' ? 'disabled' : variant]}
        />
      ) : (
        <Typography
          variant={size === 'lg' ? 'body' : size === 'sm' ? 'body-sm' : 'body'}
          className={cn(
            variantTextStyles[variant],
            'font-body-semibold uppercase tracking-wider'
          )}
        >
          {children}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
