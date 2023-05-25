/*
    This component represents the pop up modal that appears when a user is near an item.
    
    Props:
        - item: the item that the user is near
        - onConfirm: the function to call when the user confirms that they have picked up the item
        - onCancel: the function to call when the user cancels the pickup
        - onNotFound: the function to call when the user reports that the item is not found
        - visible: whether or not the modal is visible
        - setVisible: the function to call to set the visibility of the modal
*/
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import STYLE from '@styles/Styles.js';
import GenericButton from '@components/GenericButton.js';
import { Ionicons } from '@expo/vector-icons'; 

export default function PickupConfirmation({ item, onConfirm, onCancel, onNotFound, visible, setVisible }) {

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onBackButtonPress={() => setVisible(false)}
            style={styles.modal}
            // coverScreen={false}
            backdropOpacity={0.5}
        >

            <View style={styles.modalContentContainer}>
                <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                    <Ionicons name="close" size={STYLE.sizes.p} color={STYLE.colors.font} />
                </TouchableOpacity>
                <Text style={styles.title}>Confirm your pickup</Text>
                <Image source={{ uri: item.image || 'https://cdn-images.article.com/products/SKU416/2890x1500/image88321.jpg' }} style={styles.image} />
                <View style={{alignSelf: 'center'}}>
                    <Text style={styles.hintText}>{'The item should be near!\nLook around you...'}</Text>
                </View>
                <View style={{marginVertical: STYLE.sizes.screenHeight * 0.01}}>
                    <GenericButton
                        label="I don't see it..."
                        onPress={onNotFound}
                        style={[styles.button, { backgroundColor: STYLE.colors.accent.gray}]}
                        labelStyle={styles.buttonLabel}
                    />
                    <GenericButton
                        label="Let's stoop it!"
                        onPress={onConfirm}
                        style={[styles.button, { backgroundColor: STYLE.colors.accent.green }]}
                        labelStyle={styles.buttonLabel}
                    />
                </View>


            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        width: STYLE.sizes.screenWidth * .9,
        marginVertical: STYLE.sizes.screenHeight * .2,
        backgroundColor: STYLE.colors.background,
        borderRadius: STYLE.borders.moreRound,
    },
    modalContentContainer: {
        flex: 1,
        paddingHorizontal: STYLE.sizes.screenWidth * .05,
        paddingVertical: STYLE.sizes.screenHeight * .02,
    },
    modalContainer: {
    },
    button:{
        width: STYLE.sizes.screenWidth * .5,
        alignSelf: 'center',
        borderRadius: STYLE.borders.normalRound,
        marginVertical: STYLE.sizes.screenHeight * .01,
    },
    buttonLabel:{
        fontSize: STYLE.sizes.screenHeight * .018,
    },
    title:{
        fontSize: STYLE.sizes.p,
        fontFamily: STYLE.font.poppinsMed,
        color: STYLE.colors.font,
        marginVertical: STYLE.sizes.screenHeight * .01,
    },
    image:{
        width: STYLE.sizes.screenWidth * .7,
        height: STYLE.sizes.screenWidth * .5,
        alignSelf: 'center',
        borderRadius: STYLE.borders.lessRound,
    },
    cancelButton:{
        position: 'absolute',
        top: STYLE.sizes.screenHeight * .02,
        right: STYLE.sizes.screenWidth * .05,
        borderRadius: STYLE.borders.lessRound,
        backgroundColor: STYLE.colors.accent.red,
    },
    hintText:{
        fontSize: STYLE.sizes.p,
        fontFamily: STYLE.font.poppinsReg,
        color: STYLE.colors.font,
        textAlign: 'flex-start',
        marginVertical: STYLE.sizes.screenHeight * .01,
        marginTop: STYLE.sizes.screenHeight * .02,
    }

})
