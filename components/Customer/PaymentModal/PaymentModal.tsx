import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { GET_CUSTOMER_PROFILE, UPSERT_CUSTOMER_PROFILE } from '../customerQueries';
import { CREATE_PAYMENT, VERIFY_PAYMENT_SUCCESS } from '../paymentQueries';
import { getUserId } from '@/utils/store/authStore';
import { hmacSha256 } from '@/utils/cryptoHelper';

// Modular Checkout Step Components
import { FeedbackStep } from './components/FeedbackStep';
import { ProfileSetupStep } from './components/ProfileSetupStep';
import { SummaryStep } from './components/SummaryStep';
import { RazorpaySheetStep } from './components/RazorpaySheetStep';

let RazorpayCheckout: any = null;
try {
  RazorpayCheckout = require('react-native-razorpay').default;
} catch (e) {
  // Safe mock fallback for non-native development configurations
}

export interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  amount: number;
  vendorName: string;
  washType: string;
  vehicleCategory: string;
  bookingDate: string;
  onPaymentSuccess: () => void;
}

type CheckoutStep = 'loading' | 'profile_setup' | 'summary' | 'razorpay_sheet' | 'verifying' | 'success' | 'error';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  amount,
  vendorName,
  washType,
  vehicleCategory,
  bookingDate,
  onPaymentSuccess,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState<CheckoutStep>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Personal user profile state (required for Razorpay invoice logging)
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePhone, setProfilePhone] = useState('+919999999999');
  const [profileLocation, setProfileLocation] = useState('Mumbai');
  const [profileFormError, setProfileFormError] = useState('');

  // Sandbox transaction state
  const [razorpayOrderId, setRazorpayOrderId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');

  // Verify session credentials
  useEffect(() => {
    if (visible) {
      setStep('loading');
      getUserId().then(id => {
        if (id) {
          setUserId(id);
        } else {
          setErrorMessage('User session not found. Please log in.');
          setStep('error');
        }
      });
    }
  }, [visible]);

  // Query Customer profile details
  const { data: profileData, loading: loadingProfile, refetch: refetchProfile } = useQuery(GET_CUSTOMER_PROFILE, {
    variables: { userId: userId ?? '' },
    skip: !userId || !visible,
    fetchPolicy: 'network-only',
  });

  const [upsertProfile, { loading: savingProfile }] = useMutation(UPSERT_CUSTOMER_PROFILE);
  const [createPayment, { loading: creatingPayment }] = useMutation(CREATE_PAYMENT);
  const [verifyPaymentSuccess] = useMutation(VERIFY_PAYMENT_SUCCESS);

  const customerProfile = profileData?.getCustomerProfile;

  // Sync component flow state depending on profile existence
  useEffect(() => {
    if (visible && !loadingProfile && userId) {
      setStep(customerProfile ? 'summary' : 'profile_setup');
    }
  }, [visible, loadingProfile, customerProfile, userId]);

  // Handle customer profile verification / initialization
  const handleCreateProfile = async () => {
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
    } catch (err: any) {
      setProfileFormError(err.message || 'Failed to update personal details.');
    }
  };

  // Connect to Razorpay API (Create Order)
  const handleInitiatePayment = async () => {
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
            amount: amount,
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
        RazorpayCheckout.open({
          description: `${washType} - ${vehicleCategory}`,
          image: 'https://i.imgur.com/3g7urwK.png',
          currency: 'INR',
          key: 'rzp_test_T6yGhSfszNH4z1',
          amount: Math.round(amount * 100),
          name: 'tab2wash',
          order_id: orderId,
          prefill: {
            email: customerProfile.email || '',
            contact: customerProfile.phone || '',
            name: customerProfile.name || ''
          },
          theme: { color: '#3b82f6' }
        })
          .then(async (sdkResponse: any) => {
            await handlePaymentVerification(
              sdkResponse.razorpay_order_id || orderId,
              sdkResponse.razorpay_payment_id,
              sdkResponse.razorpay_signature
            );
          })
          .catch((sdkError: any) => {
            setErrorMessage(sdkError.description || 'Payment cancelled or failed.');
            setStep('error');
          });
      } else {
        setStep('razorpay_sheet');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while initializing payment.');
      setStep('error');
    }
  };

  // Verify signature cryptographic integrity on the backend
  const handlePaymentVerification = async (orderId: string, paymentId: string, signature: string) => {
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
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred during payment verification.');
      setStep('error');
    }
  };

  // Mock verify signature helper (Calculates test HMAC signature using SHA256)
  const handleSimulatePaymentSuccess = async () => {
    const mockPaymentId = `pay_mock_${Math.random().toString(36).substring(2, 11)}`;
    const secret = 'D6YLajq28s3RVzbLrP4G0oK7';
    const signature = hmacSha256(`${razorpayOrderId}|${mockPaymentId}`, secret);
    await handlePaymentVerification(razorpayOrderId, mockPaymentId, signature);
  };

  // Render modular steps dynamically
  const renderContent = () => {
    if (step === 'loading' || loadingProfile) {
      return <FeedbackStep type="loading" />;
    }
    if (step === 'verifying') {
      return <FeedbackStep type="verifying" />;
    }
    if (step === 'success') {
      return <FeedbackStep type="success" />;
    }
    if (step === 'error') {
      return (
        <FeedbackStep
          type="error"
          message={errorMessage}
          onRetry={() => {
            setStep(customerProfile ? 'summary' : 'profile_setup');
          }}
        />
      );
    }
    if (step === 'profile_setup') {
      return (
        <ProfileSetupStep
          name={profileName}
          email={profileEmail}
          phone={profilePhone}
          location={profileLocation}
          onChangeName={text => setProfileName(text)}
          onChangeEmail={text => setProfileEmail(text)}
          onChangePhone={text => setProfilePhone(text)}
          onChangeLocation={text => setProfileLocation(text)}
          onSubmit={() => handleCreateProfile()}
          loading={savingProfile}
          error={profileFormError}
        />
      );
    }
    if (step === 'summary') {
      return (
        <SummaryStep
          vendorName={vendorName}
          washType={washType}
          vehicleCategory={vehicleCategory}
          bookingDate={bookingDate}
          amount={amount}
          loading={creatingPayment}
          onConfirm={() => handleInitiatePayment()}
        />
      );
    }
    if (step === 'razorpay_sheet') {
      return (
        <RazorpaySheetStep
          orderId={razorpayOrderId}
          amount={amount}
          paymentMethod={paymentMethod}
          onChangeMethod={method => setPaymentMethod(method)}
          onSubmit={() => handleSimulatePaymentSuccess()}
          onCancel={() => {
            setErrorMessage('Payment was cancelled by user.');
            setStep('error');
          }}
        />
      );
    }
    return null;
  };

  return (
    <BottomSheetModal
      visible={visible}
      title={step === 'profile_setup' ? 'Complete Profile' : 'Secure Checkout'}
      onClose={onClose}
      height={step === 'profile_setup' ? 520 : 490}
      scrollable={step === 'profile_setup'}
    >
      {renderContent()}
    </BottomSheetModal>
  );
};
