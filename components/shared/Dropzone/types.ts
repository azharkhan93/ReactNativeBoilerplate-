export interface DropzoneProps {
  label?: string;
  onUpload: () => void;
  imageUri?: string | null;
  onRemove?: () => void;
  className?: string;
}
