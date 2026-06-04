/**
 * @format
 */
import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import { getApp, initializeApp } from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

try {
  const app = getApp();
  const messaging = getMessaging(app);
  setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log(
      '[FCM] Background message received:',
      JSON.stringify(remoteMessage, null, 2),
    );
  });
} catch (e) {
  try {
    const app = initializeApp();
    const messaging = getMessaging(app);
    setBackgroundMessageHandler(messaging, async remoteMessage => {
      console.log(
        '[FCM] Background message received:',
        JSON.stringify(remoteMessage, null, 2),
      );
    });
  } catch (err) {
    console.error(
      '[FCM] Failed to register background messaging handler:',
      err,
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
