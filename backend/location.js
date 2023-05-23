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

export const getDistanceInMiles = (startLocation, endLocation) => {
    /*
        This function calculates the distance between two locations in miles.

        @params:
            startLocation: the starting location {latitude, longitude}
            endLocation: the ending location {latitude, longitude}

        @return:
            the distance in miles between the two locations
    */
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }
    const R = 3958.8; // Radius of the earth in miles
    const dLat = deg2rad(endLocation.latitude - startLocation.latitude);  // deg2rad below
    const dLon = deg2rad(endLocation.longitude - startLocation.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(startLocation.latitude)) * Math.cos(deg2rad(endLocation.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
}
