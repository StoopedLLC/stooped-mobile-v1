import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";
import MapView, {Marker} from "react-native-maps";
import SwipeButton from "@components/SwipeButton";
import { formatIsoDate, getNumDays, getNumHours } from "@backend/util";



export default function DetailScreen({navigation, route}) {
    const {id, name, location, address, posted_date, saved_count,distance, image} = route.params.item;

    // const [distance, getDistance] = useEffect('0');

    // const {spherical} = google.maps.importLibrary("geometry");

    // convert date to displyable format
    let displayDate = ''
    const daysSince = getNumDays(posted_date);
    if(daysSince < 1){
        if(getNumHours(posted_date) < 1){
            displayDate = '< 1 hour ago';
        }else{
            displayDate = getNumHours(posted_date) + ' hours ago';
        }
    }else if(daysSince > 30){
        displayDate = Math.floor(daysSince/30) + ' months ago';
    }else{
        displayDate = daysSince + ' days ago';
    }


    let circleInfoDisplay = [];
    let numberOfCircleInfo = 2;
    const circleLabels = ['Saved by', 'Listed'];
    const circleValues = [`${saved_count} others`, displayDate || '1/1/2022'];

    for (let index = 0; index < numberOfCircleInfo; index++ ) {
        circleInfoDisplay.push (
            <View key={index}>
                <View style={styles.center}>
                    <View style={styles.circleDisplay}>
                    </View>


                    <View style={[styles.center, {paddingTop: STYLE.sizes.screenHeight * .005}]}>
                        <Text adjustsFontSizeToFit style={[styles.text, {opacity: .7}]}>{circleLabels[index]}</Text>
                        <Text adjustFontsSizeToFit style={[styles.text, {fontWeight: 'bold'}]}>{circleValues[index]}</Text>
                    </View>
                </View>
            </View>
    
        )
    }


    const backNavigation = () => {
        navigation.goBack();
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{height: STYLE.sizes.screenHeight, flex: 1}}>
                <View style={{height: STYLE.sizes.screenHeight * .35 }}>
                    <ImageBackground style={styles.image}  resizeMode='stretch' source={{uri: image}}>

                        <View style={{display: "flex", flexDirection: "row"}}>

                            {/* TODO: make it so that the syles are scalable */}
                            <TouchableOpacity onPress={backNavigation} style={{backgroundColor: 'white', width: STYLE.sizes.screenWidth * .09, borderRadius: 10, marginLeft: STYLE.sizes.screenWidth * .05, marginTop: STYLE.sizes.screenHeight * 0.03, padding: 2}}>
                                <Ionicons name="arrow-back" size={STYLE.sizes.screenHeight * .035} color="black"/>
                            </TouchableOpacity>


                            <TouchableOpacity style={{
                                position: 'absolute',
                                right: 0,
                                width: STYLE.sizes.screenWidth * .12,
                                marginRight: STYLE.sizes.screenWidth * .05,
                                marginTop: STYLE.sizes.screenHeight * 0.02,
                            }}>
                                <SaveButton item={route.params.item} isSaved={route.params.isSaved || false} />
                            </TouchableOpacity>
                        </View>
                        

                        {/* TODO: fade the bottom of the image */}
                    </ImageBackground>
                </View>


                <View style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: STYLE.sizes.screenHeight * .03,
                    paddingLeft: STYLE.sizes.screenWidth * .1,
                    paddingRight: STYLE.sizes.screenWidth * .1,
                    }}>
                    <Text adjustsFontSizeToFit style={[
                        styles.text, 
                        {fontSize: STYLE.sizes.h2, fontFamily: STYLE.font.dmsansBold}
                    ]}>
                        {name}
                    </Text>
                    <View style={{
                        backgroundColor: STYLE.color.accent.beige, 
                        padding: 10, 
                        borderRadius: 10
                    }}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{`${distance.toFixed(1)} miles`} away</Text>
                    </View>
                </View>


                <View style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    paddingBottom: STYLE.sizes.screenHeight * .02,
                    paddingLeft: STYLE.sizes.screenWidth * .2,
                    paddingRight: STYLE.sizes.screenWidth * .2,
                    paddingTop: STYLE.sizes.screenHeight * .02,
                    }}>
                        {circleInfoDisplay}
                </View>


                <View style={{
                    paddingLeft: STYLE.sizes.screenWidth * .05,
                    paddingRight: STYLE.sizes.screenWidth * .05,
                }}>
                    <Text adjustsFontSizeToFit style={[styles.text, {fontSize: STYLE.sizes.h3, fontFamily: STYLE.font.dmsansMed}]}>
                        Pick up at
                    </Text>
                    <Text adjustsFontSizeToFit style={[
                        styles.text, 
                        {fontSize: 16,flexWrap: 'wrap', fontFamily: STYLE.font.poppins, lineHeight: 30}]}
                    >
                        {address || '25 West 4th Street, New York, NY 10012'}
                    </Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView 
                        style={styles.map} 
                        initialRegion={{
                            latitude: location.latitude || 37.78825,
                            longitude: location.longitude || -122.4324,
                            latitudeDelta: 0.00301,
                            longitudeDelta: 0.001805,
                        }}

                    >
                        <Marker coordinate={location.latitude? location:{latitude: 37.78825, longitude: -122.4324}}>
                            <Image 
                                source={require('@images/map-pin.png')}
                                style={STYLE.mapPin}
                            />
                        </Marker>
                    </MapView>
                </View>

            </ScrollView>

            <View style={{marginBottom: STYLE.sizes.screenHeight * .07}}>
                <SwipeButton 
                    message={"SWIPE TO PICK UP"} 
                    exteriorButtonColor={"#ECBC8C"} 
                    innerButtonColor={"white"} 
                    onSwipeComplete={() => navigation.navigate('Pickup', {item: route.params.item})}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: STYLE.color.background,
        flex: 1,
    },
    text: {
        color: STYLE.color.font
    },
    image: {
        width: STYLE.sizes.screenWidth * 1, 
        height: STYLE.sizes.screenHeight * .36,
    },
    circleDisplay: {
        backgroundColor: "#9C7464", 
        height: STYLE.sizes.screenHeight * .05, 
        width: STYLE.sizes.screenHeight * .05, 
        borderRadius: STYLE.borders.moreRound,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"
    },
    mapContainer: {
        height: STYLE.sizes.screenHeight * .15,
        width: STYLE.sizes.screenWidth * .9,
        alignSelf: 'center',
        borderRadius: STYLE.borders.moreRound,
        overflow: 'hidden',
        borderColor: STYLE.color.font,
        borderWidth: 1,
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .2,
        shadowRadius: 5,
        elevation: 5,
    },
    map: {
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