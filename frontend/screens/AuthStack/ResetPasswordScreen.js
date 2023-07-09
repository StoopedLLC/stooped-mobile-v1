import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import STYLE from '@styles/Styles';
import FormField from '@components/FormField';
import GenericButton from '@components/GenericButton';
import IconFormField from '@components/IconFormField';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { resetPassword } from '@backend/auth';

export default function ResetPasswordScreen({navigation, route}) {

    const { username } = route.params;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const nav = useNavigation();


    const submitForm = async ()=> {
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

        const success = await resetPassword(username, password);
        if(success){
            alert('Password successfully reset');
            nav.navigate('Login');
        }else{
            alert('Password reset failed');
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <ScrollView contentContainerStyle={styles.form} scrollEnabled={false}>
                <Text style={styles.titleText}>Create New Password</Text>
                <IconFormField
                    icon={()=> <MaterialIcons name="lock-outline" size={STYLE.sizes.screenHeight * 0.03} color={STYLE.colors.font} />}
                    placeholder='New Password'
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
                <View style={styles.buttonPan}>
                    <GenericButton
                        label='Reset Password'
                        onPress={()=>{submitForm()}}
                        style={{width: STYLE.sizes.screenWidth * 0.6}}
                        labelStyle={{fontSize: STYLE.sizes.h3}}
                        disabled={btnDisabled}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: STYLE.sizes.screenWidth * 0.1,
        marginVertical: STYLE.sizes.screenWidth * 0.25,
        flex: 1,
        justifyContent: 'center',
    },
    fieldContainer:{
        width: '100%', 
        marginBottom: STYLE.sizes.screenHeight * 0.02, 
    },
    buttonPan: {
        width: '75%',
        alignSelf: 'center',
        flex: 0.2,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: STYLE.sizes.h2,
        fontFamily: STYLE.font.poppinsMed,
        color: STYLE.colors.font,
        marginBottom: STYLE.sizes.screenHeight * 0.02,
    },
})