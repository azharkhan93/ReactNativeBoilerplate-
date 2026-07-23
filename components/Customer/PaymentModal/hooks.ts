import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_CUSTOMER_PROFILE, UPSERT_CUSTOMER_PROFILE } from '../customerQueries';
import { CREATE_PAYMENT, VERIFY_PAYMENT_SUCCESS } from '../paymentQueries';
import { getUserId, getAuthPhone } from '@/utils/store/authStore';
import { hmacSha256 } from '@/utils/cryptoHelper';

import { MOCK_PAYMENT_SECRET, RAZORPAY_CONFIG, DEFAULT_PROFILE_DEFAULTS } from './constants';
import { CheckoutStep, UsePaymentResult } from './types';

let RazorpayCheckout: any = null;
try {
  RazorpayCheckout = require('react-native-razorpay').default;
} catch {}

interface RazorpaySdkResponse {
  razorpay_order_id?: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface UsePaymentParams {
  visible: boolean;
  amount: number;
  washType: string;
  vehicleCategory: string;
  onPaymentSuccess: () => void;
  onClose: () => void;
}

const parseErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  return 'An unexpected error occurred.';
};

export const usePayment = ({
  visible,
  amount,
  washType,
  vehicleCategory,
  onPaymentSuccess,
  onClose,
}: UsePaymentParams): UsePaymentResult => {
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState<CheckoutStep>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Personal user profile state (required for Razorpay invoice logging)
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePhone, setProfilePhone] = useState<string>(DEFAULT_PROFILE_DEFAULTS.phone);
  const [profileLocation, setProfileLocation] = useState<string>(DEFAULT_PROFILE_DEFAULTS.location);
  const [profileFormError, setProfileFormError] = useState('');

  // Sandbox transaction state
  const [razorpayOrderId, setRazorpayOrderId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');

  // Verify session credentials
  useEffect(() => {
    if (!visible) return;

    getAuthPhone().then(phone => {
      if (phone) {
        setProfilePhone(phone);
      }
    });

    setStep('loading');
    getUserId()
      .then(id => {
        if (id) {
          setUserId(id);
        } else {
          setErrorMessage('User session not found. Please log in.');
          setStep('error');
        }
      })
      .catch((err) => {
        setErrorMessage(parseErrorMessage(err));
        setStep('error');
      });
  }, [visible]);

  // Query Customer profile details
  const {
    data: profileData,
    loading: loadingProfile,
    refetch: refetchProfile,
  } = useQuery(GET_CUSTOMER_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId || !visible,
    fetchPolicy: 'network-only',
  });

  const [upsertProfile, { loading: savingProfile }] = useMutation(
    UPSERT_CUSTOMER_PROFILE,
  );
  const [createPayment, { loading: creatingPayment }] = useMutation(
    CREATE_PAYMENT,
  );
  const [verifyPaymentSuccess] = useMutation(VERIFY_PAYMENT_SUCCESS);

  const customerProfile = profileData?.getCustomerProfile ?? null;

  // Sync component flow state depending on profile existence
  useEffect(() => {
    if (visible && !loadingProfile && userId) {
      setStep(customerProfile ? 'summary' : 'profile_setup');
    }
  }, [visible, loadingProfile, customerProfile, userId]);

  // Handle customer profile verification / initialization
  const handleCreateProfile = useCallback(async () => {
    if (!profileName.trim() || !profileEmail.trim()) {
      setProfileFormError('Please fill out all required fields.');
      return;
    }
    setProfileFormError('');

    try {
      await upsertProfile({
        variables: {
          input: {
            name: profileName,
            phone: profilePhone,
            email: profileEmail,
            location: profileLocation,
          },
        },
      });
      await refetchProfile();
      setStep('summary');
    } catch (err) {
      setProfileFormError(parseErrorMessage(err));
    }
  }, [
    profileName,
    profilePhone,
    profileEmail,
    profileLocation,
    upsertProfile,
    refetchProfile,
  ]);

  // Verify signature cryptographic integrity on the backend
  const handlePaymentVerification = useCallback(
    async (orderId: string, paymentId: string, signature: string) => {
      setStep('verifying');
      try {
        const { data } = await verifyPaymentSuccess({
          variables: {
            input: {
              razorpayOrderId: orderId,
              razorpayPaymentId: paymentId,
              razorpaySignature: signature,
            },
          },
        });

        if (data?.verifyPaymentSuccess?.status === 'SUCCESS') {
          setStep('success');
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
          }, 2200);
        } else {
          setErrorMessage('Payment verification returned unsuccessful state.');
          setStep('error');
        }
      } catch (err) {
        setErrorMessage(parseErrorMessage(err));
        setStep('error');
      }
    },
    [verifyPaymentSuccess, onPaymentSuccess, onClose],
  );

  // Connect to Razorpay API (Create Order)
  const handleInitiatePayment = useCallback(async () => {
    if (!customerProfile?.id) {
      setErrorMessage('Customer profile missing.');
      setStep('error');
      return;
    }

    try {
      const { data } = await createPayment({
        variables: {
          input: {
            customerProfileId: customerProfile.id,
            amount,
          },
        },
      });

      const orderId = data?.createPayment?.razorpayOrderId;
      if (!orderId) {
        setErrorMessage('Failed to initialize transaction order.');
        setStep('error');
        return;
      }

      setRazorpayOrderId(orderId);

      // Invoke Razorpay Native SDK if installed, otherwise fall back to mock checkout
      if (RazorpayCheckout) {
        setStep('verifying');
        
        const options = {
          description: `${washType} - ${vehicleCategory}`,
          image: RAZORPAY_CONFIG.imageUri,
          currency: RAZORPAY_CONFIG.currency,
          key: RAZORPAY_CONFIG.key,
          amount: Math.round(amount * 100),
          name: 'tab2wash',
          order_id: orderId,
          prefill: {
            email: customerProfile.email || '',
            contact: customerProfile.phone || '',
            name: customerProfile.name || '',
          },
          theme: { color: RAZORPAY_CONFIG.themeColor },
        };

        RazorpayCheckout.open(options)
          .then(async (sdkResponse: RazorpaySdkResponse) => {
            await handlePaymentVerification(
              sdkResponse.razorpay_order_id || orderId,
              sdkResponse.razorpay_payment_id,
              sdkResponse.razorpay_signature,
            );
          })
          .catch((sdkError: { description?: string }) => {
            setErrorMessage(
              sdkError.description || 'Payment cancelled or failed.',
            );
            setStep('error');
          });
      } else {
        setStep('razorpay_sheet');
      }
    } catch (err) {
      setErrorMessage(parseErrorMessage(err));
      setStep('error');
    }
  }, [
    customerProfile,
    amount,
    washType,
    vehicleCategory,
    createPayment,
    handlePaymentVerification,
  ]);

  // Mock verify signature helper (Calculates test HMAC signature using SHA256)
  const handleSimulatePaymentSuccess = useCallback(async () => {
    const mockPaymentId = `pay_mock_${Math.random()
      .toString(36)
      .substring(2, 11)}`;
    const signature = hmacSha256(
      `${razorpayOrderId}|${mockPaymentId}`,
      MOCK_PAYMENT_SECRET,
    );
    await handlePaymentVerification(razorpayOrderId, mockPaymentId, signature);
  }, [razorpayOrderId, handlePaymentVerification]);

  const handleCancelPayment = useCallback(() => {
    setErrorMessage('Payment was cancelled by user.');
    setStep('error');
  }, []);

  const handleRetry = useCallback(() => {
    setStep(customerProfile ? 'summary' : 'profile_setup');
  }, [customerProfile]);

  return {
    step,
    setStep,
    errorMessage,
    setErrorMessage,
    profileName,
    setProfileName,
    profileEmail,
    setProfileEmail,
    profilePhone,
    setProfilePhone,
    profileLocation,
    setProfileLocation,
    profileFormError,
    razorpayOrderId,
    paymentMethod,
    setPaymentMethod,
    loadingProfile,
    savingProfile,
    creatingPayment,
    customerProfile,
    handleCreateProfile,
    handleInitiatePayment,
    handleSimulatePaymentSuccess,
    handleCancelPayment,
    handleRetry,
  };
};
