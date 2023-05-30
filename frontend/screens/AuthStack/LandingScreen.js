import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GenericButton from '@components/GenericButton';
import STYLE from '@styles/Styles';

export default function LandingScreen({navigation, route}){
    return (
        <View style={{flex: 1}}>
            <ImageBackground 
                source={require('@images/landing.jpeg')}
                resizeMode='cover' 
                style={styles.imageContainer}
                imageStyle={{
                    left: -130,
                    // top: -50,
                }}
            >
                <View style={styles.overlay}>
                    <View style={styles.topContainer}>
                        <Text adjustsFontSizeToFit style={styles.title}>STOOPED</Text>
                        <Text adjustsFontSizeToFit style={styles.subtitle}>A community of free stuff</Text>
                        <Text adjustsFontSizeToFit style={styles.subtitle}>Let the treasure hunt begin Today!</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <GenericButton
                            label='Sign Up'
                            onPress={() => navigation.navigate('Register')}
                            style={{
                                backgroundColor: STYLE.colors.accent.blue,
                                width: STYLE.sizes.screenWidth * 0.6,
                            }}
                        />
                        <View style={styles.hr} />
                        <View style={{flexDirection: 'row'}}>
                            <Text adjustsFontSizeToFit style={[styles.subtitle, {fontSize: 16}]}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Stooped')}>
                                <Text adjustsFontSizeToFit style={[styles.subtitle, {
                                    fontSize: 16,
                                    color: STYLE.colors.accent.blue
                                }]}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // transform: [{scaleX: 1.2}, {scaleY: 1.2}],
        height: '100%',
        // aspectRatio: 640 / 426
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        paddingHorizontal: STYLE.sizes.screenWidth * 0.05,
        paddingVertical: STYLE.sizes.screenHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: STYLE.sizes.h1,
        color: STYLE.colors.font,
        fontFamily: STYLE.font.dmsansBold,
        paddingVertical: STYLE.sizes.screenHeight * 0.01,
    },
    subtitle: {
        fontSize: STYLE.sizes.h3,
        color: STYLE.colors.font,
        fontFamily: STYLE.font.poppins,
    },
    topContainer:{
        alignItems: 'center',
        flex: 0.3,
        justifyContent: 'flex-end',
    },
    bottomContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hr: {
        height: 1,
        width: STYLE.sizes.screenWidth * 0.9,
        backgroundColor: STYLE.colors.font,
        marginVertical: STYLE.sizes.screenHeight * 0.02,
    },
});