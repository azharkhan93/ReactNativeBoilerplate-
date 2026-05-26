import { ViewProps } from 'react-native';

export interface HelloWorldProps extends ViewProps {
  /**
   * The main greeting title to display.
   * @default "Hello World"
   */
  title?: string;

  /**
   * The subtext or descriptive text.
   * @default "Welcome to our React Native & TypeScript application."
   */
  subtitle?: string;

  /**
   * Optional callback triggered when the greeting badge is pressed.
   * Passes the newly selected language and translation.
   */
  onGreetingPress?: (language: string, translation: string) => void;

  /**
   * Custom NativeWind classes to apply to the container.
   */
  className?: string;
}

export interface GreetingTranslation {
  language: string;
  translation: string;
  flag: string;
}
