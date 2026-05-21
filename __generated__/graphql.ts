/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AdminAuthPayloadType = {
  __typename?: 'AdminAuthPayloadType';
  user: UserType;
};

export type AuthPayloadType = {
  __typename?: 'AuthPayloadType';
  token: Scalars['String']['output'];
  user: UserType;
};

export type BankDetailsType = {
  __typename?: 'BankDetailsType';
  accountHolder: Scalars['String']['output'];
  accountNumber: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ifscCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vendorProfileId: Scalars['String']['output'];
};

export type CreateBreakInput = {
  endTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export type CreateExceptionInput = {
  date: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  type: ExceptionType;
};

export type CreateServiceCategoryInput = {
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateVendorProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessName: Scalars['String']['input'];
  contactNumber?: InputMaybe<Scalars['String']['input']>;
  gstNumber?: InputMaybe<Scalars['String']['input']>;
  imageUri?: InputMaybe<Scalars['String']['input']>;
  operatingHours?: InputMaybe<Scalars['String']['input']>;
  serviceRadius?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVendorServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  features?: Array<Scalars['String']['input']>;
  images?: Array<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  vendorProfileId: Scalars['ID']['input'];
};

export enum ExceptionType {
  BlockedOut = 'BLOCKED_OUT',
  ShortenedHours = 'SHORTENED_HOURS'
}

export type HeroContent = {
  __typename?: 'HeroContent';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  slide1Url?: Maybe<Scalars['String']['output']>;
  slide2Url?: Maybe<Scalars['String']['output']>;
  slide3Url?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addVendorBreak: VendorBreak;
  addVendorException: VendorException;
  adminLogin: AdminAuthPayloadType;
  createRole: Role;
  createServiceCategory: ServiceCategory;
  createVendorProfile: VendorProfileType;
  createVendorService: VendorService;
  deleteHeroContent: Scalars['Boolean']['output'];
  deleteImage: Scalars['Boolean']['output'];
  deleteServiceCategory: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteVendorBankDetails: Scalars['Boolean']['output'];
  deleteVendorProfile: Scalars['Boolean']['output'];
  deleteVendorService: Scalars['Boolean']['output'];
  loginByPhone: AuthPayloadType;
  logout: Scalars['Boolean']['output'];
  removeVendorBreak: Scalars['Boolean']['output'];
  removeVendorException: Scalars['Boolean']['output'];
  requestOtp: SmsResponse;
  saveFullAvailability: VendorAvailabilityResponse;
  syncServiceCategories: Array<ServiceCategory>;
  updateHeroContent: HeroContent;
  updateServiceCategory: ServiceCategory;
  updateVendorBreak: VendorBreak;
  updateVendorException: VendorException;
  updateVendorProfile: VendorProfileType;
  updateVendorSchedule: VendorAvailabilityResponse;
  updateVendorScheduleItem: VendorSchedule;
  updateVendorService: VendorService;
  uploadImage: UploadResponseType;
  upsertVendorBankDetails: BankDetailsType;
  verifyOtp: VerifyOtpResponse;
};


export type MutationAddVendorBreakArgs = {
  input: CreateBreakInput;
  vendorProfileId: Scalars['ID']['input'];
};


export type MutationAddVendorExceptionArgs = {
  input: CreateExceptionInput;
  vendorProfileId: Scalars['ID']['input'];
};


export type MutationAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateRoleArgs = {
  name: UserRole;
};


export type MutationCreateServiceCategoryArgs = {
  input: CreateServiceCategoryInput;
};


export type MutationCreateVendorProfileArgs = {
  input: CreateVendorProfileInput;
};


export type MutationCreateVendorServiceArgs = {
  input: CreateVendorServiceInput;
};


export type MutationDeleteImageArgs = {
  publicId: Scalars['String']['input'];
};


export type MutationDeleteServiceCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVendorBankDetailsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVendorProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVendorServiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginByPhoneArgs = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role: UserRole;
};


export type MutationRemoveVendorBreakArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveVendorExceptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRequestOtpArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationSaveFullAvailabilityArgs = {
  input: SaveAvailabilityInput;
  vendorProfileId: Scalars['ID']['input'];
};


export type MutationSyncServiceCategoriesArgs = {
  categories: Array<SyncServiceCategoryInput>;
};


export type MutationUpdateHeroContentArgs = {
  input: UpdateHeroContentInput;
};


export type MutationUpdateServiceCategoryArgs = {
  id: Scalars['String']['input'];
  input: UpdateServiceCategoryInput;
};


export type MutationUpdateVendorBreakArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBreakInput;
};


export type MutationUpdateVendorExceptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateExceptionInput;
};


export type MutationUpdateVendorProfileArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVendorProfileInput;
};


export type MutationUpdateVendorScheduleArgs = {
  schedule: Array<UpdateScheduleInput>;
  vendorProfileId: Scalars['ID']['input'];
};


export type MutationUpdateVendorScheduleItemArgs = {
  id: Scalars['ID']['input'];
  input: UpdateScheduleInput;
};


export type MutationUpdateVendorServiceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVendorServiceInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUpsertVendorBankDetailsArgs = {
  input: UpsertBankDetailsInput;
  vendorProfileId: Scalars['ID']['input'];
};


export type MutationVerifyOtpArgs = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getHeroContent?: Maybe<HeroContent>;
  getVendorAvailability: VendorAvailabilityResponse;
  getVendorBankDetails?: Maybe<BankDetailsType>;
  getVendorProfile: VendorProfileType;
  getVendorProfileById: VendorProfileType;
  getVendorProfiles: Array<VendorProfileType>;
  getVendorService: VendorService;
  getVendorServices: Array<VendorService>;
  roleById: Role;
  roles: Array<Role>;
  serviceCategories: Array<ServiceCategory>;
  user: UserType;
  users: Array<UserType>;
};


export type QueryGetVendorAvailabilityArgs = {
  vendorProfileId: Scalars['ID']['input'];
};


export type QueryGetVendorBankDetailsArgs = {
  vendorProfileId: Scalars['ID']['input'];
};


export type QueryGetVendorProfileArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetVendorProfileByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetVendorServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetVendorServicesArgs = {
  vendorProfileId: Scalars['ID']['input'];
};


export type QueryRoleByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type SaveAvailabilityInput = {
  breaks: Array<CreateBreakInput>;
  exceptions: Array<CreateExceptionInput>;
  schedule: Array<UpdateScheduleInput>;
};

