import * as React from 'react';
import { View, Text, theme, StyleSheet, Dimensions } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import STYLE from './src/styles/styles.js';

// import * as SecureStore from 'expo-secure-store';


// Import screens
import HomeScreen from './screens/HomeStack/HomeScreen';


// stacks
const MasterStack = createNativeStackNavigator(); // overall wrapper stack, contains all other substacks (e.g. auth, main, etc.)
const StoopedStack = createBottomTabNavigator(); // stack for stooped screens, for now, this would be the main stack
const AuthStack = createNativeStackNavigator(); // stack for auth screens


const StoopedContainer = () => {
    return (
        <StoopedStack.Navigator
            initialRouteName="Search"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIconStyle: {
                    backgroundColor: STYLE.color.primary,
                    width: Dimensions.get('window').width * 0.2,
                    height: Dimensions.get('window').width * 0.2,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={STYLE.sizes.screenWidth * 0.08} color={color} />;
                },
                unamountOnBlur: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: STYLE.sizes.screenHeight * 0.05,
                    left: STYLE.sizes.screenWidth * 0.05,
                    right: STYLE.sizes.screenWidth * 0.05,
                    elevation: 0,
                    borderRadius: STYLE.sizes.screenWidth * 0.1,
                    height: 60,
                    paddingTop: STYLE.sizes.screenHeight * 0.01,
                    paddingBottom: STYLE.sizes.screenHeight * 0.01,
                },
            })}
        >
            <StoopedStack.Screen name="Search" component={HomeScreen} />
        </StoopedStack.Navigator>
    )
}


export default function MainContainer() {
    return (
        <NavigationContainer
            theme={{
                colors: {
                    background: STYLE.color.background,
                    primary: STYLE.color.primary,
                    card: STYLE.color.background,
                    text: STYLE.color.font,
                    border: STYLE.color.border,
                },
            }}
        >
            <MasterStack.Navigator
                initialRouteName='Stooped'
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* TODO: add any nested stacks here*/}
                <MasterStack.Screen name="Stooped" component={StoopedContainer} />
            </MasterStack.Navigator>
        </NavigationContainer>
    )
}