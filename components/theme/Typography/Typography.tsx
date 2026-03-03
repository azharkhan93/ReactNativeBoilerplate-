import React from 'react';
import { Text, TextProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'subheading' | 'body' | 'body-sm' | 'body-lg';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  className,
  children,
  style,
  ...props
}) => {

  // Use Tailwind classes from tailwind.config.js - single source of truth
  // Colors intentionally omitted to allow full className override control
  const variantStyles = {
    h1: 'text-h1 font-heading',
    h2: 'text-h2 font-heading',
    h3: 'text-h3 font-heading-semibold',
    subheading: 'text-subheading font-subheading',
    body: 'text-body font-body text-white',
    'body-sm': 'text-body-sm font-body',
    'body-lg': 'text-body-lg font-body',
  };

  return (
    <Text
      className={cn(variantStyles[variant], className)}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};
