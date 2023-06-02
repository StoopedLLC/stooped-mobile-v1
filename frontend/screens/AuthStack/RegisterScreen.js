import React, {useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GenericButton from '@components/GenericButton';
import IconFormField from '@components/IconFormField';
import STYLE from '@styles/Styles';
import { Feather, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';


export default function RegisterScreen({navigation, route}){
    const nav = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState(''); // need to split on space
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitForm = () => {
        // validation check: all fields completed, password requirements, confirm password match
        if(!username || !email || !name || !password || !confirmPassword){
            alert('Please complete all required fields');
            return;
        }
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }
        if(password.length < 8){
            alert('Password must be at least 8 characters');
            return;
        }
        if(!password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[0-9]/)){
            alert('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return;
        }

        // TODO: username validation

        // complie data
        const data = {
            username,
            email,
            firstName: name.indexOf(' ')===-1?name.split(' ')[0]:name,
            lastName: name.split(' ')[1] || '',
            password,
        }

        // navigate to new screen
        nav.navigate('EmailConfirmation', {data});

    }


    return (
        <SafeAreaView style={{
            flex: 1, 
            marginHorizontal: STYLE.sizes.screenWidth * 0.05, 
            alignItems: 'center', 
        }}>
            <ScrollView style={{flex: 0.6}} contentContainerStyle={styles.form} scrollEnabled={false}>
                <Text style={styles.titleText}>Create an Account</Text>
                <IconFormField
                    icon={()=> <Feather name="at-sign" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />}
                    placeholder='Username'
                    onTextChange={(text) => setUsername(text)}
                    containerStyle={styles.fieldContainer}
                />
                <IconFormField
                    icon={()=> <Feather name="user" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />}
                    placeholder='First Last Name'
                    onTextChange={(text) => setName(text)}
                    containerStyle={styles.fieldContainer}
                />
                <IconFormField
                    icon={()=> <MaterialCommunityIcons name="email-outline" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />}
                    placeholder='Email'
                    onTextChange={(text) => setEmail(text)}
                    containerStyle={styles.fieldContainer}
                />
                <IconFormField
                    icon={()=> <MaterialIcons name="lock-outline" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />}
                    placeholder='Password'
                    onTextChange={(text) => setPassword(text)}
                    containerStyle={styles.fieldContainer}
                    password={true}
                />
                <IconFormField
                    icon={()=> <MaterialIcons name="lock-outline" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />}
                    placeholder='Confirm password'
                    onTextChange={(text) => setConfirmPassword(text)}
                    containerStyle={styles.fieldContainer}
                    password={true}
                />
            </ScrollView>
            <View style={styles.buttonPan}>
                <Text style={styles.policyText} >
                    By signing up, you agree to our Terms of Service and Privacy Policy, and confirm that you are 13+ years old.
                </Text>
                <GenericButton
                    label='Create Account'
                    onPress={submitForm}
                    style={{width: STYLE.sizes.screenWidth * 0.6}}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        width: '75%',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    fieldContainer:{
        width: '100%', 
        marginBottom: STYLE.sizes.screenHeight * 0.02, 
    },
    buttonPan: {
        width: '75%',
        flex: 0.4,
        alignItems: 'center',
    },
    titleText: {
        fontSize: STYLE.sizes.h2,
        fontFamily: STYLE.font.poppinsMed,
        color: STYLE.colors.font,
        marginBottom: STYLE.sizes.screenHeight * 0.02,
    },
    policyText: {
        fontSize: STYLE.sizes.screenHeight * 0.015,
        color: STYLE.colors.font,
        textAlign: 'center',
        marginBottom: STYLE.sizes.screenHeight * 0.02,
    }
})