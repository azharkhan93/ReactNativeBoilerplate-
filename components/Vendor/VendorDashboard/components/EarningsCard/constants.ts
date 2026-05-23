export interface PaymentHistoryItem {
  id: string;
  customerName: string;
  serviceName: string;
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export const MOCK_PAYMENT_HISTORY: PaymentHistoryItem[] = [
  {
    id: 'pay-001',
    customerName: 'Marcus Sterling',
    serviceName: 'Deluxe Interior Clean',
    amount: 45.00,
    date: 'Oct 24, 2023',
    time: '02:30 PM',
    status: 'completed',
    paymentMethod: 'Visa *1234',
  },
  {
    id: 'pay-002',
    customerName: 'Sarah Smith',
    serviceName: 'Eco Sedan Detail',
    amount: 35.00,
    date: 'Oct 23, 2023',
    time: '11:00 AM',
    status: 'completed',
    paymentMethod: 'Apple Pay',
  },
  {
    id: 'pay-003',
    customerName: 'Mike Ross',
    serviceName: 'Luxury Wax & Polish',
    amount: 120.00,
    date: 'Oct 22, 2023',
    time: '10:00 AM',
    status: 'completed',
    paymentMethod: 'Mastercard *5678',
  },
  {
    id: 'pay-004',
    customerName: 'Tom Hardy',
    serviceName: 'Basic Exterior Wash',
    amount: 25.00,
    date: 'Oct 20, 2023',
    time: '08:00 AM',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'pay-005',
    customerName: 'Jane Doe',
    serviceName: 'Full Exterior Wax',
    amount: 65.00,
    date: 'Oct 19, 2023',
    time: '04:15 PM',
    status: 'completed',
    paymentMethod: 'Visa *9999',
  },
  {
    id: 'pay-006',
    customerName: 'Helena Hills',
    serviceName: 'Premium SUV Wash',
    amount: 45.00,
    date: 'Oct 18, 2023',
    time: '01:20 PM',
    status: 'completed',
    paymentMethod: 'Google Pay',
  },
  {
    id: 'pay-007',
    customerName: 'David Miller',
    serviceName: 'Standard Express Detail',
    amount: 30.00,
    date: 'Oct 17, 2023',
    time: '11:45 AM',
    status: 'completed',
    paymentMethod: 'Cash',
  },
];
