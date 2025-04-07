import {Platform, ToastAndroid} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions';


export const requestGalleryPermission = async () => {
  if (Platform.OS == 'android') {
    const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      ToastAndroid.show(
        'Permission denied. Please enable it in settings.',
        ToastAndroid.SHORT,
      );
      return false;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      ToastAndroid.show(
        'Permission denied. Please enable it in settings.',
        ToastAndroid.SHORT,
      );
      return false;
    }
  }
};
