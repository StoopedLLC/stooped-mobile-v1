import * as React from 'react';
import { View, Text, theme, StyleSheet, Dimensions } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as SecureStore from 'expo-secure-store';


// Import screens


// stacks
const MasterStack = createNativeStackNavigator(); // overall wrapper stack, contains all other substacks (e.g. auth, main, etc.)

export default function MainContainer() {
    return (
        <NavigationContainer>
            <MasterStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* TODO: add any nested stacks here*/}
            </MasterStack.Navigator>
        </NavigationContainer>
    )
}