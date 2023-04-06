import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";

import SwipeButton from "@components/SwipeButton";



export default function DetailScreen({navigation}) {


    let circleInfoDisplay = [];
    let numberOfCircleInfo = 3;
    let circleValues = ['Condition', 'Sorted by', 'Listed'];

    for (let index = 0; index < numberOfCircleInfo; index++ ) {
        circleInfoDisplay.push (
            <View key={index}>
                <View style={styles.center}>
                    <View style={styles.circleDisplay}>
                    </View>


                    <View style={[styles.center, {paddingTop: STYLE.sizes.screenHeight * .01}]}>
                        <Text style={[styles.text, {opacity: .7}]}>{circleValues[index]}</Text>
                        <Text style={styles.text}>temp</Text>
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
                    <ImageBackground style={styles.image}  resizeMode='stretch' source={require('@images/temp__image.png')}>

                        <View style={{display: "flex", flexDirection: "row"}}>

                            {/* TODO: make it so that the syles are scalable */}
                            <TouchableOpacity onPress={backNavigation} style={{backgroundColor: 'white', width: STYLE.sizes.screenWidth * .09, borderRadius: 10, marginLeft: STYLE.sizes.screenWidth * .05, marginTop: STYLE.sizes.screenHeight * 0.03, padding: 2}}>
                                <Ionicons name="arrow-back" size={STYLE.sizes.screenHeight * .035} color="black"/>
                            </TouchableOpacity>


                            {/* TODO: Make it so the bookmark works and change the sizing */}
                            <TouchableOpacity style={{
                                position: 'absolute',
                                right: 0,
                                width: STYLE.sizes.screenWidth * .12,
                                marginRight: STYLE.sizes.screenWidth * .05,
                                marginTop: STYLE.sizes.screenHeight * 0.02,
                            }}>
                                <SaveButton />
                            </TouchableOpacity>
                        </View>
                        

                        {/* TODO: fade the bottom of the image */}
                    </ImageBackground>
                </View>


                <View style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between",
                    paddingTop: STYLE.sizes.screenHeight * .03,
                    paddingLeft: STYLE.sizes.screenWidth * .1,
                    paddingRight: STYLE.sizes.screenWidth * .1,
                    }}>
                    <Text style={[styles.text, {fontSize: STYLE.sizes.screenHeight * .025}]}>Desk</Text>


                    <View style={{backgroundColor: '#9C7464', padding: 10, borderRadius: 10}}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>0.2 miles away</Text>
                    </View>
                </View>


                <View style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    paddingBottom: STYLE.sizes.screenHeight * .03,
                    paddingLeft: STYLE.sizes.screenWidth * .1,
                    paddingRight: STYLE.sizes.screenWidth * .1,
                    paddingTop: STYLE.sizes.screenHeight * .03,
                    }}>
                        {circleInfoDisplay}
                </View>


                <View style={{
                    paddingLeft: STYLE.sizes.screenWidth * .05,
                    paddingRight: STYLE.sizes.screenWidth * .05,
                    }}>
                    <Text style={[styles.text, {fontSize: STYLE.sizes.screenHeight * .025,flexWrap: 'wrap', lineHeight: 30, letterSpacing: 1.05}]}>
                        Temporary holder for the value . jsfsdfjhsfkjhfkjdhsjkfsjfhkjsfhjkshfjksh
                    </Text>
                </View>

            </ScrollView>

            <View style={{marginBottom: STYLE.sizes.screenHeight * .07}}>
                <SwipeButton />
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
    }


});