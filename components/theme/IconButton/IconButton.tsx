import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface IconButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'rounded' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  activeOpacity = 0.7,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const variantStyles = {
    default: 'items-center justify-center',
    rounded: 'items-center justify-center bg-gray-100 rounded-lg',
    circular: 'items-center justify-center bg-gray-100 rounded-full',
  };

  return (
    <TouchableOpacity
      className={cn(sizeStyles[size], variantStyles[variant], className)}
      activeOpacity={activeOpacity}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

