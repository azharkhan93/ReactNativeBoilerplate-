import { Platform } from 'react-native';

export const VPS_GRAPHQL_API_URL = 'https://27.100.38.251.sslip.io/graphql';


export const LOCAL_GRAPHQL_API_URL = `http://${
  Platform.OS === 'android' ? '10.0.2.2' : '192.168.1.17'
}:4000/graphql`;

export const GRAPHQL_API_URL = __DEV__
  ? LOCAL_GRAPHQL_API_URL
  : VPS_GRAPHQL_API_URL;
