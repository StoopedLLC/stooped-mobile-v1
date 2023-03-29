/*
This component is used for saving an item to user's saved items list. 
When pressed, it will change color and add the item to the user's saved items list. 
When pressed again, it will change color back and remove the item from the user's saved items list.

This component will be used on the DetailScreen and the ItemFrame component.

Props:
    item: the item to be saved
*/
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback } from 'react-native';
import STYLE from '@styles/Styles';
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

export default function SaveButton(props){


    const [saved, setSaved] = useState(false);

    useEffect(()=>{
        if(saved){
            notificationAsync(NotificationFeedbackType.Success);
            // TODO: add item to user's saved items list
        }else{
            // notificationAsync(NotificationFeedbackType.Warning);
            // TODO: remove item from user's saved items list
        }
    }, [saved]);



    return (
        <TouchableNativeFeedback 
            onPress={()=>{
                if(saved){
                    setSaved(false);

                }else{
                    setSaved(true);
                }
                console.log('save button pressed');
            }}
        >
            <View
            style={{
                backgroundColor: STYLE.color.font,
                borderRadius: STYLE.borders.normalRound,
                paddingHorizontal: STYLE.sizes.screenWidth * 0.015,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: STYLE.sizes.screenWidth * 0.015,
            }}
            >
            {
                saved ?
                <Image source={require('../assets/images/save-button-full.png')}
                    style={{width: STYLE.sizes.screenWidth * 0.062, height: STYLE.sizes.screenWidth * 0.1}}/>
                :
                <Image source={require('../assets/images/save-button-empty.png')}
                    style={{width: STYLE.sizes.screenWidth * 0.062, height: STYLE.sizes.screenWidth * 0.1}}/>
            }
            </View>
        </TouchableNativeFeedback>
    )
}