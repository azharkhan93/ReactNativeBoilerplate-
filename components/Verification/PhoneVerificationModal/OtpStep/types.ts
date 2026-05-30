export interface OtpStepProps {
    phoneNumber: string;
    onBack: () => void;
    onVerify: (code: string) => void;
    onResend: () => void;
    requestingSms: boolean;
    verifyingOtp: boolean;
    otpError: any;
}
