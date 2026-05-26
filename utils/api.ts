import { Platform } from 'react-native';

export const GRAPHQL_API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:4000/graphql'
    : 'http://localhost:4000/graphql';