export type ServiceCategory = {
  __typename?: 'ServiceCategory';
  createdAt: Scalars['DateTime']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SmsResponse = {
  __typename?: 'SmsResponse';
  errorCode?: Maybe<Scalars['Float']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  sid?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SyncServiceCategoryInput = {
  icon: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateBreakInput = {
  endTime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExceptionInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ExceptionType>;
};

export type UpdateHeroContentInput = {
  slide1Url?: InputMaybe<Scalars['String']['input']>;
  slide2Url?: InputMaybe<Scalars['String']['input']>;
  slide3Url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateScheduleInput = {
  dayOfWeek: Scalars['Int']['input'];
  endTime: Scalars['String']['input'];
  isActive: Scalars['Boolean']['input'];
  startTime: Scalars['String']['input'];
};

export type UpdateServiceCategoryInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVendorProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  contactNumber?: InputMaybe<Scalars['String']['input']>;
  gstNumber?: InputMaybe<Scalars['String']['input']>;
  imageUri?: InputMaybe<Scalars['String']['input']>;
  operatingHours?: InputMaybe<Scalars['String']['input']>;
  serviceRadius?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVendorServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UploadResponseType = {
  __typename?: 'UploadResponseType';
  bytes: Scalars['Float']['output'];
  format: Scalars['String']['output'];
  public_id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpsertBankDetailsInput = {
  accountHolder: Scalars['String']['input'];
  accountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  ifscCode: Scalars['String']['input'];
};

/** Available user roles */
export enum UserRole {
  Customer = 'CUSTOMER',
  Provider = 'PROVIDER',
  SuperAdmin = 'SUPER_ADMIN'
}

export type UserType = {
  __typename?: 'UserType';
  avatarPublicId?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type VendorAvailabilityResponse = {
  __typename?: 'VendorAvailabilityResponse';
  breaks: Array<VendorBreak>;
  exceptions: Array<VendorException>;
  schedule: Array<VendorSchedule>;
};

export type VendorBreak = {
  __typename?: 'VendorBreak';
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type VendorException = {
  __typename?: 'VendorException';
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  startTime?: Maybe<Scalars['String']['output']>;
  type: ExceptionType;
};

export type VendorProfileType = {
  __typename?: 'VendorProfileType';
  address?: Maybe<Scalars['String']['output']>;
  businessName: Scalars['String']['output'];
  contactNumber?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  gstNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUri?: Maybe<Scalars['String']['output']>;
  operatingHours?: Maybe<Scalars['String']['output']>;
  serviceRadius?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type VendorSchedule = {
  __typename?: 'VendorSchedule';
  dayOfWeek: Scalars['Int']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  startTime: Scalars['String']['output'];
};

export type VendorService = {
  __typename?: 'VendorService';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Int']['output'];
  features: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vendorProfileId: Scalars['ID']['output'];
};

export type VerifyOtpResponse = {
  __typename?: 'VerifyOtpResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateNewRoleMutationVariables = Exact<{
  roleName: UserRole;
}>;


export type CreateNewRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, name: UserRole, createdAt: any } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, name: UserRole }> };

export type GetVendorProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetVendorProfileQuery = { __typename?: 'Query', getVendorProfile: { __typename?: 'VendorProfileType', id: string, userId: string, businessName: string, imageUri?: string | null, gstNumber?: string | null, contactNumber?: string | null, address?: string | null, serviceRadius?: string | null, operatingHours?: string | null } };

export type CreateVendorProfileMutationVariables = Exact<{
  input: CreateVendorProfileInput;
}>;


export type CreateVendorProfileMutation = { __typename?: 'Mutation', createVendorProfile: { __typename?: 'VendorProfileType', id: string, userId: string, businessName: string, imageUri?: string | null, gstNumber?: string | null, contactNumber?: string | null, address?: string | null, serviceRadius?: string | null, operatingHours?: string | null } };

export type UpdateVendorProfileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateVendorProfileInput;
}>;


export type UpdateVendorProfileMutation = { __typename?: 'Mutation', updateVendorProfile: { __typename?: 'VendorProfileType', id: string, userId: string, businessName: string, imageUri?: string | null, gstNumber?: string | null, contactNumber?: string | null, address?: string | null, serviceRadius?: string | null, operatingHours?: string | null } };

export type DeleteVendorProfileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVendorProfileMutation = { __typename?: 'Mutation', deleteVendorProfile: boolean };

export type GetVendorAvailabilityQueryVariables = Exact<{
  vendorProfileId: Scalars['ID']['input'];
}>;


export type GetVendorAvailabilityQuery = { __typename?: 'Query', getVendorAvailability: { __typename?: 'VendorAvailabilityResponse', schedule: Array<{ __typename?: 'VendorSchedule', id: string, dayOfWeek: number, startTime: string, endTime: string, isActive: boolean }>, breaks: Array<{ __typename?: 'VendorBreak', id: string, name: string, startTime: string, endTime: string }>, exceptions: Array<{ __typename?: 'VendorException', id: string, date: any, description?: string | null, type: ExceptionType, startTime?: string | null, endTime?: string | null }> } };

export type SaveFullAvailabilityMutationVariables = Exact<{
  vendorProfileId: Scalars['ID']['input'];
  input: SaveAvailabilityInput;
}>;


export type SaveFullAvailabilityMutation = { __typename?: 'Mutation', saveFullAvailability: { __typename?: 'VendorAvailabilityResponse', schedule: Array<{ __typename?: 'VendorSchedule', id: string, dayOfWeek: number, startTime: string, endTime: string, isActive: boolean }>, breaks: Array<{ __typename?: 'VendorBreak', id: string, name: string, startTime: string, endTime: string }>, exceptions: Array<{ __typename?: 'VendorException', id: string, date: any, description?: string | null, type: ExceptionType, startTime?: string | null, endTime?: string | null }> } };

export type GetVendorBankDetailsQueryVariables = Exact<{
  vendorProfileId: Scalars['ID']['input'];
}>;


export type GetVendorBankDetailsQuery = { __typename?: 'Query', getVendorBankDetails?: { __typename?: 'BankDetailsType', id: string, vendorProfileId: string, accountHolder: string, bankName: string, ifscCode: string, accountNumber: string } | null };

export type UpsertVendorBankDetailsMutationVariables = Exact<{
  vendorProfileId: Scalars['ID']['input'];
  input: UpsertBankDetailsInput;
}>;


export type UpsertVendorBankDetailsMutation = { __typename?: 'Mutation', upsertVendorBankDetails: { __typename?: 'BankDetailsType', id: string, vendorProfileId: string, accountHolder: string, bankName: string, ifscCode: string, accountNumber: string } };

export type DeleteVendorBankDetailsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVendorBankDetailsMutation = { __typename?: 'Mutation', deleteVendorBankDetails: boolean };

export type GetVendorServicesQueryVariables = Exact<{
  vendorProfileId: Scalars['ID']['input'];
}>;


export type GetVendorServicesQuery = { __typename?: 'Query', getVendorServices: Array<{ __typename?: 'VendorService', id: string, vendorProfileId: string, name: string, description?: string | null, price: number, duration: number, location?: string | null, features: Array<string>, images: Array<string> }> };

export type CreateVendorServiceMutationVariables = Exact<{
  input: CreateVendorServiceInput;
}>;


export type CreateVendorServiceMutation = { __typename?: 'Mutation', createVendorService: { __typename?: 'VendorService', id: string, vendorProfileId: string, name: string, description?: string | null, price: number, duration: number, location?: string | null, features: Array<string>, images: Array<string> } };

export type UpdateVendorServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateVendorServiceInput;
}>;


export type UpdateVendorServiceMutation = { __typename?: 'Mutation', updateVendorService: { __typename?: 'VendorService', id: string, vendorProfileId: string, name: string, description?: string | null, price: number, duration: number, location?: string | null, features: Array<string>, images: Array<string> } };

export type DeleteVendorServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVendorServiceMutation = { __typename?: 'Mutation', deleteVendorService: boolean };

export type VerifyOtpMutationVariables = Exact<{
  phone: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'VerifyOtpResponse', success: boolean, message: string } };

export type LoginByPhoneMutationVariables = Exact<{
  phone: Scalars['String']['input'];
  code: Scalars['String']['input'];
  role: UserRole;
}>;


export type LoginByPhoneMutation = { __typename?: 'Mutation', loginByPhone: { __typename?: 'AuthPayloadType', token: string, user: { __typename?: 'UserType', id: string, phoneNumber: string, role?: { __typename?: 'Role', id: string, name: UserRole } | null } } };

export type RequestOtpMutationVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: { __typename?: 'SmsResponse', success: boolean, message?: string | null, sid?: string | null } };


export const CreateNewRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateNewRoleMutation, CreateNewRoleMutationVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const GetVendorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUri"}},{"kind":"Field","name":{"kind":"Name","value":"gstNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"serviceRadius"}},{"kind":"Field","name":{"kind":"Name","value":"operatingHours"}}]}}]}}]} as unknown as DocumentNode<GetVendorProfileQuery, GetVendorProfileQueryVariables>;
export const CreateVendorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVendorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVendorProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVendorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUri"}},{"kind":"Field","name":{"kind":"Name","value":"gstNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"serviceRadius"}},{"kind":"Field","name":{"kind":"Name","value":"operatingHours"}}]}}]}}]} as unknown as DocumentNode<CreateVendorProfileMutation, CreateVendorProfileMutationVariables>;
export const UpdateVendorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVendorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVendorProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVendorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUri"}},{"kind":"Field","name":{"kind":"Name","value":"gstNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactNumber"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"serviceRadius"}},{"kind":"Field","name":{"kind":"Name","value":"operatingHours"}}]}}]}}]} as unknown as DocumentNode<UpdateVendorProfileMutation, UpdateVendorProfileMutationVariables>;
export const DeleteVendorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVendorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVendorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteVendorProfileMutation, DeleteVendorProfileMutationVariables>;
export const GetVendorAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"breaks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exceptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]} as unknown as DocumentNode<GetVendorAvailabilityQuery, GetVendorAvailabilityQueryVariables>;
export const SaveFullAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveFullAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveAvailabilityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveFullAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"breaks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exceptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}}]}}]}}]} as unknown as DocumentNode<SaveFullAvailabilityMutation, SaveFullAvailabilityMutationVariables>;
export const GetVendorBankDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorBankDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorBankDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"accountHolder"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"ifscCode"}},{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}}]}}]}}]} as unknown as DocumentNode<GetVendorBankDetailsQuery, GetVendorBankDetailsQueryVariables>;
export const UpsertVendorBankDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertVendorBankDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertBankDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertVendorBankDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"accountHolder"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"ifscCode"}},{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}}]}}]}}]} as unknown as DocumentNode<UpsertVendorBankDetailsMutation, UpsertVendorBankDetailsMutationVariables>;
export const DeleteVendorBankDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVendorBankDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVendorBankDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteVendorBankDetailsMutation, DeleteVendorBankDetailsMutationVariables>;
export const GetVendorServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendorServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVendorServices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"vendorProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"features"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]} as unknown as DocumentNode<GetVendorServicesQuery, GetVendorServicesQueryVariables>;
export const CreateVendorServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVendorService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVendorServiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVendorService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"features"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]} as unknown as DocumentNode<CreateVendorServiceMutation, CreateVendorServiceMutationVariables>;
export const UpdateVendorServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVendorService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVendorServiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVendorService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vendorProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"features"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]} as unknown as DocumentNode<UpdateVendorServiceMutation, UpdateVendorServiceMutationVariables>;
export const DeleteVendorServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVendorService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVendorService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteVendorServiceMutation, DeleteVendorServiceMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const LoginByPhoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginByPhone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginByPhone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginByPhoneMutation, LoginByPhoneMutationVariables>;
export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sid"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;