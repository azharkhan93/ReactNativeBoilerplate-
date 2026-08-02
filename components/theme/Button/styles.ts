import { ButtonSize, ButtonVariant } from './types';

export const buttonStyles = {
  container: 'relative items-center justify-center overflow-hidden',
  size: {
    sm: 'py-1.5 px-4 min-w-[80px]',
    md: 'py-2.5 px-6 min-w-[120px]',
    lg: 'py-4 px-8 min-w-[160px]',
  } as Record<ButtonSize, string>,
  variantText: {
    primary: 'text-white',
    outlined: 'text-primary-400',
    disabled: 'text-gray-500',
  } as Record<ButtonVariant, string>,
  text: 'font-body-semibold uppercase tracking-wider text-center',
  disabled: 'opacity-60',
};

export const indicatorColors: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  outlined: '#3b82f6',
  disabled: '#4b5563',
};
