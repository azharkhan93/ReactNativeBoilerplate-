export interface FlashSaleProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
  discount: number;
  rating?: number;
}

export interface FlashSaleProps {
  title?: string;
  products?: readonly FlashSaleProduct[];
  endTime?: Date;
  onViewAllPress?: () => void;
  onProductPress?: (productId: string) => void;
  className?: string;
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}
