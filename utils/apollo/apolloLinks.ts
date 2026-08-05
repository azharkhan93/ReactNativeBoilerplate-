import { HttpLink, split, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient, Client } from 'graphql-ws';

import { GRAPHQL_API_URL } from '../api';
import { getAuthToken, clearAuthData } from '../store/authStore';

const GRAPHQL_WS_URL = GRAPHQL_API_URL.replace(/^http/, 'ws');

const getAuthHeader = async (): Promise<string> => {
  const token = await getAuthToken().catch(() => null);
  return token ? `Bearer ${token}` : '';
};

export const authLink = setContext(async (_, { headers }) => ({
  headers: { ...headers, authorization: await getAuthHeader() },
}));

const isAuthErr = (e?: { message?: string; extensions?: Record<string, unknown> }): boolean =>
  e?.extensions?.code === 'UNAUTHENTICATED' || /unauthorized|jwt|401/i.test(e?.message ?? '');

export const errorLink = onError(({ error }) => {
  if (isAuthErr(error) || (CombinedGraphQLErrors.is(error) && error.errors.some(isAuthErr))) {
    resetWebSocketSession().catch(() => null);
    clearAuthData().catch(() => null);
  }
});

export const httpLink = from([errorLink, authLink, new HttpLink({ uri: GRAPHQL_API_URL })]);

const createWsClient = (): Client =>
  createClient({
    url: GRAPHQL_WS_URL,
    webSocketImpl: typeof WebSocket !== 'undefined' ? WebSocket : undefined,
    connectionParams: async () => ({ headers: { authorization: await getAuthHeader() } }),
  });

let wsClient: Client = createWsClient();

export const wsLink = new GraphQLWsLink(wsClient);

export const resetWebSocketSession = async (): Promise<void> => {
  try {
    await wsClient?.dispose();
  } catch (err) {
    if (__DEV__) console.warn('[WS] Reset error:', err);
  } finally {
    wsClient = createWsClient();
  }
};

export const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);
