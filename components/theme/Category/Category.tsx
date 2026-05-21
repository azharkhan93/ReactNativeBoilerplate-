import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Typography } from '../Typography';
import { Container } from '../Container';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface CategoryProps extends Omit<TouchableOpacityProps, 'children'> {
  name: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Category: React.FC<CategoryProps> = ({
  name,
  icon: IconComponent,
  variant = 'default',
  size = 'md',
  className,
  activeOpacity = 0.7,
  ...props
}) => {
  const sizeStyles = {
    sm: { iconSize: 20, container: 'py-2 px-3' },
    md: { iconSize: 24, container: 'py-3 px-4' },
    lg: { iconSize: 28, container: 'py-4 px-5' },
  };

  const variantStyles = {
    default: {
      container: 'bg-gray-900 border border-gray-800',
      icon: 'text-gray-400',
      text: 'text-gray-300',
    },
    primary: {
      container: 'bg-primary-950/40 border border-primary-500/30',
      icon: 'text-primary-400',
      text: 'text-primary-200',
    },
    secondary: {
      container: 'bg-green-950/40 border border-green-500/30',
      icon: 'text-green-400',
      text: 'text-green-200',
    },
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  const iconColor = variant === 'default' ? '#9ca3af' : variant === 'primary' ? '#FF7A51' : '#4ade80';

  return (
    <TouchableOpacity
      className={cn(
        'rounded-lg items-center justify-center',
        currentSize.container,
        currentVariant.container,
        className
      )}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Container variant="column" gap={2} className="items-center">
        <IconComponent
          size={currentSize.iconSize}
          color={iconColor}
        />
        <Typography
          variant={size === 'lg' ? 'body' : size === 'sm' ? 'body-sm' : 'body-sm'}
          className={cn(currentVariant.text, 'font-body-semibold text-center')}
        >
          {name}
        </Typography>
      </Container>
    </TouchableOpacity>
  );
};
