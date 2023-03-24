/*
This contains the item frame component served on the front page of the app. It will be plugged into the scroll panel


props:
    item: the item object
*/

import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import STYLE from '../src/styles/styles';


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
                <Text>ayo wass up</Text>
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
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        borderRadius: STYLE.borders.moreRound,
    }
});