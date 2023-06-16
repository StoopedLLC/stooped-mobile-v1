import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GenericButton from '@components/GenericButton';
import IconFormField from '@components/IconFormField'
import { authenticateUser } from '@backend/auth';
import STYLE from '@styles/Styles';
import {Feather, MaterialIcons} from '@expo/vector-icons'

export default function LoginScreen({navigation, route}){

    const nav = useNavigation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async () => {
        // begin loading animation

        // authenticate user
        const token = await authenticateUser(username, password)
        console.log(token)
        
        if(!token){
            alert('An error occured. Please try again.')
            return
        }else if(token === 'INVALID_CREDENTIALS'){
            alert('Invalid username or password.')
            return
        }
        
        // cache user session
        

        // navigate to next screen
        console.log('welcome!')
        nav.navigate('Stooped')

    }


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
                    <View style={styles.form} >
                        <Text adjustsFontSizeToFit style={styles.title}>Welcome Back</Text>
                        <View style={styles.fieldContainer}>
                            <View style={{flex: 0.12, alignItems:'center'}}>
                                <Feather name="user" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />
                            </View>
                            <TextInput 
                                style={styles.input}
                                onChangeText={setUsername}
                                value={username}
                                placeholder={'username or email'}
                                placeholderTextColor={STYLE.color.accent.gray}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={{flex: 0.12, alignItems:'center'}}>
                                <MaterialIcons name="lock-outline" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />
                            </View>
                            <TextInput 
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder={'password'}
                                placeholderTextColor={STYLE.color.accent.gray}
                                secureTextEntry={true}
                            />
                        </View>
                        <GenericButton
                            label='Login'
                            onPress={()=>{onSubmit()}}
                            style={styles.buttonStyle}
                        />
                    </View>
                    <View style={styles.optionPan}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('')}}>
                            <Text adjustsFontSizeToFit style={styles.optionText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={styles.hrText}>
                            <View style={{
                                height: 1,
                                width: '42%',
                                backgroundColor: STYLE.colors.font,
                                marginVertical: STYLE.sizes.screenHeight * 0.02,
                                marginRight: 2,
                            }}></View>
                            <Text adjustsFontSizeToFit style={[styles.optionText, ]}>or</Text>
                            <View style={{
                                height: 1,
                                width: '48%',
                                backgroundColor: STYLE.colors.font,
                                marginVertical: STYLE.sizes.screenHeight * 0.02,
                                marginLeft: 2,
                            }}></View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text adjustsFontSizeToFit style={styles.optionText}>New here? </Text>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                                <Text adjustsFontSizeToFit style={[styles.optionText, {
                                    color: STYLE.colors.accent.blue
                                }]}>Create Account</Text>
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
        justifyContent: 'center',
    },
    form:{
        flex: 0.5,
        justifyContent: 'space-evenly',
        width: '80%',
    },
    title:{
        color: STYLE.colors.font,
        fontFamily: STYLE.font.dmsans,
        fontSize: STYLE.sizes.h2,
    },
    buttonStyle:{
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'white',
        borderWidth: 2,
        alignSelf: 'center',
        width: '75%',
    }, 
    fieldContainer:{
        borderColor: 'white',
        borderRadius: STYLE.borders.lessRound,
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: STYLE.sizes.screenHeight * 0.013,
        paddingHorizontal: STYLE.sizes.screenWidth * 0.02,
        justifyContent:'space-between',
    },
    optionPan:{
        flex: 0.1,
        alignItems: 'center',
        width: '90%'
    },
    input:{
        flex: 0.8,
        fontSize: STYLE.sizes.screenHeight * 0.02,
        fontFamily: STYLE.font.poppins,
        color: STYLE.color.font,
    },
    optionText:{
        color: STYLE.colors.font,
        fontFamily: STYLE.font.poppins,
        fontSize: STYLE.sizes.screenHeight * 0.02,
    },
    hrText:{
        flexDirection: 'row',
        width: '100%',
        alignItems:'center',
        justifyContent:'center'
    }
})