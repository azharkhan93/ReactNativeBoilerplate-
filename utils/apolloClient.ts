import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  Operation,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAuthToken } from './store/authStore';
import { GRAPHQL_API_URL } from './api';

const authBearer = async () => {
  const token = await getAuthToken();
  return token ? `Bearer ${token}` : '';
};

const authLink = setContext(async (_, { headers }) => ({
  headers: { ...headers, authorization: await authBearer() },
}));

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_API_URL.replace(/^http/, 'ws'),
    connectionParams: async () => ({
      headers: { authorization: await authBearer() },
    }),
  }),
);

const isSubscription = ({ query }: Operation) => {
  const def = getMainDefinition(query);
  return def.kind === 'OperationDefinition' && def.operation === 'subscription';
};

export const apolloClient = new ApolloClient({
  link: split(
    isSubscription,
    wsLink,
    authLink.concat(new HttpLink({ uri: GRAPHQL_API_URL })),
  ),
  cache: new InMemoryCache(),
});
