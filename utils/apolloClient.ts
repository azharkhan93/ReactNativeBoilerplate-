import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GRAPHQL_API_URL } from './api';
import { getAuthToken } from './store/authStore';

const GRAPHQL_WS_URL = GRAPHQL_API_URL.replace(/^http/, 'ws');

const getAuthHeader = async (): Promise<string> => {
  try {
    const token = await getAuthToken();
    return token ? `Bearer ${token}` : '';
  } catch {
    return '';
  }
};

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: await getAuthHeader(),
  },
}));

const httpLink = authLink.concat(new HttpLink({ uri: GRAPHQL_API_URL }));

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS_URL,
    webSocketImpl: WebSocket,
    connectionParams: async () => ({
      headers: { authorization: await getAuthHeader() },
    }),
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
