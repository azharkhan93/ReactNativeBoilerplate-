import React from 'react';
import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface ContainerProps extends ViewProps {
  variant?: 'default' | 'row' | 'column' | 'centered' | 'between' | 'column-centered' | 'column-start' | 'row-start';
  gap?: number;
  wrap?: boolean;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  variant = 'default',
  gap,
  wrap = false,
  className,
  style,
  children,
  ...props
}) => {
  // In React Native, flex-row and flex-col automatically set display: flex
  const variantStyles = {
    default: '',
    row: 'flex-row items-center',
    'row-start': 'flex-row items-start',
    column: 'flex-col',
    'column-centered': 'flex-col items-center',
    'column-start': 'flex-col items-start',
    centered: 'flex-row items-center justify-center',
    between: 'flex-row items-center justify-between',
  };

  const gapMap: Record<number, string> = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  };

  const gapStyles = gap ? gapMap[gap] || '' : '';
  const wrapStyles = wrap ? 'flex-wrap' : '';

  return (
    <View 
      className={cn(variantStyles[variant], gapStyles, wrapStyles, className)} 
      style={style}
      {...props}
    >
      {children}
    </View>
  );
};

