/*
    This file contains all functions that pertains to the image and the camera service.
    It contains the following functions:
        - getCameraPermission: get the camera permission from the user
        - pickImage: get the image from the user's camera roll
*/

import { Platform, Alert } from 'react-native';
import { requestCameraPermissionsAsync } from 'expo-camera';
import { openAppSettings } from './linking';
import * as ImagePicker from 'expo-image-picker';


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

const pickImage = async (allowVideo = false, editable = false, quality = 0.2) => {
    /*
        This function gets the image from the user's camera roll.
        If the user denies the permission, it will show an alert to the user to enable the permission.

        @params:
            allowVideo: boolean, whether to allow video to be selected
            editable: boolean, whether to allow the user to edit the image
            quality: number, the quality of the image

        @return: the image uri
    */
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: allowVideo ? ImagePicker.MediaTypeOptions.All : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: editable,
        aspect: [4, 3],
        quality: quality,
    });

    if (!result.canceled) {
        return result.assets[0].uri;
    }
    return null;
}





export {
    getCameraPermission,
    pickImage,
}
