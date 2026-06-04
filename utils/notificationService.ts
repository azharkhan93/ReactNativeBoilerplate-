import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import { Subject } from 'rxjs';

export interface InAppNotification {
  title: string;
  body: string;
}

export const notificationSubject = new Subject<InAppNotification>();

export const showLocalNotification = (title: string, body: string) => {
  notificationSubject.next({ title, body });
};

const getMessagingInstance = () => {
  const app = getApp();
  return getMessaging(app);
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  try {
    const messaging = getMessagingInstance();
    const authStatus = await requestPermission(messaging);
    return (
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL
    );
  } catch (error) {
    console.error('[FCM] Permission request failed:', error);
    return false;
  }
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn('[FCM] Notification permission denied');
      return null;
    }

    const messaging = getMessagingInstance();
    const token = await getToken(messaging);
    console.log('[FCM] Device Token:', token);
    return token;
  } catch (error) {
    console.error('[FCM] Failed to get token:', error);
    return null;
  }
};

export const listenToForegroundNotifications = () => {
  try {
    const messaging = getMessagingInstance();
    return onMessage(messaging, async remoteMessage => {
      console.log(
        '[FCM] Foreground message received:',
        JSON.stringify(remoteMessage, null, 2),
      );
      if (remoteMessage.notification) {
        showLocalNotification(
          remoteMessage.notification.title ?? 'Notification',
          remoteMessage.notification.body ?? '',
        );
      }
    });
  } catch (error) {
    console.error('[FCM] Failed to register foreground listener:', error);
    return () => {};
  }
};
