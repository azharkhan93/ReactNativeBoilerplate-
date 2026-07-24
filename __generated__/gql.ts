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
    "\n  query GetCustomerBookings($userId: ID!, $status: BookingStatus) {\n    customerBookings(userId: $userId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      service {\n        id\n        name\n        price\n      }\n      vendorProfile {\n        id\n        businessName\n        imageUri\n      }\n    }\n  }\n": typeof types.GetCustomerBookingsDocument,
    "\n  query GetVendorBookings($vendorProfileId: ID!, $status: BookingStatus) {\n    vendorBookings(vendorProfileId: $vendorProfileId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      user {\n        id\n        name\n        phoneNumber\n        avatarUrl\n      }\n      service {\n        id\n        name\n        price\n      }\n    }\n  }\n": typeof types.GetVendorBookingsDocument,
    "\n  mutation CreateBooking($input: CreateBookingInput!) {\n    createBooking(input: $input) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n    }\n  }\n": typeof types.CreateBookingDocument,
    "\n  mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {\n    updateBookingStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n": typeof types.UpdateBookingStatusDocument,
    "\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      bookingId\n      rating\n      comment\n      createdAt\n    }\n  }\n": typeof types.CreateReviewDocument,
    "\n  mutation CreateDispute($input: CreateDisputeInput!) {\n    createDispute(input: $input) {\n      id\n      bookingId\n      reason\n      status\n      createdAt\n    }\n  }\n": typeof types.CreateDisputeDocument,
    "\n  query GetCustomerProfile($userId: String!) {\n    getCustomerProfile(userId: $userId) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": typeof types.GetCustomerProfileDocument,
    "\n  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {\n    upsertCustomerProfile(input: $input) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": typeof types.UpsertCustomerProfileDocument,
    "\n  query GetCustomerAddresses($customerProfileId: ID!) {\n    getCustomerAddresses(customerProfileId: $customerProfileId) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": typeof types.GetCustomerAddressesDocument,
    "\n  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {\n    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": typeof types.CreateCustomerAddressDocument,
    "\n  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {\n    updateCustomerAddress(id: $id, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": typeof types.UpdateCustomerAddressDocument,
    "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id)\n  }\n": typeof types.DeleteCustomerAddressDocument,
    "\n  query GetUserAvatar($id: ID!) {\n    user(id: $id) {\n      id\n      avatarUrl\n    }\n  }\n": typeof types.GetUserAvatarDocument,
    "\n  mutation DeleteCustomerProfile($id: ID!) {\n    deleteCustomerProfile(id: $id)\n  }\n": typeof types.DeleteCustomerProfileDocument,
    "\n  mutation UpdateUserAvatar($id: ID!, $avatarUrl: String!) {\n    updateUserAvatar(id: $id, avatarUrl: $avatarUrl) {\n      id\n      avatarUrl\n    }\n  }\n": typeof types.UpdateUserAvatarDocument,
    "\n  mutation CreatePayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      id\n      customerProfileId\n      razorpayOrderId\n      amount\n      currency\n      status\n    }\n  }\n": typeof types.CreatePaymentDocument,
    "\n  mutation VerifyPaymentSuccess($input: VerifyPaymentInput!) {\n    verifyPaymentSuccess(input: $input) {\n      id\n      status\n      razorpayOrderId\n      razorpayPaymentId\n      razorpaySignature\n    }\n  }\n": typeof types.VerifyPaymentSuccessDocument,
    "\n  query GetPaymentByOrderId($orderId: String!) {\n    getPaymentByOrderId(orderId: $orderId) {\n      id\n      status\n      amount\n      currency\n    }\n  }\n": typeof types.GetPaymentByOrderIdDocument,
    "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.CreateNewRoleDocument,
    "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n": typeof types.GetRolesDocument,
    "\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n    categories {\n      id\n      name\n      icon\n    }\n  }\n": typeof types.VendorProfileFieldsFragmentDoc,
    "\n  query GetVendorProfile($userId: String!) {\n    getVendorProfile(userId: $userId) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.GetVendorProfileDocument,
    "\n  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {\n    createVendorProfile(input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.CreateVendorProfileDocument,
    "\n  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {\n    updateVendorProfile(id: $id, input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.UpdateVendorProfileDocument,
    "\n  mutation DeleteVendorProfile($id: ID!) {\n    deleteVendorProfile(id: $id)\n  }\n": typeof types.DeleteVendorProfileDocument,
    "\n  query GetVendorAvailability($vendorProfileId: ID!) {\n    getVendorAvailability(vendorProfileId: $vendorProfileId) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": typeof types.GetVendorAvailabilityDocument,
    "\n  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {\n    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": typeof types.SaveFullAvailabilityDocument,
    "\n  query GetVendorBankDetails($vendorProfileId: ID!) {\n    getVendorBankDetails(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": typeof types.GetVendorBankDetailsDocument,
    "\n  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {\n    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": typeof types.UpsertVendorBankDetailsDocument,
    "\n  mutation DeleteVendorBankDetails($id: ID!) {\n    deleteVendorBankDetails(id: $id)\n  }\n": typeof types.DeleteVendorBankDetailsDocument,
    "\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n": typeof types.GetVendorServicesDocument,
    "\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n": typeof types.CreateVendorServiceDocument,
    "\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n": typeof types.UpdateVendorServiceDocument,
    "\n  mutation DeleteVendorService($id: ID!) {\n    deleteVendorService(id: $id)\n  }\n": typeof types.DeleteVendorServiceDocument,
    "\n  query GetVendorProfiles {\n    getVendorProfiles {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.GetVendorProfilesDocument,
    "\n  query GetVendorProfileById($id: ID!) {\n    getVendorProfileById(id: $id) {\n      ...VendorProfileFields\n    }\n  }\n": typeof types.GetVendorProfileByIdDocument,
    "\n  mutation VerifyOtp($phone: String!, $code: String!) {\n    verifyOtp(phoneNumber: $phone, code: $code) {\n      success\n      message\n    }\n  }\n": typeof types.VerifyOtpDocument,
    "\n  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {\n    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {\n      token\n      user {\n        id\n        phoneNumber\n        role {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.LoginByPhoneDocument,
    "\n  mutation RequestOtp($phone: String!) {\n    requestOtp(phoneNumber: $phone) {\n      success\n      message\n      sid\n    }\n  }\n": typeof types.RequestOtpDocument,
    "\n  mutation UpdateDriverLocation($bookingId: ID!, $latitude: Float!, $longitude: Float!, $status: String!, $eta: Int!) {\n    updateDriverLocation(bookingId: $bookingId, latitude: $latitude, longitude: $longitude, status: $status, eta: $eta) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n    }\n  }\n": typeof types.UpdateDriverLocationDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": typeof types.LogoutUserDocument,
    "\n  mutation RegisterDeviceToken($input: RegisterDeviceTokenInput!) {\n    registerDeviceToken(input: $input) {\n      id\n      fcmToken\n    }\n  }\n": typeof types.RegisterDeviceTokenDocument,
    "\n  query SearchVendors($query: String!) {\n    searchVendors(query: $query) {\n      id\n      businessName\n      description\n    }\n  }\n": typeof types.SearchVendorsDocument,
    "\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": typeof types.GetDriverLocationDocument,
    "\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": typeof types.OnDriverLocationUpdatedDocument,
    "\n  mutation SendBookingNotification($bookingId: ID!, $type: String!) {\n    sendBookingNotification(bookingId: $bookingId, type: $type)\n  }\n": typeof types.SendBookingNotificationDocument,
};
const documents: Documents = {
    "\n  query GetCustomerBookings($userId: ID!, $status: BookingStatus) {\n    customerBookings(userId: $userId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      service {\n        id\n        name\n        price\n      }\n      vendorProfile {\n        id\n        businessName\n        imageUri\n      }\n    }\n  }\n": types.GetCustomerBookingsDocument,
    "\n  query GetVendorBookings($vendorProfileId: ID!, $status: BookingStatus) {\n    vendorBookings(vendorProfileId: $vendorProfileId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      user {\n        id\n        name\n        phoneNumber\n        avatarUrl\n      }\n      service {\n        id\n        name\n        price\n      }\n    }\n  }\n": types.GetVendorBookingsDocument,
    "\n  mutation CreateBooking($input: CreateBookingInput!) {\n    createBooking(input: $input) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n    }\n  }\n": types.CreateBookingDocument,
    "\n  mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {\n    updateBookingStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n": types.UpdateBookingStatusDocument,
    "\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      bookingId\n      rating\n      comment\n      createdAt\n    }\n  }\n": types.CreateReviewDocument,
    "\n  mutation CreateDispute($input: CreateDisputeInput!) {\n    createDispute(input: $input) {\n      id\n      bookingId\n      reason\n      status\n      createdAt\n    }\n  }\n": types.CreateDisputeDocument,
    "\n  query GetCustomerProfile($userId: String!) {\n    getCustomerProfile(userId: $userId) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": types.GetCustomerProfileDocument,
    "\n  mutation UpsertCustomerProfile($input: UpsertCustomerProfileInput!) {\n    upsertCustomerProfile(input: $input) {\n      id\n      userId\n      name\n      phone\n      email\n      location\n    }\n  }\n": types.UpsertCustomerProfileDocument,
    "\n  query GetCustomerAddresses($customerProfileId: ID!) {\n    getCustomerAddresses(customerProfileId: $customerProfileId) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": types.GetCustomerAddressesDocument,
    "\n  mutation CreateCustomerAddress($customerProfileId: ID!, $input: UpsertCustomerAddressInput!) {\n    createCustomerAddress(customerProfileId: $customerProfileId, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": types.CreateCustomerAddressDocument,
    "\n  mutation UpdateCustomerAddress($id: ID!, $input: UpsertCustomerAddressInput!) {\n    updateCustomerAddress(id: $id, input: $input) {\n      id\n      customerProfileId\n      label\n      street\n      city\n      state\n      zipCode\n      type\n    }\n  }\n": types.UpdateCustomerAddressDocument,
    "\n  mutation DeleteCustomerAddress($id: ID!) {\n    deleteCustomerAddress(id: $id)\n  }\n": types.DeleteCustomerAddressDocument,
    "\n  query GetUserAvatar($id: ID!) {\n    user(id: $id) {\n      id\n      avatarUrl\n    }\n  }\n": types.GetUserAvatarDocument,
    "\n  mutation DeleteCustomerProfile($id: ID!) {\n    deleteCustomerProfile(id: $id)\n  }\n": types.DeleteCustomerProfileDocument,
    "\n  mutation UpdateUserAvatar($id: ID!, $avatarUrl: String!) {\n    updateUserAvatar(id: $id, avatarUrl: $avatarUrl) {\n      id\n      avatarUrl\n    }\n  }\n": types.UpdateUserAvatarDocument,
    "\n  mutation CreatePayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      id\n      customerProfileId\n      razorpayOrderId\n      amount\n      currency\n      status\n    }\n  }\n": types.CreatePaymentDocument,
    "\n  mutation VerifyPaymentSuccess($input: VerifyPaymentInput!) {\n    verifyPaymentSuccess(input: $input) {\n      id\n      status\n      razorpayOrderId\n      razorpayPaymentId\n      razorpaySignature\n    }\n  }\n": types.VerifyPaymentSuccessDocument,
    "\n  query GetPaymentByOrderId($orderId: String!) {\n    getPaymentByOrderId(orderId: $orderId) {\n      id\n      status\n      amount\n      currency\n    }\n  }\n": types.GetPaymentByOrderIdDocument,
    "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CreateNewRoleDocument,
    "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n": types.GetRolesDocument,
    "\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n    categories {\n      id\n      name\n      icon\n    }\n  }\n": types.VendorProfileFieldsFragmentDoc,
    "\n  query GetVendorProfile($userId: String!) {\n    getVendorProfile(userId: $userId) {\n      ...VendorProfileFields\n    }\n  }\n": types.GetVendorProfileDocument,
    "\n  mutation CreateVendorProfile($input: CreateVendorProfileInput!) {\n    createVendorProfile(input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": types.CreateVendorProfileDocument,
    "\n  mutation UpdateVendorProfile($id: ID!, $input: UpdateVendorProfileInput!) {\n    updateVendorProfile(id: $id, input: $input) {\n      ...VendorProfileFields\n    }\n  }\n": types.UpdateVendorProfileDocument,
    "\n  mutation DeleteVendorProfile($id: ID!) {\n    deleteVendorProfile(id: $id)\n  }\n": types.DeleteVendorProfileDocument,
    "\n  query GetVendorAvailability($vendorProfileId: ID!) {\n    getVendorAvailability(vendorProfileId: $vendorProfileId) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": types.GetVendorAvailabilityDocument,
    "\n  mutation SaveFullAvailability($vendorProfileId: ID!, $input: SaveAvailabilityInput!) {\n    saveFullAvailability(vendorProfileId: $vendorProfileId, input: $input) {\n      schedule {\n        id\n        dayOfWeek\n        startTime\n        endTime\n        isActive\n      }\n      breaks {\n        id\n        name\n        startTime\n        endTime\n      }\n      exceptions {\n        id\n        date\n        description\n        type\n        startTime\n        endTime\n      }\n    }\n  }\n": types.SaveFullAvailabilityDocument,
    "\n  query GetVendorBankDetails($vendorProfileId: ID!) {\n    getVendorBankDetails(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": types.GetVendorBankDetailsDocument,
    "\n  mutation UpsertVendorBankDetails($vendorProfileId: ID!, $input: UpsertBankDetailsInput!) {\n    upsertVendorBankDetails(vendorProfileId: $vendorProfileId, input: $input) {\n      id\n      vendorProfileId\n      accountHolder\n      bankName\n      ifscCode\n      accountNumber\n    }\n  }\n": types.UpsertVendorBankDetailsDocument,
    "\n  mutation DeleteVendorBankDetails($id: ID!) {\n    deleteVendorBankDetails(id: $id)\n  }\n": types.DeleteVendorBankDetailsDocument,
    "\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n": types.GetVendorServicesDocument,
    "\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n": types.CreateVendorServiceDocument,
    "\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n": types.UpdateVendorServiceDocument,
    "\n  mutation DeleteVendorService($id: ID!) {\n    deleteVendorService(id: $id)\n  }\n": types.DeleteVendorServiceDocument,
    "\n  query GetVendorProfiles {\n    getVendorProfiles {\n      ...VendorProfileFields\n    }\n  }\n": types.GetVendorProfilesDocument,
    "\n  query GetVendorProfileById($id: ID!) {\n    getVendorProfileById(id: $id) {\n      ...VendorProfileFields\n    }\n  }\n": types.GetVendorProfileByIdDocument,
    "\n  mutation VerifyOtp($phone: String!, $code: String!) {\n    verifyOtp(phoneNumber: $phone, code: $code) {\n      success\n      message\n    }\n  }\n": types.VerifyOtpDocument,
    "\n  mutation LoginByPhone($phone: String!, $code: String!, $role: UserRole!) {\n    loginByPhone(phoneNumber: $phone, code: $code, role: $role) {\n      token\n      user {\n        id\n        phoneNumber\n        role {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.LoginByPhoneDocument,
    "\n  mutation RequestOtp($phone: String!) {\n    requestOtp(phoneNumber: $phone) {\n      success\n      message\n      sid\n    }\n  }\n": types.RequestOtpDocument,
    "\n  mutation UpdateDriverLocation($bookingId: ID!, $latitude: Float!, $longitude: Float!, $status: String!, $eta: Int!) {\n    updateDriverLocation(bookingId: $bookingId, latitude: $latitude, longitude: $longitude, status: $status, eta: $eta) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n    }\n  }\n": types.UpdateDriverLocationDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\n  mutation RegisterDeviceToken($input: RegisterDeviceTokenInput!) {\n    registerDeviceToken(input: $input) {\n      id\n      fcmToken\n    }\n  }\n": types.RegisterDeviceTokenDocument,
    "\n  query SearchVendors($query: String!) {\n    searchVendors(query: $query) {\n      id\n      businessName\n      description\n    }\n  }\n": types.SearchVendorsDocument,
    "\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": types.GetDriverLocationDocument,
    "\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n": types.OnDriverLocationUpdatedDocument,
    "\n  mutation SendBookingNotification($bookingId: ID!, $type: String!) {\n    sendBookingNotification(bookingId: $bookingId, type: $type)\n  }\n": types.SendBookingNotificationDocument,
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
export function gql(source: "\n  query GetCustomerBookings($userId: ID!, $status: BookingStatus) {\n    customerBookings(userId: $userId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      service {\n        id\n        name\n        price\n      }\n      vendorProfile {\n        id\n        businessName\n        imageUri\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerBookings($userId: ID!, $status: BookingStatus) {\n    customerBookings(userId: $userId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      service {\n        id\n        name\n        price\n      }\n      vendorProfile {\n        id\n        businessName\n        imageUri\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVendorBookings($vendorProfileId: ID!, $status: BookingStatus) {\n    vendorBookings(vendorProfileId: $vendorProfileId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      user {\n        id\n        name\n        phoneNumber\n        avatarUrl\n      }\n      service {\n        id\n        name\n        price\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetVendorBookings($vendorProfileId: ID!, $status: BookingStatus) {\n    vendorBookings(vendorProfileId: $vendorProfileId, status: $status) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n      createdAt\n      user {\n        id\n        name\n        phoneNumber\n        avatarUrl\n      }\n      service {\n        id\n        name\n        price\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBooking($input: CreateBookingInput!) {\n    createBooking(input: $input) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBooking($input: CreateBookingInput!) {\n    createBooking(input: $input) {\n      id\n      userId\n      serviceId\n      status\n      scheduledAt\n      totalPrice\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {\n    updateBookingStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {\n    updateBookingStatus(id: $id, status: $status) {\n      id\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      bookingId\n      rating\n      comment\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      id\n      bookingId\n      rating\n      comment\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateDispute($input: CreateDisputeInput!) {\n    createDispute(input: $input) {\n      id\n      bookingId\n      reason\n      status\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDispute($input: CreateDisputeInput!) {\n    createDispute(input: $input) {\n      id\n      bookingId\n      reason\n      status\n      createdAt\n    }\n  }\n"];
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
export function gql(source: "\n  query GetUserAvatar($id: ID!) {\n    user(id: $id) {\n      id\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  query GetUserAvatar($id: ID!) {\n    user(id: $id) {\n      id\n      avatarUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCustomerProfile($id: ID!) {\n    deleteCustomerProfile(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteCustomerProfile($id: ID!) {\n    deleteCustomerProfile(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserAvatar($id: ID!, $avatarUrl: String!) {\n    updateUserAvatar(id: $id, avatarUrl: $avatarUrl) {\n      id\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserAvatar($id: ID!, $avatarUrl: String!) {\n    updateUserAvatar(id: $id, avatarUrl: $avatarUrl) {\n      id\n      avatarUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      id\n      customerProfileId\n      razorpayOrderId\n      amount\n      currency\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      id\n      customerProfileId\n      razorpayOrderId\n      amount\n      currency\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyPaymentSuccess($input: VerifyPaymentInput!) {\n    verifyPaymentSuccess(input: $input) {\n      id\n      status\n      razorpayOrderId\n      razorpayPaymentId\n      razorpaySignature\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyPaymentSuccess($input: VerifyPaymentInput!) {\n    verifyPaymentSuccess(input: $input) {\n      id\n      status\n      razorpayOrderId\n      razorpayPaymentId\n      razorpaySignature\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPaymentByOrderId($orderId: String!) {\n    getPaymentByOrderId(orderId: $orderId) {\n      id\n      status\n      amount\n      currency\n    }\n  }\n"): (typeof documents)["\n  query GetPaymentByOrderId($orderId: String!) {\n    getPaymentByOrderId(orderId: $orderId) {\n      id\n      status\n      amount\n      currency\n    }\n  }\n"];
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
export function gql(source: "\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n    categories {\n      id\n      name\n      icon\n    }\n  }\n"): (typeof documents)["\n  fragment VendorProfileFields on VendorProfileType {\n    id\n    userId\n    businessName\n    imageUri\n    gstNumber\n    contactNumber\n    address\n    serviceRadius\n    operatingHours\n    whyChooseMe\n    description\n    images\n    categories {\n      id\n      name\n      icon\n    }\n  }\n"];
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
export function gql(source: "\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  query GetVendorServices($vendorProfileId: ID!) {\n    getVendorServices(vendorProfileId: $vendorProfileId) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateVendorService($input: CreateVendorServiceInput!) {\n    createVendorService(input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVendorService($id: ID!, $input: UpdateVendorServiceInput!) {\n    updateVendorService(id: $id, input: $input) {\n      id\n      vendorProfileId\n      name\n      description\n      price\n      duration\n      location\n      features\n      images\n      categoryId\n    }\n  }\n"];
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
export function gql(source: "\n  mutation UpdateDriverLocation($bookingId: ID!, $latitude: Float!, $longitude: Float!, $status: String!, $eta: Int!) {\n    updateDriverLocation(bookingId: $bookingId, latitude: $latitude, longitude: $longitude, status: $status, eta: $eta) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDriverLocation($bookingId: ID!, $latitude: Float!, $longitude: Float!, $status: String!, $eta: Int!) {\n    updateDriverLocation(bookingId: $bookingId, latitude: $latitude, longitude: $longitude, status: $status, eta: $eta) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterDeviceToken($input: RegisterDeviceTokenInput!) {\n    registerDeviceToken(input: $input) {\n      id\n      fcmToken\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterDeviceToken($input: RegisterDeviceTokenInput!) {\n    registerDeviceToken(input: $input) {\n      id\n      fcmToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchVendors($query: String!) {\n    searchVendors(query: $query) {\n      id\n      businessName\n      description\n    }\n  }\n"): (typeof documents)["\n  query SearchVendors($query: String!) {\n    searchVendors(query: $query) {\n      id\n      businessName\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDriverLocation($bookingId: ID!) {\n    driverLocation(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription OnDriverLocationUpdated($bookingId: ID!) {\n    driverLocationUpdated(bookingId: $bookingId) {\n      bookingId\n      latitude\n      longitude\n      status\n      eta\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendBookingNotification($bookingId: ID!, $type: String!) {\n    sendBookingNotification(bookingId: $bookingId, type: $type)\n  }\n"): (typeof documents)["\n  mutation SendBookingNotification($bookingId: ID!, $type: String!) {\n    sendBookingNotification(bookingId: $bookingId, type: $type)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;