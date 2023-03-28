/*
This contains the item frame component served on the front page of the app. It will be plugged into the scroll panel


props:
    item: the item object
*/

import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import STYLE from '../src/styles/styles';
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import SaveButton from './SaveButton';


export default function ItemFrame(item){
    const navigation = useNavigation();
    const {id, name, location, } = item;

    


    return(
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Item', {id: id})}>
            <ImageBackground 
                source={{uri:'https://media.cntraveler.com/photos/545d0f5335a91eee7e7967f4/master/pass/new-york-city-sunsets-tout.jpg'}} // TODO: replace with item image
                resizeMode="cover"
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
            >
                {/* bottom section */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: STYLE.sizes.screenWidth * 0.02,
                    marginHorizontal: STYLE.sizes.screenWidth * 0.03,
                }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.itemName}>{name || 'Desk'}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../src/images/map-pin-symbol.png')} 
                                style={{width: STYLE.sizes.screenWidth * 0.0355, height: STYLE.sizes.screenWidth * 0.05}}/>
                            <Text style={styles.location}>{location || 'West 4th St'}</Text>
                        </View>
                    </View>
                    <SaveButton item={item}/>
                </View>


            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: STYLE.borders.moreRound,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        // drop shadow
    },
    imageStyle: {
        borderRadius: STYLE.borders.moreRound,
    },
    infoBox: {
        paddingHorizontal: STYLE.sizes.screenWidth * 0.03,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: STYLE.borders.moreRound,
        paddingVertical: STYLE.sizes.screenWidth * 0.0075,
    },
    itemName: {
        color: STYLE.color.font, 
        fontSize: STYLE.sizes.h2, 
        fontFamily: STYLE.font.poppinsSemiBold
    },
    location:{
        color: STYLE.color.font, 
        fontSize: STYLE.sizes.h3, 
        fontFamily: STYLE.font.dmsansMed,
        paddingLeft: STYLE.sizes.screenWidth * 0.015,
    },

});