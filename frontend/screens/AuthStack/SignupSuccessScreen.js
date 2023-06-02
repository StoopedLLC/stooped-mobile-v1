import React, {useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GenericButton from '@components/GenericButton';
import STYLE from '@styles/Styles';

export default function SignupSuccessScreen({navigation, route}){


    const onButtonPress = () => {
        navigation.navigate('Home');
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={require('@images/SignupSuccessBackground.png')} style={styles.imageContainer}>
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Text adjustsFontSizeToFit style={styles.titleText}>{`Welcome to Stooped, ${route.params.data.firstName}`}</Text>
                        <Text adjustsFontSizeToFit style={styles.subtitleText}>Let the treasure hunt begin</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <GenericButton
                            label="Begin my journey!"
                            onPress={() => navigation.navigate('Stooped')}
                            style={{backgroundColor: STYLE.colors.accent.blue, width: STYLE.sizes.screenWidth * 0.7}}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        paddingHorizontal: STYLE.sizes.screenWidth * 0.1,
        paddingVertical: STYLE.sizes.screenHeight * 0.05,
        alignItems: 'center',
        justifyContent:'center'
    },
    imageContainer: {
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // transform: [{scaleX: 1.2}, {scaleY: 1.2}],
        height: '100%',
    },
    content:{
        flex: 0.3
    },
    buttonContainer:{
        flex: 0.3,
    },
    titleText:{
        color: STYLE.colors.font,
        fontFamily: STYLE.font.dmsansBold,
        fontSize: STYLE.sizes.h2,
    },
    subtitleText:{
        color: STYLE.colors.font,
        fontFamily: STYLE.font.poppins,
        fontSize: STYLE.sizes.h3,
        marginVertical: STYLE.sizes.screenHeight * 0.02
    }
});
