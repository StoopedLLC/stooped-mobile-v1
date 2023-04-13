/*
    This component allows user to pick a location from a map.
    It contains a map component and user is able to press on the map to select a location.
    The location is then passed to the parent component via a callback function.

    props:
        - onLocationSelected: callback function to pass the location to the parent component
            - the callback function should take in a location object as its parameter
        - initialLocation: initial location to be displayed on the map
        - containerStyle: style for the container
*/



import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, SafeAreaView } from 'react-native';
import STYLE from '@styles/Styles';
import MapView, {Marker} from "react-native-maps";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

export default function LocationPicker(props){

    const [pinLocation, setPinLocation] = React.useState({
        latitude: props.initialLocation.latitude,
        longitude: props.initialLocation.longitude,
    });

    const handleMapPress = (e) => {
        const {latitude, longitude} = e.nativeEvent.coordinate;
        setPinLocation({latitude, longitude});
        props.onLocationSelected({latitude, longitude});
        notificationAsync(NotificationFeedbackType.Success);
    }

    return (
        <View style={props.containerStyle}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: props.initialLocation.latitude,
                    longitude: props.initialLocation.longitude,
                    latitudeDelta: 0.00301,
                    longitudeDelta: 0.001805,
                }}
                onLongPress={handleMapPress}
            >
                <Marker coordinate={pinLocation}>
                    <Image 
                        source={require('@images/map-pin.png')}
                        style={STYLE.mapPin}
                    />
                </Marker>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        elevation: -1,
        flex: 1,
        overflow: 'hidden',
    },
});