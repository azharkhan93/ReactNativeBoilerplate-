import { ApolloClient } from '@apollo/client';
import { apolloCache } from './apollo/apolloCache';
import { splitLink } from './apollo/apolloLinks';

export * from './apollo';

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: apolloCache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});
