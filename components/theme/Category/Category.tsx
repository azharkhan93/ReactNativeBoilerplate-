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
      container: 'bg-notch border border-blue-200/60 rounded-xl',
      icon: 'text-slate-700',
      text: 'text-slate-800',
    },
    primary: {
      container: 'bg-primary-900/10 border border-primary-500/20 rounded-xl',
      icon: 'text-primary-600',
      text: 'text-primary-800',
    },
    secondary: {
      container: 'bg-green-900/10 border border-green-500/20 rounded-xl',
      icon: 'text-green-600',
      text: 'text-green-800',
    },
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  const iconColor = variant === 'default' ? '#334155' : variant === 'primary' ? '#2563eb' : '#16a34a';

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
