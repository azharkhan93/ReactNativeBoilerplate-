export interface TimeInputProps {
  value: string; // "09:00 AM"
  onChange: (value: string) => void;
}

export interface StepperProps {
  value: string;
  onInc: () => void;
  onDec: () => void;
}
