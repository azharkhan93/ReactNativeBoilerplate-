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
    "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.CreateNewRoleDocument,
    "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n": typeof types.GetRolesDocument,
    "\n  query GetHomeData {\n    items {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GetHomeDataDocument,
};
const documents: Documents = {
    "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CreateNewRoleDocument,
    "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n": types.GetRolesDocument,
    "\n  query GetHomeData {\n    items {\n      id\n      name\n      description\n    }\n  }\n": types.GetHomeDataDocument,
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
export function gql(source: "\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNewRole($roleName: UserRole!) {\n    createRole(name: $roleName) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetRoles {\n    roles {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetHomeData {\n    items {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetHomeData {\n    items {\n      id\n      name\n      description\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;