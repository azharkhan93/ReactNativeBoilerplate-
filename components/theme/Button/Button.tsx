import React, { useState, useCallback } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  LayoutChangeEvent,
} from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { PolygonBackground } from './components/PolygonBackground';
import { buttonStyles, indicatorColors } from './styles';
import { ButtonProps } from './types';

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

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
  const isDisabled = Boolean(disabled || variant === 'disabled' || loading);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }, []);

  const cleanClassName = className
    ? className
        .split(' ')
        .filter((c) => !c.startsWith('shadow') && c !== 'shadow')
        .join(' ')
    : '';

  const typographyVariant = size === 'lg' ? 'body' : 'body-sm';

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onLayout={handleLayout}
      activeOpacity={isDisabled ? 1 : activeOpacity}
      className={cn(
        buttonStyles.container,
        buttonStyles.size[size],
        isDisabled && buttonStyles.disabled,
        cleanClassName
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
          variant={typographyVariant}
          className={cn(buttonStyles.variantText[variant], buttonStyles.text)}
        >
          {children}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
