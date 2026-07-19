export interface AvatarUploadContentProps {
  avatarUrl: string | null;
  onSave: (url: string | null) => Promise<void>;
  onClose: () => void;
}
