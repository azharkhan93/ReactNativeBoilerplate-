import { InMemoryCache } from '@apollo/client';

export const apolloCache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    Query: {
      fields: {
        nearbyProviders: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        searchVendors: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        vendorBookings: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Vendor: {
      keyFields: ['id'],
    },
    Booking: {
      keyFields: ['id'],
    },
    User: {
      keyFields: ['id'],
    },
    CustomerProfile: {
      keyFields: ['id'],
    },
  },
});

export const cache = apolloCache;

export const pruneApolloCache = (): void => {
  try {
    apolloCache.gc();
  } catch (error) {
    if (__DEV__) {
      console.warn('[ApolloCache] Cache pruning warning:', error);
    }
  }
};
