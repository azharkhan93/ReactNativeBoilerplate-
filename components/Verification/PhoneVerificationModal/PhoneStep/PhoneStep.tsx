import React from 'react';
import { View } from 'react-native';
import { Phone } from 'lucide-react-native';

import { Typography, Button, FormInput } from '@/components/theme';

import { PhoneStepProps } from './types';
import { phoneStepStyles } from './styles';

export const PhoneStep: React.FC<PhoneStepProps> = ({
  phoneNumber,
  setPhoneNumber,
  handleRequestOtp,
  requestingSms,
  phoneError,
  isValid,
  isInputLengthValid,
}) => (
  <>
    <View className={phoneStepStyles.iconContainer}>
      <Phone size={32} color="#3b82f6" />
    </View>

    <Typography variant="body" className={phoneStepStyles.description}>
      Enter your mobile number to receive a verification code.
    </Typography>

    <FormInput
      label="Mobile Number"
      placeholder="XXXXXXXXXX"
      keyboardType="phone-pad"
      value={phoneNumber}
      onChangeText={v => setPhoneNumber(v.replace(/\D/g, '').slice(0, 10))}
      maxLength={10}
      icon={
        <View className={phoneStepStyles.prefixContainer}>
          <Typography variant="body" className={phoneStepStyles.prefixText}>
            +91
          </Typography>
        </View>
      }
      containerClassName="mb-6"
    />

    {phoneError && (
      <Typography
        variant="body"
        className={phoneStepStyles.errorMessage}
      >
        Failed to send verification code. Please try again.
      </Typography>
    )}

    <Button
      onPress={handleRequestOtp}
      variant={isValid ? 'primary' : 'disabled'}
      loading={requestingSms}
      className={phoneStepStyles.button}
    >
      Get Verification Code
    </Button>

    {!isValid && isInputLengthValid && (
      <Typography
        variant="body"
        className={phoneStepStyles.warningMessage}
      >
        Please enter a valid Indian number starting with 6-9
      </Typography>
    )}
  </>
);
