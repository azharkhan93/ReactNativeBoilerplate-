import { Platform } from 'react-native';

export const GRAPHQL_API_URL = __DEV__
  ? `http://${
      Platform.OS === 'android' ? '10.0.2.2' : 'localhost'
    }:4000/graphql`
  : 'https://nestjsgqltest.onrender.com/graphql';
