import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, SafeAreaView, ScrollView} from 'react-native';
import STYLE from '@styles/Styles';
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { getCurrentLocation } from "@backend/location";
import { pickImage } from "@backend/image";
import LocationPicker from "@components/LocationPicker.js";
import FormField from "@components/FormField";
import SwipeButton from "@components/SwipeButton"; // TODO: check in to make sure swipe button is dynamically populated


export default function PreUploadScreen ({route, navigation}) {

    const [location, setLocation] = React.useState({}); // keep track of actual location
    const [initialLocation, setInitialLocation] = React.useState({}); // track the initial location of the user
    const [itemName, setItemName] = React.useState(''); // track the name of the item
    const [image, setImage] = React.useState(route.params.image); // track the image of the item

    //style for map container, being passed into subcomponent
    const mapContainerStyle = {
        width: STYLE.sizes.screenWidth * 0.9,
        height: STYLE.sizes.screenHeight * 0.2,
        borderRadius: STYLE.borders.normalRound,
        borderColor: 'black',
        overflow: 'hidden',
    }

    const handleLocationSelected = (location) => {
        setLocation(location);
    }

    // this hook is used to obtain the location of the user
    useEffect(() => {
        const getLocation = async () => {
            const location = await getCurrentLocation();
            setInitialLocation(location);
            setLocation(location);
        }
        getLocation();
    }, []);

    
    // populate empty screen if location is not yet obtained
    if (!initialLocation.latitude) {
        return (
            <SafeAreaView style={styles.container} />
        )
    }

    const selectNewImage = async () => {
        const image = await pickImage();
        setImage(image);
    }



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                scrollEnabled={false}
                contentContainerStyle={{marginVertical: STYLE.sizes.screenHeight * 0.03}}
            >
                <View style={{
                    paddingBottom: STYLE.sizes.screenHeight * 0.01,
                }}>
                    <Text adjustsFontSizeToFit style={styles.titleText}>Choose Location</Text>
                    <Text adjustsFontSizeToFit style={styles.description}>Press and hold on the map to pick a location</Text>
                </View>
                <LocationPicker
                    onLocationSelected={handleLocationSelected}
                    initialLocation={initialLocation}
                    containerStyle={mapContainerStyle}
                />
                <FormField onTextChange={setItemName} placeholder="Item Name" />
                <TouchableOpacity 
                    style={styles.imageDisplay}
                    onPress={selectNewImage}
                >
                    <Image
                        source={{uri: image}}
                        resizeMode="cover"
                        style={{
                            flex: 1,
                        }}
                    />

                </TouchableOpacity>
                <SwipeButton />
            </ScrollView>

        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: STYLE.sizes.screenWidth * 0.05,
        borderRadius: STYLE.borders.moreRound,
        marginTop: STYLE.sizes.screenHeight * 0.05,
        marginBottom: STYLE.sizes.screenHeight * 0.03,
    },
    titleText:{
        fontSize: STYLE.sizes.h3,
        fontFamily: STYLE.font.poppinsMed,
        color: STYLE.color.font
    },
    description:{
        fontSize: STYLE.sizes.p,
        fontFamily: STYLE.font.dmsans,
        color: STYLE.color.font
    },
    imageDisplay:{
        width: STYLE.sizes.screenWidth * 0.9,
        height: STYLE.sizes.screenHeight * 0.3,
        borderRadius: STYLE.borders.normalRound,
        borderColor: 'black',
        marginVertical: STYLE.sizes.screenHeight * 0.06,
        overflow: 'hidden',
    }
})