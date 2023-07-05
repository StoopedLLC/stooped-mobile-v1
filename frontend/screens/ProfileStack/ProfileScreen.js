import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";
import MapView, {Marker} from "react-native-maps";
import SwipeButton from "@components/SwipeButton";
import { formatIsoDate, getNumDays, getNumHours } from "@backend/util";
import {ProfileBody, ProfileButtons} from '@components/ProfileUtils';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/BottomTabView';




export default function ProfileScreen() {
    let circuls = [];
    let numberofcircels = 10;

    for (let index = 0; index < numberofcircels; index++) {
        circuls.push(
        <View key={index}>
            {index === 0 ? (
            <View
                style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                borderWidth: 1,
                opacity: 0.7,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <Entypo name="plus" style={{fontSize: 40, color: 'black'}} />
            </View>
            ) : (
            <View
                style={{
                width: 60,
                height: 60,
                borderRadius: 100,
                backgroundColor: 'black',
                opacity: 0.1,
                marginHorizontal: 5,
                }}></View>
            )}
        </View>,
        );
    }

    return (
        <SafeAreaView 
        style={{
            height: STYLE.sizes.screenHeight,
        }}>
            <View style={{width: '100%', height: '100%'}}>
            <View style={{width: '100%', padding: 10}}>
                <ProfileBody
                name="Mr Peobody"
                accountName="mr_peobody"
                profileImage={require('@images/Bryant.jpg')}
                followers="3.6M"
                following="35"
                post="458"
                />
                <ProfileButtons
                id={0}
                name="Mr Peobody"
                accountName="mr_peobody"
                profileImage={require('@images/Bryant.jpg')}
                />
            </View>
            
            <BottomTabView />
            </View>
        </SafeAreaView>
  );
};


const styles = StyleSheet.create({
   
});