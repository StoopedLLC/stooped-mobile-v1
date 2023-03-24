import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import STYLE from "../../src/styles/styles";
import ItemFrame from "../../components/ItemFrame";


export default function HomeScreen() {
    const nav = useNavigation();


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
            <TouchableOpacity 
                style={{paddingTop: 20}}
                onPress={()=>{
                    console.log('pressed');
                    nav.navigate('Detail', {name: 'name', location:{}, id:'123123123'});
                }}>
                <Text style={styles.text}>Go to Detail Screen</Text>
            </TouchableOpacity>
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
    },

});
