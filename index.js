/**
 * Application Entry Point
 * @format
 */
import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerBackgroundNotificationHandler } from './utils/notificationService';

registerBackgroundNotificationHandler();

AppRegistry.registerComponent(appName, () => App);
if (appName !== 'Tab2wash') {
  AppRegistry.registerComponent('Tab2wash', () => App);
}
AppRegistry.registerComponent('NativeApp', () => App);
AppRegistry.registerComponent('tab2wash', () => App);
AppRegistry.registerComponent('main', () => App);
