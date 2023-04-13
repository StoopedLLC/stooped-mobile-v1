/*
    This component allows user to input some text.
    It contains a text input field and a label.
    The content of the text input field is passed to the parent component via a callback function.

    props:
        - onTextChange: callback function to pass the text to the parent component
            - the callback function should take in a string as its parameter
        - label: label for the text input field
        - numericOnly: boolean value indicating whether the text input field should only accept numeric input
*/

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, SafeAreaView, TextInput } from 'react-native';
import STYLE from '@styles/Styles';
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

// TODO: chatgpt generated code, modification needed
export default function FormField(props){
    
    const [text, setText] = React.useState('');

    const handleTextChange = (text) => {
        setText(text);
        props.onTextChange(text);
    }

    return (
        <View style={props.containerStyle}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                style={styles.input}
                onChangeText={handleTextChange}
                value={text}
                placeholder={props.placeholder}
                placeholderTextColor={STYLE.color.accent.gray}
                keyboardType={props.numericOnly ? 'numeric' : 'default'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: STYLE.color.font,
        fontFamily: STYLE.font.poppins,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        fontFamily: STYLE.font.poppins,
        borderBottomColor: STYLE.color.font,
        color: STYLE.color.font,
    },
});
