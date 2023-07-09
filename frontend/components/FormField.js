/*
    This component allows user to input some text.
    It contains a text input field and a label.
    The content of the text input field is passed to the parent component via a callback function.

    props:
        - onTextChange: callback function to pass the text to the parent component
            - the callback function should take in a string as its parameter
        - label: label for the text input field
        - numericOnly: boolean value indicating whether the text input field should only accept numeric input
        - password: boolean value indicating whether the text input field should be a password field
        - passwordRules: string containing the password rules to be displayed below the text input field
        - containerStyle: style for the container of the text input field
        - defaultValue: default value of the text input field
        - placeholder: placeholder text for the text input field
*/

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, SafeAreaView, TextInput } from 'react-native';
import STYLE from '@styles/Styles';

export default function FormField(props){
    
    const [text, setText] = React.useState(props.defaultValue ? props.defaultValue :'');

    const handleTextChange = (text) => {
        setText(text);
        props.onTextChange(text);
    }

    return (
        <View style={props.containerStyle}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                style={[styles.input, props.inputStyle]}
                onChangeText={handleTextChange}
                value={text}
                placeholder={props.placeholder}
                placeholderTextColor={STYLE.color.accent.gray}
                keyboardType={props.numericOnly ? 'numeric' : 'default'}
                secureTextEntry={props.password}
                passwordRules={props.passwordRules}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: STYLE.color.font,
        fontFamily: STYLE.font.poppins,
        // marginBottom: 5,
        marginLeft: 3

    },
    input: {
        height: 30,
        borderBottomWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 3,
        fontSize: 16,
        fontFamily: STYLE.font.poppins,
        borderBottomColor: STYLE.color.font,
        color: STYLE.color.font,
    },
});
