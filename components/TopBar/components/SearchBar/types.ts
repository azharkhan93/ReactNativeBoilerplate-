export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
}
