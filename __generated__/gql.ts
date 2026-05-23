/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCustomerProfile($userId: String!) {\n    getCustomerProfile(userId: $userId) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": typeof types.GetCustomerProfileDocument,
    "\n  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {\n    upsertCustomerProfile(input: $input) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": typeof types.UpsertCustomerProfileDocument,
    "\n  query GetCustomerAddresses($customerProfileId: ID!) {\n    getCustomerAddresses(customerProfileId: $customerProfileId) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": typeof types.GetCustomerAddressesDocument,
    "\n  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {\n    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": typeof types.CreateCustomerAddressDocument,
    "\n  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {\n    updateCustomerAddress(id: $id, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": typeof types.UpdateCustomerAddressDocument,
    "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id)\n  }\n": typeof types.DeleteCustomerAddressDocument,
    "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.CreateNewRoleDocument,
    "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n": typeof types.GetRolesDocument,
    "\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n  }\n": typeof types.VendorProfileFieldsFragmentDoc,
    "\n  query GetVendorProfile($userId: String!) {\n    getVendorProfile(userId: $userId) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.GetVendorProfileDocument,
    "\n  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {\n    createVendorProfile(input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.CreateVendorProfileDocument,
    "\n  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {\n    updateVendorProfile(id: $id, input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.UpdateVendorProfileDocument,
    "\n  mutation DeleteVendorProfile($id: ID!) {\n    deleteVendorProfile(id: $id)\n  }\n": typeof types.DeleteVendorProfileDocument,
    "\n  query GetVendorAvailability($vendorProfileId: ID!) {\n    getVendorAvailability(vendorProfileId: $vendorProfileId) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": typeof types.GetVendorAvailabilityDocument,
    "\n  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {\n    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": typeof types.SaveFullAvailabilityDocument,
    "\n  query GetVendorBankDetails($vendorProfileId: ID!) {\n    getVendorBankDetails(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": typeof types.GetVendorBankDetailsDocument,
    "\n  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {\n    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": typeof types.UpsertVendorBankDetailsDocument,
    "\n  mutation DeleteVendorBankDetails($id: ID!) {\n    deleteVendorBankDetails(id: $id)\n  }\n": typeof types.DeleteVendorBankDetailsDocument,
    "\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n": typeof types.GetVendorServicesDocument,
    "\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n": typeof types.CreateVendorServiceDocument,
    "\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n": typeof types.UpdateVendorServiceDocument,
    "\n  mutation DeleteVendorService($id: ID!) {\n    deleteVendorService(id: $id)\n  }\n": typeof types.DeleteVendorServiceDocument,
    "\n  query GetVendorProfiles {\n    getVendorProfiles {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.GetVendorProfilesDocument,
    "\n  query GetVendorProfileById($id: ID!) {\n    getVendorProfileById(id: $id) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.GetVendorProfileByIdDocument,
    "\n  mutation VerifyOtp($phone: String!, $code: String!) {\n    verifyOtp(phoneNumber: $phone, code: $code) {\n      success\n      message\n    }\n  }\n": typeof types.VerifyOtpDocument,
    "\n  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {\n    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {\n      token\n      user {\n        id\n        phoneNumber\n        role {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.LoginByPhoneDocument,
    "\n  mutation RequestOtp($phone: String!) {\n    requestOtp(phoneNumber: $phone) {\n      success\n      message\n      sid\n    }\n  }\n": typeof types.RequestOtpDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": typeof types.LogoutUserDocument,
    "\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": typeof types.GetDriverLocationDocument,
    "\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": typeof types.OnDriverLocationUpdatedDocument,
};
const documents: Documents = {
    "\n  query GetCustomerProfile($userId: String!) {\n    getCustomerProfile(userId: $userId) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": types.GetCustomerProfileDocument,
    "\n  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {\n    upsertCustomerProfile(input: $input) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": types.UpsertCustomerProfileDocument,
    "\n  query GetCustomerAddresses($customerProfileId: ID!) {\n    getCustomerAddresses(customerProfileId: $customerProfileId) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": types.GetCustomerAddressesDocument,
    "\n  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {\n    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": types.CreateCustomerAddressDocument,
    "\n  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {\n    updateCustomerAddress(id: $id, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": types.UpdateCustomerAddressDocument,
    "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id)\n  }\n": types.DeleteCustomerAddressDocument,
    "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CreateNewRoleDocument,
    "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n": types.GetRolesDocument,
    "\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n  }\n": types.VendorProfileFieldsFragmentDoc,
    "\n  query GetVendorProfile($userId: String!) {\n    getVendorProfile(userId: $userId) {\n      ...VendorProfileFields\n    }\n  }\n": types.GetVendorProfileDocument,
    "\n  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {\n    createVendorProfile(input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": types.CreateVendorProfileDocument,
    "\n  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {\n    updateVendorProfile(id: $id, input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": types.UpdateVendorProfileDocument,
    "\n  mutation DeleteVendorProfile($id: ID!) {\n    deleteVendorProfile(id: $id)\n  }\n": types.DeleteVendorProfileDocument,
    "\n  query GetVendorAvailability($vendorProfileId: ID!) {\n    getVendorAvailability(vendorProfileId: $vendorProfileId) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": types.GetVendorAvailabilityDocument,
    "\n  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {\n    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": types.SaveFullAvailabilityDocument,
    "\n  query GetVendorBankDetails($vendorProfileId: ID!) {\n    getVendorBankDetails(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": types.GetVendorBankDetailsDocument,
    "\n  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {\n    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": types.UpsertVendorBankDetailsDocument,
    "\n  mutation DeleteVendorBankDetails($id: ID!) {\n    deleteVendorBankDetails(id: $id)\n  }\n": types.DeleteVendorBankDetailsDocument,
    "\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n": types.GetVendorServicesDocument,
    "\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n": types.CreateVendorServiceDocument,
    "\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n": types.UpdateVendorServiceDocument,
    "\n  mutation DeleteVendorService($id: ID!) {\n    deleteVendorService(id: $id)\n  }\n": types.DeleteVendorServiceDocument,
    "\n  query GetVendorProfiles {\n    getVendorProfiles {\n      ...VendorProfileFields\n    }\n  }\n": types.GetVendorProfilesDocument,
    "\n  query GetVendorProfileById($id: ID!) {\n    getVendorProfileById(id: $id) {\n      ...VendorProfileFields\n    }\n  }\n": types.GetVendorProfileByIdDocument,
    "\n  mutation VerifyOtp($phone: String!, $code: String!) {\n    verifyOtp(phoneNumber: $phone, code: $code) {\n      success\n      message\n    }\n  }\n": types.VerifyOtpDocument,
    "\n  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {\n    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {\n      token\n      user {\n        id\n        phoneNumber\n        role {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.LoginByPhoneDocument,
    "\n  mutation RequestOtp($phone: String!) {\n    requestOtp(phoneNumber: $phone) {\n      success\n      message\n      sid\n    }\n  }\n": types.RequestOtpDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": types.GetDriverLocationDocument,
    "\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": types.OnDriverLocationUpdatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCustomerProfile($userId: String!) {\n    getCustomerProfile(userId: $userId) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerProfile($userId: String!) {\n    getCustomerProfile(userId: $userId) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {\n    upsertCustomerProfile(input: $input) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {\n    upsertCustomerProfile(input: $input) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCustomerAddresses($customerProfileId: ID!) {\n    getCustomerAddresses(customerProfileId: $customerProfileId) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerAddresses($customerProfileId: ID!) {\n    getCustomerAddresses(customerProfileId: $customerProfileId) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {\n    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {\n    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {\n    updateCustomerAddress(id: $id, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {\n    updateCustomerAddress(id: $id, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n  }\n"): (typeof documents)["\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorProfile($userId: String!) {\n    getVendorProfile(userId: $userId) {\n      ...VendorProfileFields\n    }\n  }\n"): (typeof documents)["\n  query GetVendorProfile($userId: String!) {\n    getVendorProfile(userId: $userId) {\n      ...VendorProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {\n    createVendorProfile(input: $input) {\n      ...VendorProfileFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {\n    createVendorProfile(input: $input) {\n      ...VendorProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {\n    updateVendorProfile(id: $id, input: $input) {\n      ...VendorProfileFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {\n    updateVendorProfile(id: $id, input: $input) {\n      ...VendorProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteVendorProfile($id: ID!) {\n    deleteVendorProfile(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteVendorProfile($id: ID!) {\n    deleteVendorProfile(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorAvailability($vendorProfileId: ID!) {\n    getVendorAvailability(vendorProfileId: $vendorProfileId) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetVendorAvailability($vendorProfileId: ID!) {\n    getVendorAvailability(vendorProfileId: $vendorProfileId) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {\n    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {\n    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorBankDetails($vendorProfileId: ID!) {\n    getVendorBankDetails(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n"): (typeof documents)["\n  query GetVendorBankDetails($vendorProfileId: ID!) {\n    getVendorBankDetails(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {\n    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {\n    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteVendorBankDetails($id: ID!) {\n    deleteVendorBankDetails(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteVendorBankDetails($id: ID!) {\n    deleteVendorBankDetails(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n"): (typeof documents)["\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n"): (typeof documents)["\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteVendorService($id: ID!) {\n    deleteVendorService(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteVendorService($id: ID!) {\n    deleteVendorService(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorProfiles {\n    getVendorProfiles {\n      ...VendorProfileFields\n    }\n  }\n"): (typeof documents)["\n  query GetVendorProfiles {\n    getVendorProfiles {\n      ...VendorProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorProfileById($id: ID!) {\n    getVendorProfileById(id: $id) {\n      ...VendorProfileFields\n    }\n  }\n"): (typeof documents)["\n  query GetVendorProfileById($id: ID!) {\n    getVendorProfileById(id: $id) {\n      ...VendorProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyOtp($phone: String!, $code: String!) {\n    verifyOtp(phoneNumber: $phone, code: $code) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyOtp($phone: String!, $code: String!) {\n    verifyOtp(phoneNumber: $phone, code: $code) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {\n    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {\n      token\n      user {\n        id\n        phoneNumber\n        role {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {\n    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {\n      token\n      user {\n        id\n        phoneNumber\n        role {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestOtp($phone: String!) {\n    requestOtp(phoneNumber: $phone) {\n      success\n      message\n      sid\n    }\n  }\n"): (typeof documents)["\n  mutation RequestOtp($phone: String!) {\n    requestOtp(phoneNumber: $phone) {\n      success\n      message\n      sid\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;