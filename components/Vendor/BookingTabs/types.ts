export interface FormattedBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  address: string;
}
