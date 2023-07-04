import React, {useState, useCallback, useEffect, useRef} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal, Alert} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Info } from "react-native-feather";
import MapView, {Marker} from "react-native-maps";
import STYLE from "@styles/Styles";
import NavDisplay from "@components/NavDisplay";
import GenericButton from "@components/GenericButton.js"
import { getCurrentLocation } from "@backend/location";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import { getDistanceInMiles } from "@backend/location";
import { scheduleNotification, cancelNotification } from "@backend/notifications";
import PickupConfirmation from "@components/PickupConfirmation";
import * as Haptics from 'expo-haptics';
import { pickupItem, reportMissingItem } from "@backend/item";
import { getNavigation } from "@backend/location";
import { getUserId } from "@backend/user";


export default function PickupScreen({navigation, route}) {

    const nav = useNavigation();

    const {id, name, location: itemLocation, address, posted_date, saved_count,distance} = route.params.item;
    const [startLocation, setstartLocation] = useState();
    const mapRef = React.useRef(null);
    const [liveLocation, setLiveLocation] = useState();
    const [canPickup, setCanPickup] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [checkInNotification, setCheckInNotification] = useState('');

    const [navInstructions, setNavInstructions] = useState([
        "Walk 0.2 miles",
        "Turn left on 4th St",
        "Turn right on 6th Ave",
    ]);

    // TODO: load navigation related data
    useEffect(() => {
        const dataLoad = async () => {
            const currentLocation = await getCurrentLocation();
            setstartLocation(currentLocation);

            // populate navigation
            const newNavInstructions = [];
            const nav = await getNavigation(currentLocation, id);
            nav.forEach((step) => {
                newNavInstructions.push(step.instructions);
            });
            setNavInstructions(newNavInstructions);
        }
        dataLoad();
    }, []);

    // hook to set zoom level of map
    useEffect(() => {
        if(startLocation){
            mapRef.current.fitToCoordinates([itemLocation, startLocation], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [startLocation]);

    // live update location
    useFocusEffect(
        useCallback(()=>{
            // on focus, "lock in" pick up mode
            const watchPosition = async () => {
                console.log('set watcher');
                return await Location.watchPositionAsync({accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 1}, (loc) => {
                    setLiveLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    });
                })
            }
            let locationWatcher = {};
            watchPosition().then((res) => {
                locationWatcher = res;
            }).catch((err) => {
                console.log(err);
            });


            return () => {
                // Do something when the screen is unfocused, like removing the location watcher
                console.log("unfocused");
                if(locationWatcher){
                    console.log("removing location watcher");
                    locationWatcher.remove();
                }
                
            }
        },[])
    );

    // hook to handle location change
    useEffect(() => {
        if(liveLocation){
            // update distance
            const newDistance = getDistanceInMiles(liveLocation, itemLocation);
            if(newDistance < .075){
                setCanPickup(true);
            }
        }
    }, [liveLocation]);

    // on canPickup change
    useEffect(() => {
        const onPickupChange = async () => {
            if(canPickup){
                await onPickupAllowed();
            }
        }
        onPickupChange();
    }, [canPickup]);
    
    const onPickupAllowed = async () => {
        // vibrate
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // send notification
        scheduleNotification("Look around you!", "Your item is near! Click here to pick up", {seconds: 1});
        const notificationId = await scheduleNotification("How did the stoop go?", "Don't forget to confirm your pick up!", {minutes: 5});
        setCheckInNotification(notificationId);
        // show pick up modal
        setModalVisible(true);
    }


    // event handlers
    const backNavigation = () => {
        navigation.goBack();
    }


    const reportMissing = () => {
        const _missing = async () => {
            const success = await reportMissingItem(id);
            if(success){
                Alert.alert(
                    ":(",
                    "We're very sorry that you couldn't find the item. We'll do better next time!",
                    [
                        {
                            text: "OK",
                        },
                    ],
                    { cancelable: true }
                );
                nav.navigate("Home", {refresh: true});
            }else{
                Alert.alert('Oops!', 'Something went wrong. Please try again.');
            }
        }
        _missing();
    }


    const onMissingClicked = () => {
        Alert.alert(
            "Oops!",
            "Double check around the block! Are you sure you don't see it?",
            [
                {
                    text: "Let me check again",
                },
                {
                    text: "Yes, I'm certain",
                    onPress: () => reportMissing(),
                },
            ],
            { cancelable: true }
        );
    }


    const confirmPickup = async () => {
        setModalVisible(false);
        if(checkInNotification){
            cancelNotification(checkInNotification);
        }
        const userId = await getUserId();
        const success = await pickupItem(userId, id)
        if(success){
            nav.navigate("Success", {item: route.params.item});
        }else{
            Alert.alert(
                "Oops!",
                "Something went wrong with the pickup. Please try again.",
                [
                    {
                        text: "OK",
                    },
                ],
                { cancelable: true }
            );
        }
    }

    const onRefresh = () => {
        (async () =>{
        setstartLocation(await getCurrentLocation());
        })()
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* header section */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: STYLE.sizes.screenHeight * .02,
            }}>
                <TouchableOpacity onPress={backNavigation} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={STYLE.sizes.screenHeight * .035} color="black"/>
                </TouchableOpacity>
                <Text style={{
                    fontSize: STYLE.sizes.h2,
                    color: STYLE.colors.font,
                    fontFamily: STYLE.font.dmsansBold,
                }}>Let's Stoop it!</Text>
                <TouchableOpacity style={styles.infoButton}>
                    <Info stroke={STYLE.colors.font} width={STYLE.sizes.screenHeight * .035} height={STYLE.sizes.screenHeight * .035}/>
                </TouchableOpacity>
            </View>

            {/* map view */}
            <View style={styles.mapView}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: itemLocation.latitude,
                        longitude: itemLocation.longitude,
                    }}
                    showsUserLocation={true}
                >
                    <Marker coordinate={itemLocation.latitude? itemLocation:{latitude: 37.78825, longitude: -122.4324}}>
                        <Image 
                            source={require('@images/map-pin.png')}
                            style={STYLE.mapPin}
                        />
                    </Marker>
                </MapView>
            </View>

            {/* navigation area */}
            <View style={styles.navContainer}>
                <NavDisplay
                    start="Your Location"
                    destination={address || '25 West 4th Street, New York, NY 10012'}
                    instructions={navInstructions}
                    onRefresh={onRefresh}
                />
            </View>

            {/* nav utility */}
            <View style={styles.navKeys}>

            </View>
            {/* button and bottom text */}
            <View style={{
                alignItems: 'center',
                marginVertical: STYLE.sizes.screenHeight * .02,

            }}>
            {
                canPickup?
                (
                <GenericButton
                    label="Click to Pick Up"
                    onPress={() => {setModalVisible(true)}}
                    style={{
                        marginVertical: STYLE.sizes.screenHeight * .005,
                    }}
                />):
                (
                <Text style={{
                    fontSize: STYLE.sizes.h3,
                    color: STYLE.colors.font,
                    fontFamily: STYLE.font.dmsansMed,
                    textAlign: 'center',
                }}>Follow the instructions to get to the item! We will let you know when you are close! </Text>
                )
            }
            </View>
            <PickupConfirmation
                visible={modalVisible}
                onConfirm={confirmPickup}
                onCancel={() => {setModalVisible(false)}}
                onNotFound={() => {onMissingClicked()}}
                setVisible={(newVis)=>{setModalVisible(newVis)}}
                item={route.params.item}
            />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: STYLE.sizes.screenWidth * .05,
    },
    backButton:{
        backgroundColor: 'white', 
        width: STYLE.sizes.screenWidth * .09, 
        borderRadius: 10, 

        padding: 2
    },
    mapView:{
        marginVertical: STYLE.sizes.screenHeight * .02,
        height: STYLE.sizes.screenHeight * .275,
        width: STYLE.sizes.screenWidth * .95,
        alignSelf: 'center',
        borderRadius: STYLE.borders.moreRound,
        // shadow on the bottom right
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:-1,
        elevation: -1,
        flex: 1,
        overflow: 'hidden',
        borderRadius: STYLE.borders.moreRound,
    },
    navContainer:{
        height: STYLE.sizes.screenHeight * .275,
        width: STYLE.sizes.screenWidth * .95,
        alignSelf: 'center',
        borderRadius: STYLE.borders.lessRound,
        backgroundColor: STYLE.colors.accent.darkGray,
    }
})