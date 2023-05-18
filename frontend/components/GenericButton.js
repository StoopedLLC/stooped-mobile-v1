import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, SafeAreaView } from 'react-native';
import STYLE from '@styles/Styles';


export default function GenericButton(props){
    const style = props.style || {};
    const labelStyle = props.labelStyle || {};



    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.button, style]}>
                <Text adjustsFontSizeToFit style={[styles.buttonText, labelStyle]}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: STYLE.colors.accent.yellow,
        borderRadius: STYLE.borders.normalRound,
        padding: STYLE.sizes.screenHeight * .01,
        width: STYLE.sizes.screenWidth * .8,
        alignItems: 'center',
    },
    buttonText:{
        color: STYLE.colors.font,
        fontSize: STYLE.sizes.p,
        fontFamily: STYLE.font.poppinsMed,
    }
});