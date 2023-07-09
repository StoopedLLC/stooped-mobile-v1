/*
This component is a modal that pops up when user clicks on the filter button on the top right corner of the page.
It allows users to filter the list of stoops by posted time and price.

props:
    - isVisible: boolean that determines whether the modal is visible or not
    - setIsVisible: function that sets the isVisible state
*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import Modal  from 'react-native-modal';
import STYLE from '@styles/Styles.js';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import TabSelect from './TabSelect';
import GenericButton from './GenericButton';
import { formatIsoDate } from '@backend/util';
import { useNavigation } from '@react-navigation/native';
import { getDistanceInMiles, getCurrentLocation } from '@backend/location';
import { getItem } from '@backend/item';

export default function ItemDetailModal({isVisible, setIsVisible, item}) {
    const nav = useNavigation();


    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => {
                setIsVisible(false)
            }}
            onBackButtonPress={() => setIsVisible(false)}
            style={styles.modal}
            // coverScreen={false}
            backdropOpacity={0.5}
        >
            <View style={styles.modalContentContainer}>
                <View style={{flex: 1, justifyContent:'center'}}>
                    <Image 
                        source={{uri: item.image_links[0]}} 
                        style={{
                            width: STYLE.sizes.screenWidth * 0.5, 
                            height: STYLE.sizes.screenWidth * 0.5,
                            borderRadius: STYLE.borders.normalRound,
                            borderWidth: 1,
                            opacity: 1,
                            borderColor: 'black',
                            alignSelf:'center',
                            }}/>
                    <View style={{paddingTop: STYLE.sizes.screenHeight * 0.01, alignSelf:'center'}}>
                        <Text style={styles.text}>{item && (item.name || 'undefined')}</Text>
                        <Text style={[styles.text,{fontSize: 16, fontFamily: STYLE.font.poppins}]}>
                            {item.type==='claimed'?`Picked up: ${formatIsoDate(item.picked_up_date)}`:`Posted: ${formatIsoDate(item.posted_date)}`}
                        </Text>
                    </View>
                    {
                        item.type ==='saved' &&
                        <GenericButton
                            label='Go to detatil'
                            onPress={async () => {
                                // console.log(item)
                                const itemLoaded = await getItem(item.id);
                                const currLocation = await getCurrentLocation();
                                itemLoaded.distance = getDistanceInMiles(currLocation, itemLoaded.location );
                                itemLoaded.image_links = item.image_links;
                                nav.navigate('Detail', {item: itemLoaded, isSaved: true}) // FIXME: we need a /item endpoint with all data, particuarly address
                                setIsVisible(false)
                            }}
                            style={{marginTop: STYLE.sizes.screenHeight * 0.01}}
                        />
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignSelf: 'center',
        width: STYLE.sizes.screenWidth * .9,
        marginVertical: STYLE.sizes.screenHeight * .3, // used to adjust height of modal
        backgroundColor: STYLE.colors.background + '99',
        borderRadius: STYLE.borders.moreRound,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.8,
    },
    modalContentContainer: {
        flex: 1,
        paddingHorizontal: STYLE.sizes.screenWidth * .05,
        paddingVertical: STYLE.sizes.screenHeight * .02,
    },
    text:{
        fontSize: STYLE.sizes.screenHeight * 0.03,
        color: STYLE.colors.font,
        fontFamily: STYLE.font.poppinsSemiBold,
        textAlign: 'center',
    }
})

