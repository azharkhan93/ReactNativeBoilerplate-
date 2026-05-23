import { gql } from '@/__generated__';

export const GET_CUSTOMER_PROFILE = gql(`
  query GetCustomerProfile($userId: String!) {
    getCustomerProfile(userId: $userId) {
      id
      userId
      name
      phone
      email
      location
    }
  }
`);

export const UPSERT_CUSTOMER_PROFILE = gql(`
  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {
    upsertCustomerProfile(input: $input) {
      id
      userId
      name
      phone
      email
      location
    }
  }
`);

export const GET_CUSTOMER_ADDRESSES = gql(`
  query GetCustomerAddresses($customerProfileId: ID!) {
    getCustomerAddresses(customerProfileId: $customerProfileId) {
      id
      customerProfileId
      label
      street
      city
      state
      zipCode
      type
    }
  }
`);

export const CREATE_CUSTOMER_ADDRESS = gql(`
  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {
    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {
      id
      customerProfileId
      label
      street
      city
      state
      zipCode
      type
    }
  }
`);

export const UPDATE_CUSTOMER_ADDRESS = gql(`
  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {
    updateCustomerAddress(id: $id, input: $input) {
      id
      customerProfileId
      label
      street
      city
      state
      zipCode
      type
    }
  }
`);

export const DELETE_CUSTOMER_ADDRESS = gql(`
  mutation DeleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id)
  }
`);

export const GET_USER_AVATAR = gql(`
  query GetUserAvatar($id: ID!) {
    user(id: $id) {
      id
      avatarUrl
    }
  }
`);
