import { gql } from '@/__generated__';

export const GET_CUSTOMER_BOOKINGS = gql(`
  query GetCustomerBookings($userId: ID!, $status: BookingStatus) {
    customerBookings(userId: $userId, status: $status) {
      id
      userId
      serviceId
      status
      scheduledAt
      totalPrice
      createdAt
      service {
        id
        name
        price
      }
      vendorProfile {
        id
        businessName
        imageUri
      }
    }
  }
`);

export const GET_VENDOR_BOOKINGS = gql(`
  query GetVendorBookings($vendorProfileId: ID!, $status: BookingStatus) {
    vendorBookings(vendorProfileId: $vendorProfileId, status: $status) {
      id
      userId
      serviceId
      status
      scheduledAt
      totalPrice
      createdAt
      user {
        id
        name
        phoneNumber
        avatarUrl
      }
      service {
        id
        name
        price
      }
    }
  }
`);

export const CREATE_BOOKING = gql(`
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
      userId
      serviceId
      status
      scheduledAt
      totalPrice
    }
  }
`);

export const UPDATE_BOOKING_STATUS = gql(`
  mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {
    updateBookingStatus(id: $id, status: $status) {
      id
      status
    }
  }
`);

export const CREATE_REVIEW = gql(`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      bookingId
      rating
      comment
      createdAt
    }
  }
`);

export const CREATE_DISPUTE = gql(`
  mutation CreateDispute($input: CreateDisputeInput!) {
    createDispute(input: $input) {
      id
      bookingId
      reason
      status
      createdAt
    }
  }
`);
