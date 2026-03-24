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
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: Role;
  requestOtp: SmsResponse;
  verifyOtp: SmsResponse;
};


export type MutationCreateRoleArgs = {
  name: UserRole;
};


export type MutationRequestOtpArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationVerifyOtpArgs = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  roleById: Role;
  roles: Array<Role>;
};


export type QueryRoleByIdArgs = {
  id: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type SmsResponse = {
  __typename?: 'SmsResponse';
  errorCode?: Maybe<Scalars['Float']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  sid?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Available user roles */
export enum UserRole {
  Customer = 'CUSTOMER',
  Provider = 'PROVIDER'
}

export type CreateNewRoleMutationVariables = Exact<{
  roleName: UserRole;
}>;


export type CreateNewRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string, name: UserRole, createdAt: any } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, name: UserRole }> };

export type VerifyOtpMutationVariables = Exact<{
  phone: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'SmsResponse', success: boolean, message?: string | null } };

export type RequestOtpMutationVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type RequestOtpMutation = { __typename?: 'Mutation', requestOtp: { __typename?: 'SmsResponse', success: boolean, message?: string | null, sid?: string | null } };


export const CreateNewRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateNewRoleMutation, CreateNewRoleMutationVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const RequestOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"sid"}}]}}]}}]} as unknown as DocumentNode<RequestOtpMutation, RequestOtpMutationVariables>;