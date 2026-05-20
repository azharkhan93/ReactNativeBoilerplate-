import { gql } from '@apollo/client';

export const GET_VENDOR_PROFILE = gql`
  query GetVendorProfile($userId: String!) {
    getVendorProfile(userId: $userId) {
      id
      userId
      businessName
      imageUri
      gstNumber
      contactNumber
      address
      serviceRadius
      operatingHours
    }
  }
`;

export const CREATE_VENDOR_PROFILE = gql`
  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {
    createVendorProfile(input: $input) {
      id
      userId
      businessName
      imageUri
      gstNumber
      contactNumber
      address
      serviceRadius
      operatingHours
    }
  }
`;

export const UPDATE_VENDOR_PROFILE = gql`
  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {
    updateVendorProfile(id: $id, input: $input) {
      id
      userId
      businessName
      imageUri
      gstNumber
      contactNumber
      address
      serviceRadius
      operatingHours
    }
  }
`;

export const DELETE_VENDOR_PROFILE = gql`
  mutation DeleteVendorProfile($id: ID!) {
    deleteVendorProfile(id: $id)
  }
`;

export const GET_VENDOR_AVAILABILITY = gql`
  query GetVendorAvailability($vendorProfileId: ID!) {
    getVendorAvailability(vendorProfileId: $vendorProfileId) {
      schedule {
        id
        dayOfWeek
        startTime
        endTime
        isActive
      }
      breaks {
        id
        name
        startTime
        endTime
      }
      exceptions {
        id
        date
        description
        type
        startTime
        endTime
      }
    }
  }
`;

export const SAVE_FULL_AVAILABILITY = gql`
  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {
    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {
      schedule {
        id
        dayOfWeek
        startTime
        endTime
        isActive
      }
      breaks {
        id
        name
        startTime
        endTime
      }
      exceptions {
        id
        date
        description
        type
        startTime
        endTime
      }
    }
  }
`;

export const GET_VENDOR_BANK_DETAILS = gql`
  query GetVendorBankDetails($vendorProfileId: ID!) {
    getVendorBankDetails(vendorProfileId: $vendorProfileId) {
      id
      vendorProfileId
      accountHolder
      bankName
      ifscCode
      accountNumber
    }
  }
`;

export const UPSERT_VENDOR_BANK_DETAILS = gql`
  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {
    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {
      id
      vendorProfileId
      accountHolder
      bankName
      ifscCode
      accountNumber
    }
  }
`;

export const GET_VENDOR_SERVICES = gql`
  query GetVendorServices($vendorProfileId: ID!) {
    getVendorServices(vendorProfileId: $vendorProfileId) {
      id
      vendorProfileId
      name
      description
      price
      duration
      location
      features
      images
    }
  }
`;

export const CREATE_VENDOR_SERVICE = gql`
  mutation CreateVendorService($input: CreateVendorServiceInput!) {
    createVendorService(input: $input) {
      id
      vendorProfileId
      name
      description
      price
      duration
      location
      features
      images
    }
  }
`;

export const UPDATE_VENDOR_SERVICE = gql`
  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {
    updateVendorService(id: $id, input: $input) {
      id
      vendorProfileId
      name
      description
      price
      duration
      location
      features
      images
    }
  }
`;

export const DELETE_VENDOR_SERVICE = gql`
  mutation DeleteVendorService($id: ID!) {
    deleteVendorService(id: $id)
  }
`;
