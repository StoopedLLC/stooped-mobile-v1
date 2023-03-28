/*

This is the carousel component that is used to display the list of items in the home screen.
As an user, I want to be able to scroll through the list of items in the home screen.


XXX: Although the carousel works, I do not feel like the dependency is stable and reliable.
In my opinion, if we have devs who are more proficient in front end, we should aim to implement this ourselves.
Also leaves more room for customization and more complex animations and features.

props:
    data: the list of items to be displayed, in the form of an array of item objects
*/



import React, { useEffect, useCallback, useState } from 'react';
import STYLE from '../src/styles/styles.js';
import Carousel from 'react-native-reanimated-carousel';
import ItemFrame from './ItemFrame';
import { View, Text, Dimensions, StyleSheet, Image, TouchableNativeFeedback, SafeAreaView, ScrollView } from 'react-native';


export default function CarouselList(props){

    const renderItem = ({item, index}) => {
        const {name, location, id} = item;
        return (
            <View style={styles.frame} key={index}>
                <ItemFrame item={{name: 'name', location:{}, id:'123123123'}}/>
            </View>
        )
    }


    return (
        <Carousel
            data={props.data}
            renderItem={renderItem}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').width}
            // layout={'default'}
        />

    )
}

const styles = StyleSheet.create({
    frame:{
        width: STYLE.sizes.screenWidth * 0.9,
        height: STYLE.sizes.screenWidth * 0.9,
    },
})