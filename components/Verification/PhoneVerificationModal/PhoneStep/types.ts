export interface PhoneStepProps {
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  handleRequestOtp: () => void;
  requestingSms: boolean;
  phoneError?: string | Error | null;
  isValid: boolean;
  isInputLengthValid: boolean;
}
