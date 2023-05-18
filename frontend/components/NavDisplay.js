/* 
This component will display the navigation instruction on the pickup page.
It will lay out the step by step instructions for user to follow, which is retrieved from google api on the parent component.

props:
    instructions: array of instructions in string
    start (str): the starting location of the user
    destination (str) : the destination, which is the location of the item
*/


import React, {useState, useCallback, useEffect} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from "@styles/Styles";
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';


export default function NavDisplay(props){


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* starting location */}
                <StepDisplay type='start' text={props.start} isLocation={true} />

                {/* steps */}
                {
                    props.instructions.map((instruction, index) => {
                        return (
                            <StepDisplay key={index} type='step' text={instruction} isLocation={false} />
                        )
                    })
                }

                {/* destination */}
                <StepDisplay type='end' text={props.destination} isLocation={true} />
            </ScrollView>
            {/* refresh circle */}
            <View>
                <TouchableOpacity style={styles.refreshButton} onPress={props.onRefresh}>
                    <FontAwesome name="refresh" size={STYLE.sizes.screenHeight * 0.02} color={STYLE.colors.font} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const StepDisplay = ({type, text, isLocation}) => {

    let icon = null;
    if(type==='step'){
        icon = <Entypo name="squared-cross" size={STYLE.sizes.screenHeight * 0.025} color={STYLE.colors.accent.blue} />
    }else if(type==='start'){
        icon = <Ionicons name="md-person-circle-outline" size={STYLE.sizes.screenHeight * 0.025} color={STYLE.colors.font} />
    }else if(type==='end'){
        icon = <Image source={require('@images/map-pin.png')} style={{width: STYLE.sizes.screenHeight * 0.025, height: STYLE.sizes.screenHeight * 0.04, resizeMode:'contain'}} />
    }


    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepLeft}>
                {icon}
                {
                    type!=='end' && <View style={styles.dashedLine} />
                }
            </View>
            <View style={{flex: 0.05}}/>
            <View style={styles.stepRight}>
                {
                    isLocation && text.indexOf(',')!==-1?(
                        <>
                        <Text adjustsFontSizeToFit style={styles.stepText}>{text.substring(0,text.indexOf(', '))}</Text>
                        <Text adjustsFontSizeToFit style={styles.stepText}>{text.substring(text.indexOf(', ')+2)}</Text>
                        </>
                    ):(
                        <Text adjustsFontSizeToFit style={styles.stepText}>{text}</Text>
                    )
                }
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: STYLE.sizes.screenWidth * 0.03,
        flexDirection: 'row',
    },
    stepContainer:{
        flexDirection: 'row',
        // height: STYLE.sizes.screenHeight * 0.1,
        marginVertical: STYLE.sizes.screenHeight * 0.01,
    },
    stepLeft:{
        flex: 0.15,
        alignItems: 'center',
    },
    stepRight:{
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    stepText:{
        fontSize: STYLE.sizes.screenHeight * 0.02,
        fontFamily: STYLE.font.poppins,
        color: STYLE.colors.font,
    },
    dashedLine:{
        marginTop: STYLE.sizes.screenHeight * 0.01,
        width: 2,
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: STYLE.colors.accent.blue,

    },



});
