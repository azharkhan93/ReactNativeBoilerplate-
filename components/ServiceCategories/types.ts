import { LucideIcon } from 'lucide-react-native';

export interface CategoryItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface ServiceCategoriesProps {
  readonly title?: string;
  readonly categories?: readonly CategoryItem[];
  readonly selectedCategoryId?: string | null;
  readonly onSelectCategory?: (id: string) => void;
  readonly className?: string;
}
