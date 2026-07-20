import React from 'react';
import { Switch } from 'react-native';
import { ToggleSwitchProps } from './types';
import { toggleSwitchStyles } from './styles';

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    trackColor={{
      false: toggleSwitchStyles.inactiveTrackColor,
      true: toggleSwitchStyles.activeTrackColor,
    }}
    thumbColor={toggleSwitchStyles.thumbColor}
    ios_backgroundColor={toggleSwitchStyles.iosBackgroundColor}
  />
);
