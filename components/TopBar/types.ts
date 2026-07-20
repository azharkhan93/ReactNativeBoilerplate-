export interface TopBarProps {
  onSearch?: (query: string) => void;
  onSearchFocus?: () => void;
  onProfilePress?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
  searchValue?: string;
  location?: string;
  avatarUrl?: string | null;
}
