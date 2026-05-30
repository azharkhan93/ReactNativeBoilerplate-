import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';

import { Typography } from '@/components/theme';

import { OtpInput } from '../../OtpInput';
import { OtpTimer } from '../../OtpTimer';

import { OtpStepProps } from './types';
import { otpStepStyles } from './styles';

export const OtpStep: React.FC<OtpStepProps> = ({
  phoneNumber,
  onBack,
  onVerify,
  onResend,
  requestingSms,
  verifyingOtp,
  otpError,
}) => (
  <>
    <TouchableOpacity onPress={onBack} className={otpStepStyles.backButton}>
      <ArrowLeft size={20} color="#64748b" />
      <Typography variant="body" className={otpStepStyles.backText}>
        Back
      </Typography>
    </TouchableOpacity>

    <View className={otpStepStyles.iconContainer}>
      <ShieldCheck size={32} color="#3b82f6" />
    </View>

    <Typography variant="body" className={otpStepStyles.description}>
      We've sent a 6-digit verification code to{' '}
      <Typography variant="body" className={otpStepStyles.phoneNumber}>
        +91 {phoneNumber}
      </Typography>
    </Typography>

    <OtpInput length={6} onFullEntry={onVerify} />

    {otpError && (
      <Typography variant="body" className={otpStepStyles.errorMessage}>
        Invalid OTP code. Please check and try again.
      </Typography>
    )}

    <OtpTimer initialSeconds={120} />

    {verifyingOtp && (
      <Typography variant="body" className={otpStepStyles.verifyingText}>
        Verifying...
      </Typography>
    )}

    <View className={otpStepStyles.footerContainer}>
      <Typography variant="body" className={otpStepStyles.footerText}>
        Didn't receive a code?
      </Typography>
      <TouchableOpacity onPress={onResend} disabled={requestingSms}>
        <Typography variant="body" className={otpStepStyles.resendText}>
          Resend
        </Typography>
      </TouchableOpacity>
    </View>
  </>
);
