import { ReactElement } from 'react';

export interface DefaultProductSectionItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discount?: number;
  rating?: number;
  isFavorite?: boolean;
}

export interface ProductSectionProps<T = DefaultProductSectionItem> {
  readonly title: string;
  readonly subtitle?: string;
  readonly data?: readonly T[];
  readonly renderItem?: (item: T, index: number) => ReactElement;
  readonly keyExtractor?: (item: T, index: number) => string;
  readonly onViewAllPress?: () => void;
  readonly onProductPress?: (id: string) => void;
  readonly onFavoritePress?: (id: string) => void;
  readonly className?: string;
  readonly cardWidthClassName?: string;
}
