import React from 'react';
import { Switch } from 'react-native';

export interface ToggleSwitchProps {
    value: boolean;
    onValueChange: (v: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => (
    <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#374151', true: '#3b82f6' }}
        thumbColor="white"
        ios_backgroundColor="#374151"
    />
);
