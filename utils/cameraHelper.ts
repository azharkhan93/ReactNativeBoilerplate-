import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

export const CAMERA_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
})!;

export const checkCameraPermission = async (): Promise<boolean> => {
  try {
    const status = await check(CAMERA_PERMISSION);
    if (status === RESULTS.GRANTED) return true;
    const requestStatus = await request(CAMERA_PERMISSION);
    return requestStatus === RESULTS.GRANTED;
  } catch {
    return false;
  }
};

export const capturePhotoWithCamera = async (): Promise<string | null> => {
  const hasPermission = await checkCameraPermission();
  if (!hasPermission) return null;

  return new Promise(resolve => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
        saveToPhotos: false,
      },
      (response: ImagePickerResponse) => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]?.uri
        ) {
          resolve(response.assets[0].uri);
        } else {
          resolve(null);
        }
      },
    );
  });
};

export const selectPhotoFromLibrary = async (): Promise<string | null> => {
  return new Promise(resolve => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      },
      (response: ImagePickerResponse) => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]?.uri
        ) {
          resolve(response.assets[0].uri);
        } else {
          resolve(null);
        }
      },
    );
  });
};
