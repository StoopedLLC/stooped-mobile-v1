/*
this file contains all services that interact with locations.
It contains the following method:
    - getCurrentLocation: get the current coordinate of the device
*/
import * as Location from 'expo-location';
import { Platform, Alert } from 'react-native';
import { openAppSettings } from './linking';


export const getCurrentLocation = async () => {
    /*
        This function gets the current location of the device.
        

        @return:
            the current location of the device {latitude, longitude}
    */
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        permissionDeniedHandler();
        return;
    }

    let location = await Location.getCurrentPositionAsync({
        accuracy: Platform.OS === 'android' ? Location.Accuracy.Low : Location.Accuracy.Lowest
    });
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }
}

const permissionDeniedHandler = () => {
    /*
        This function handles the case when the user denies the location permission.
    */
    Alert.alert(
        'Location Permission Denied',
        'To find the best stoops near you, we need to know roughly where you are! Please enable location services in your settings.',
        [
            { text: 'Go to setting', onPress: () => openAppSettings() },
            {
                text: 'No',
                onPress: () => {},
                style: 'cancel'
            }
        ],
        { cancelable: true }
    );
}