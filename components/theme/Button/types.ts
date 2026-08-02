import { TouchableOpacityProps } from 'react-native';

export type ButtonVariant = 'primary' | 'outlined' | 'disabled';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: React.ReactNode;
  readonly loading?: boolean;
  readonly className?: string;
}
