import { Platform } from 'react-native';

export const GRAPHQL_API_URL = typeof __DEV__ !== 'undefined' && !__DEV__
  ? 'https://nestjsgqltest.onrender.com/graphql'
  : `http://${Platform.OS === 'android' ? '10.0.2.2' : 'localhost'}:4000/graphql`;

