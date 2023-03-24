import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import STYLE from "../../src/styles/styles";

export default function DetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: STYLE.color.background,
    },
    text: {
        color: STYLE.color.font
    },
});