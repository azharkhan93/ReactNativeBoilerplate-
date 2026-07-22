import { Platform } from 'react-native';

export const GRAPHQL_API_URL = __DEV__
  ? `http://${
      Platform.OS === 'android' ? '10.0.2.2' : 'localhost'
    }:4000/graphql`
  : 'https://27.100.38.251.sslip.io/graphql';

