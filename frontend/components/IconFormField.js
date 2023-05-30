/*
    This component is a variant of the FormField component.
    It allows user to input some text, but it also contains an icon on the left side of the text input field.

    Props:
        - icon: the icon component to be displayed on the left side of the text input field
        - placeholder: the placeholder text to be displayed in the text input field
        - onTextChange: callback function to pass the text to the parent component
            - the callback function should take in a string as its parameter
        - label: label for the text input field
        - numericOnly: boolean value indicating whether the text input field should only accept numeric input
        - password: boolean value indicating whether the text input field should be a password field
        - passwordRules: string containing the rules for the password field
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import STYLE from '@styles/Styles';
import FormField from '@components/FormField';

export default function IconFormField(props){
    const [text, setText] = useState('');

    const handleTextChange = (text) => {
        setText(text);
        props.onTextChange(text);
    }

    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.iconContainer}>
                {(props.icon)()}
            </View>
            <FormField
                placeholder={props.placeholder}
                onTextChange={props.onTextChange}
                label={props.label}
                numericOnly={props.numericOnly}
                password={props.password}
                passwordRules={props.passwordRules}
                containerStyle={{flex: 1, alignSelf: 'center'}}
                inputStyle={{height: 'auto', color: STYLE.colors.font+'E6'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: STYLE.sizes.screenWidth * 0.01,
        alignSelf:'flex-end'
    },
})


