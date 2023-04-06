import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";



export default function CameraScreen() {
    

    return (
        <SafeAreaView>
            <Text>Camera Screen</Text>
        </SafeAreaView>
    );
}