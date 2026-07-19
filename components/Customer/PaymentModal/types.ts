import { GetCustomerProfileQuery } from '../../../__generated__/graphql';

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

export type CheckoutStep =
  | 'loading'
  | 'profile_setup'
  | 'summary'
  | 'razorpay_sheet'
  | 'verifying'
  | 'success'
  | 'error';

export interface UsePaymentResult {
  step: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  profileEmail: string;
  setProfileEmail: (email: string) => void;
  profilePhone: string;
  setProfilePhone: (phone: string) => void;
  profileLocation: string;
  setProfileLocation: (location: string) => void;
  profileFormError: string;
  razorpayOrderId: string;
  paymentMethod: 'card' | 'upi';
  setPaymentMethod: (method: 'card' | 'upi') => void;
  loadingProfile: boolean;
  savingProfile: boolean;
  creatingPayment: boolean;
  customerProfile: GetCustomerProfileQuery['getCustomerProfile'];
  handleCreateProfile: () => Promise<void>;
  handleInitiatePayment: () => Promise<void>;
  handleSimulatePaymentSuccess: () => Promise<void>;
  handleCancelPayment: () => void;
  handleRetry: () => void;
}
