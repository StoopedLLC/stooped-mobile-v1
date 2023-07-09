/*
This component is used for saving an item to user's saved items list. 
When pressed, it will change color and add the item to the user's saved items list. 
When pressed again, it will change color back and remove the item from the user's saved items list.

This component will be used on the DetailScreen and the ItemFrame component.

Props:
    item: the item to be saved
*/
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback} from 'react-native';
import STYLE from '@styles/Styles';
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { addToSavedItem, removeFromSavedItem } from '@backend/item';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

export default function SaveButton(props){


    const [saved, setSaved] = useState(props.isSaved || false);




    return (
        // NOTE: has to be TouchableWithoutFeedback because TouchableNativeFeedback doesn't work with parent component
        <TouchableWithoutFeedback 
            onPress={()=>{
                if(!saved){
                    notificationAsync(NotificationFeedbackType.Success);
                    const success = addToSavedItem({id: 'b92c36a8-b55b-431b-b14a-1c237ef0e0b9'}, props.item);
                    setSaved(true);

                }else{
                    const success = removeFromSavedItem({id: 'b92c36a8-b55b-431b-b14a-1c237ef0e0b9'}, props.item);
                    setSaved(false);
                }
                console.log('save button pressed');
            }}
        >
            <View
            style={{
                backgroundColor: 'rgba(128, 128, 128, 0.6)',
                borderRadius: STYLE.borders.lessRound,
                paddingHorizontal: STYLE.sizes.screenWidth * 0.015,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: STYLE.sizes.screenWidth * 0.025,
                marginVertical: STYLE.sizes.screenWidth * 0.015,
            }}
            >
            {
                saved ?
                <FontAwesome name="bookmark" size={30} color="white" />
                // <Image source={require('../assets/images/save-button-full.png')}
                //     style={{width: STYLE.sizes.screenWidth * 0.062, height: STYLE.sizes.screenWidth * 0.1}}/>
                :
                <Feather name="bookmark" size={30} color="white" />
                // <Image source={require('../assets/images/save-button-empty.png')}
                //     style={{width: STYLE.sizes.screenWidth * 0.062, height: STYLE.sizes.screenWidth * 0.1}}/>
            }
            </View>
        </TouchableWithoutFeedback>
    )
}