/*
    This file contains all functions that pertains to the camera service.
    It contains the following functions:
        - getCameraPermission: get the camera permission from the user
        - getCameraRollPermission: get the camera roll permission from the user
*/

import { Platform, Alert } from 'react-native';
import { requestCameraPermissionsAsync } from 'expo-camera';
import { openAppSettings } from './linking';


const getCameraPermission = async () => {
    /*
        This function gets the camera permission from the user.
        If the user denies the permission, it will show an alert to the user to enable the permission.
    */
    const { status } = await requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            'Camera Access Denied',
            'Unfortunately, we cannot use the camera without your permission. You can still upload photos from your camera roll.\nIf you wish to use the camera, please enable camera permission in your settings.',
            [
                { text: 'Go to setting', onPress: () => openAppSettings() },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                }
            ],
            { cancelable: true }
        );
        return false;
    }
    return true;
}

export {
    getCameraPermission,
}
