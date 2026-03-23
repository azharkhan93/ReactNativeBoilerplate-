import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

import { GRAPHQL_API_URL } from "./api";

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
