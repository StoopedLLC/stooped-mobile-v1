import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";
import MapView, {Marker} from "react-native-maps";
import SwipeButton from "@components/SwipeButton";
import { formatIsoDate, getNumDays, getNumHours } from "@backend/util";
import PostView from "@components/PostView";



export default function SocialMediaScreen() {
    const [data, setData] = useState([]);


    useEffect(() => {
        // this is where you would pull the data and store it into the useState
    })

    return (
        <SafeAreaView>
            <PostView data={data} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});