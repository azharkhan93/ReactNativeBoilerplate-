import React from 'react';
import { BottomSheetModal } from '@/components/shared/BottomSheetModal';
import { PaymentModalProps } from './types';
import { usePayment } from './hooks';

import { FeedbackStep } from './components/FeedbackStep';
import { ProfileSetupStep } from './components/ProfileSetupStep';
import { SummaryStep } from './components/SummaryStep';
import { RazorpaySheetStep } from './components/RazorpaySheetStep';

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
  const {
    step,
    errorMessage,
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
    handleCreateProfile,
    handleInitiatePayment,
    handleSimulatePaymentSuccess,
    handleCancelPayment,
    handleRetry,
  } = usePayment({
    visible,
    amount,
    washType,
    vehicleCategory,
    onPaymentSuccess,
    onClose,
  });

  const isProfileSetup = step === 'profile_setup';
  const modalTitle = isProfileSetup ? 'Complete Profile' : 'Secure Checkout';
  const modalHeight = isProfileSetup ? 520 : 490;
  const isScrollable = isProfileSetup;

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
          onRetry={handleRetry}
        />
      );
    }
    if (isProfileSetup) {
      return (
        <ProfileSetupStep
          name={profileName}
          email={profileEmail}
          phone={profilePhone}
          location={profileLocation}
          onChangeName={setProfileName}
          onChangeEmail={setProfileEmail}
          onChangePhone={setProfilePhone}
          onChangeLocation={setProfileLocation}
          onSubmit={handleCreateProfile}
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
          onConfirm={handleInitiatePayment}
        />
      );
    }
    if (step === 'razorpay_sheet') {
      return (
        <RazorpaySheetStep
          orderId={razorpayOrderId}
          amount={amount}
          paymentMethod={paymentMethod}
          onChangeMethod={setPaymentMethod}
          onSubmit={handleSimulatePaymentSuccess}
          onCancel={handleCancelPayment}
        />
      );
    }
    return null;
  };

  return (
    <BottomSheetModal
      visible={visible}
      title={modalTitle}
      onClose={onClose}
      height={modalHeight}
      scrollable={isScrollable}
    >
      {renderContent()}
    </BottomSheetModal>
  );
};
