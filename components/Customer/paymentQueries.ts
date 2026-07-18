import { gql } from '@/__generated__';

export const CREATE_PAYMENT = gql(`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      id
      customerProfileId
      razorpayOrderId
      amount
      currency
      status
    }
  }
`);

export const VERIFY_PAYMENT_SUCCESS = gql(`
  mutation VerifyPaymentSuccess($input: VerifyPaymentInput!) {
    verifyPaymentSuccess(input: $input) {
      id
      status
      razorpayOrderId
      razorpayPaymentId
      razorpaySignature
    }
  }
`);

export const GET_PAYMENT_BY_ORDER_ID = gql(`
  query GetPaymentByOrderId($orderId: String!) {
    getPaymentByOrderId(orderId: $orderId) {
      id
      status
      amount
      currency
    }
  }
`);
