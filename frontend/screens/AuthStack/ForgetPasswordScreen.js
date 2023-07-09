import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { ToastAndroid, Platform, AlertIOS} from 'react-native';
import STYLE from "@styles/Styles";
import FormField from '@components/FormField';
import GenericButton from '@components/GenericButton';
import { useNavigation } from '@react-navigation/native';


export default function ForgetPasswordScreen({navigation, route}) {
    // TODO: implement forget password screen
    const [email, setEmail] = useState('');
    const nav = useNavigation();
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    height: '80%',
                }}
            >
                <View style={{marginVertical: STYLE.sizes.screenHeight * 0.02}}>
                    <Text adjustsFontSizeToFit style={{color: STYLE.colors.font, 
                        fontFamily: STYLE.font.poppinsSemiBold, fontSize: STYLE.sizes.h3, marginVertical: STYLE.sizes.screenHeight * 0.01 }}
                    >
                        Reset Password
                    </Text>
                    <Text style={{color: STYLE.colors.font, fontFamily: STYLE.font.poppins, fontSize: STYLE.sizes.screenHeight * 0.02 }}>
                        Enter your email address below and we'll send you a code to verify your email.
                    </Text>
                </View>
                <FormField
                    label="Email"
                    placeholder="Enter your email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    containerStyle={{marginTop: STYLE.sizes.screenHeight * 0.02}}
                />
                <View style={{marginVertical: STYLE.sizes.screenHeight * 0.04}}>
                    <GenericButton
                        label="Send Code"
                        onPress={async () => {
                            // TODO: send email
                            nav.navigate('ConfirmEmail', {option: 'resetPassword', data: {email: email}});
                        }}
                        style={{width: STYLE.sizes.screenWidth * 0.6, alignSelf: 'center'}}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

