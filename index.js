/**
 * @format
 */

// Import polyfill for crypto.getRandomValues (required for Apollo Client in React Native)
import 'react-native-get-random-values';

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM] Background message:', JSON.stringify(remoteMessage, null, 2));
});

AppRegistry.registerComponent(appName, () => App);

