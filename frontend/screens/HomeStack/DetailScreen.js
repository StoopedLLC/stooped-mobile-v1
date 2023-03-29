import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Image } from "react-native";
import STYLE from "../../assets/styles/Styles";

export default function DetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image />
            </View>


            <View>
                    
            </View>


            <View>
                    
            </View>
            <Text style={styles.text}>background</Text>
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