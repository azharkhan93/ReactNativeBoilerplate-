export interface PhoneStepProps {
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  handleRequestOtp: () => void;
  requestingSms: boolean;
  phoneError: any;
  isValid: boolean;
  isInputLengthValid: boolean;
}
