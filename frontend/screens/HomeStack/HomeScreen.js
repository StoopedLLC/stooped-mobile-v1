import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import STYLE from "../../src/styles/styles";
import ItemFrame from "../../components/ItemFrame";


export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
            {/* TODO: move the folloiwng view to new component for slider wrap */}
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={styles.frame}>
                    <ItemFrame item={{name: 'name', location:{}, id:'123123123'}}/>
                </View>
            </View>
            {/*  */}
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
    // TODO: move the following to a new component for slider wrap
    frame:{
        width: STYLE.sizes.screenWidth * 0.9,
        height: STYLE.sizes.screenWidth * 0.9,
    }
});
