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



export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   
});