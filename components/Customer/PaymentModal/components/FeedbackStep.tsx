import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Typography, Button } from '@/components/theme';
import { CheckCircle, AlertCircle } from 'lucide-react-native';

interface FeedbackStepProps {
  type: 'loading' | 'verifying' | 'success' | 'error';
  message?: string;
  onRetry?: () => void;
}

export const FeedbackStep: React.FC<FeedbackStepProps> = ({ type, message, onRetry }) => {
  if (type === 'loading' || type === 'verifying') {
    return (
      <View className="items-center justify-center py-12 px-6">
        <ActivityIndicator size="large" color={type === 'verifying' ? '#059669' : '#3b82f6'} />
        <Typography className="text-slate-600 mt-4 font-body-semibold text-center">
          {type === 'verifying' ? 'Verifying Transaction...' : 'Fetching secure checkout...'}
        </Typography>
        {type === 'verifying' && (
          <Typography variant="body-sm" className="text-slate-400 text-center mt-2 font-body-medium">
            Contacting payment partner for signature verification. Please do not close the app.
          </Typography>
        )}
      </View>
    );
  }

  if (type === 'success') {
    return (
      <View className="items-center justify-center py-12 px-6">
        <View className="w-16 h-16 bg-emerald-100 border border-emerald-500/30 rounded-full items-center justify-center mb-4">
          <CheckCircle size={36} color="#059669" />
        </View>
        <Typography variant="h2" className="text-slate-900 font-heading-bold text-center">
          Payment Confirmed
        </Typography>
        <Typography className="text-slate-600 text-center mt-2 px-6 leading-5 font-body-medium">
          Your booking has been initialized successfully. Redirecting you to tracking...
        </Typography>
      </View>
    );
  }

  return (
    <View className="items-center justify-center p-6 bg-white border border-rose-100 rounded-3xl mt-4">
      <AlertCircle size={48} color="#ef4444" />
      <Typography variant="h3" className="text-slate-900 font-heading-bold mt-4">
        Transaction Error
      </Typography>
      <Typography className="text-slate-600 text-center mt-2 px-4 leading-5 font-body-medium">
        {message || 'An unexpected error occurred.'}
      </Typography>
      {onRetry && (
        <Button
          variant="primary"
          className="w-full mt-6 bg-rose-600 shadow-md shadow-rose-200"
          onPress={onRetry}
        >
          Retry Checkout
        </Button>
      )}
    </View>
  );
};
