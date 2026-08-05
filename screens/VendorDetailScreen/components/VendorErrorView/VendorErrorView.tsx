import React from 'react';
import { View } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import { Typography } from '@/components/theme/Typography';
import { Button } from '@/components/theme/Button';
import { VendorErrorViewProps } from './types';
import { vendorErrorViewStyles } from './styles';

export const VendorErrorView: React.FC<VendorErrorViewProps> = React.memo(
  ({ onBackToHome }) => {
    return (
      <View className={vendorErrorViewStyles.container}>
        <ShieldAlert size={48} color="#ef4444" />
        <Typography variant="h3" className={vendorErrorViewStyles.title}>
          Failed to load vendor details
        </Typography>
        <Typography variant="body" className={vendorErrorViewStyles.subtitle}>
          The requested provider profile could not be retrieved at this time.
        </Typography>
        <Button
          variant="outlined"
          onPress={onBackToHome}
          className={vendorErrorViewStyles.button}
        >
          Back to Home
        </Button>
      </View>
    );
  },
);
