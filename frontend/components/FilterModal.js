/*
This component is a modal that pops up when user clicks on the filter button on the top right corner of the page.
It allows users to filter the list of stoops by posted time and price.

props:
    - onConfirm: function that is called when user clicks on the confirm button
    - isVisible: boolean that determines whether the modal is visible or not
    - setIsVisible: function that sets the isVisible state
    - initialValues: object that contains the initial values of the filter
*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import Modal  from 'react-native-modal';
import STYLE from '@styles/Styles.js';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import TabSelect from './TabSelect';
import GenericButton from './GenericButton';
import { BlurView } from 'expo-blur';

export default function FilterModal(props) {

    const {initialValues} = props

    const [distance, setDistance] = useState(props.initialValues.distance)
    const [sortBy, setSortBy] = useState(props.initialValues.sortBy)
    const sortOptions = [
        {name: 'Distance', value: 'distance'},
        {name: 'Saved Count', value: 'savedCount'},
        {name: 'Posted Time', value: 'posted_date'},
    ]

    const [postedWithin, setPostedWithin] = useState(props.initialValues.postedWithin)
    const postedWithinOptions = [
        {name: 'an hour', value: 1},
        {name: 'today', value: 24},
        {name: '3 days', value: 72},
        {name: 'this week', value: 168},
    ]

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => {
                props.setIsVisible(false)
                props.onConfirm({distance, sortBy, postedWithin})
            }}
            onBackButtonPress={() => props.setIsVisible(false)}
            style={styles.modal}
            // coverScreen={false}
            backdropOpacity={0.4}
        >
            <View style={styles.modalContentContainer}>
                <View style={{flex: 1, justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <Text style={[styles.headerText, {fontSize: STYLE.sizes.h3}]} adjustsFontSizeToFit >Filter and Sort</Text>
                        <TouchableOpacity onPress={()=>{
                            setDistance(props.initialValues.distance)
                            // FIXME: reset doesn't work for the following two
                            setSortBy(props.initialValues.sortBy) 
                            setPostedWithin(props.initialValues.postedWithin)
                        }} style={styles.resetButton}>
                            <View style={{flex: 1}}>
                                <Text adjustsFontSizeToFit style={styles.resetButtonText}>Reset</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>

                        <View>
                            <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                                <Text adjustsFontSizeToFit style={styles.headerText}>Distance: </Text>
                                <Text adjustsFontSizeToFit style={[styles.headerText, {color: STYLE.color.accent.gray}]}>{`${(distance / 1600).toFixed(1)} miles`}</Text>
                            </View>
                            <Slider
                                style={{width: 'auto' , height: 40}}
                                minimumValue={0}
                                maximumValue={32000}
                                value={distance}
                                onValueChange={setDistance}
                                maximumTrackTintColor="#FFFFFF"
                                minimumTrackTintColor={STYLE.colors.accent.yellow}
                            />
                        </View>
                        <View style={styles.optionPan}>
                            <Text adjustsFontSizeToFit style={styles.headerText}>Posted within: </Text>
                            <TabSelect
                                tabs={postedWithinOptions}
                                onTabChange={setPostedWithin}
                                selectedValue={postedWithin}
                                themeColor={STYLE.colors.accent.yellow}
                            />
                        </View>
                        <View>
                            <Text adjustsFontSizeToFit style={styles.headerText}>Sort By: </Text>
                            <TabSelect
                                tabs={sortOptions}
                                onTabChange={setSortBy}
                                selectedValue={sortBy}
                                themeColor={STYLE.colors.accent.yellow}
                            />
                        </View>
                        <GenericButton
                            label='Confirm'
                            onPress={() => {
                                props.setIsVisible(false)
                                props.onConfirm({radius: distance, sortBy, time_posted: postedWithin})
                            }}
                            style={{marginVertical: STYLE.sizes.screenHeight * .02}}
                        />
                    </View>
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
        backgroundColor: 'rgba(180, 180, 180, 0.3)',
        borderRadius: STYLE.borders.moreRound,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    modalContentContainer: {
        flex: 1,
        paddingHorizontal: STYLE.sizes.screenWidth * .05,
        paddingVertical: STYLE.sizes.screenHeight * .02,
        borderRadius: STYLE.borders.moreRound,
        // shadowColor: 'black',
        // shadowOffset: { width: 5, height: 5 },
        // shadowOpacity: 1,
        // shadowRadius: 5,
        // borderRadius: STYLE.borders.moreRound,
        
    },
    modalContainer: {
    },

    resetButton:{
        // borderRadius: STYLE.borders.moreRound,
        // borderWidth: 2,
        // borderColor: STYLE.colors.accent.red,
    },
    resetButtonText:{
        fontSize: STYLE.sizes.screenHeight * .02,
        fontFamily: STYLE.font.dmsans,
        color: STYLE.colors.accent.red,
    },
    headerText:{
        fontSize: STYLE.sizes.screenHeight * .02,
        fontFamily: STYLE.font.dmsansMed,
        color: STYLE.colors.font,
        
    },
    optionPan:{
        marginVertical: STYLE.sizes.screenHeight * .02,
    }
})

