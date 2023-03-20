import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import STYLE from "../../src/styles/styles";


export default function HomeScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: STYLE.color.background,
    },
    text: {
        color: STYLE.color.font
    }
});
