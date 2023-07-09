import React, {useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormField from '@components/FormField';
import STYLE from '@styles/Styles';
import { Ionicons } from '@expo/vector-icons';
import { completeSignUp } from '@backend/auth';

export default function ConfirmEmailScreen({navigation, route}){

    const nav = useNavigation();
    const option = route.params.option;

    const [code, setCode] = useState('');

    useEffect(() => {
        const _completeSignUp = async () => {
            if(code.length === 7){
                // check if code is correct
                if(route.params.option && route.params.option==='resetPassword'){
                    // TODO: reset password
                }else{
                    const status = await completeSignUp(code, route.params.data);
    
    
                    // if correct, navigate to welcome screen
                    if(status===201){
                        nav.navigate('SignupSuccess', {data: route.params.data}); 
                    }else{
                        // if incorrect, show error message
                        if(status===400){
                            alert("Incorrect code! Please try again.");
                        }
                    }
                }
            }
        }
        _completeSignUp();
    }, [code]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Ionicons style={{marginVertical: STYLE.sizes.screenHeight * 0.01}} name="paper-plane-outline" size={STYLE.sizes.screenHeight * 0.05} color={STYLE.colors.font} />
                <Text adjustsFontSizeToFit style={styles.titleText}>We sent you an email!</Text>
                <Text adjustsFontSizeToFit style={styles.instructionText}>Check your email and enter the code you have received below! Your code expires in 24 hours.</Text>

                <FormField
                    placeholder="Enter Code"
                    onTextChange={(text) => setCode(text)}
                    containerStyle={{marginLeft: -3}}
                />
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('Register')}>
                    <Text adjustsFontSizeToFit style={styles.resendText}>Click here to send a new code!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: STYLE.sizes.screenWidth * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 0.5,
        // justifyContent: 'space-evenly',
    },
    titleText: {
        fontSize: STYLE.sizes.h3,
        fontFamily: STYLE.font.dmsansBold,
        color: STYLE.colors.font,
    },
    instructionText: {
        fontSize: STYLE.sizes.screenHeight * 0.018,
        fontFamily: STYLE.font.poppins,
        color: STYLE.colors.font,
        marginVertical: STYLE.sizes.screenHeight * 0.02,
    },
    resendText: {
        fontSize: STYLE.sizes.screenHeight * 0.018,
        fontFamily: STYLE.font.dmsansBold,
        color: STYLE.colors.font,
        marginVertical: STYLE.sizes.screenHeight * 0.02,
    },
    
})