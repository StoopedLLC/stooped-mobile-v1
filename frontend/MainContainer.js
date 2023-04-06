import * as React from 'react';
import {useState, useEffect} from 'react';
import { View, Text, theme, StyleSheet, Dimensions } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import STYLE from '@styles/Styles.js';

// import * as SecureStore from 'expo-secure-store';


// Import screens
import HomeScreen from './screens/HomeStack/HomeScreen'; // home page
import DetailScreen from './screens/HomeStack/DetailScreen'; // page diplaying item details
import CameraScreen from './screens/CameraStack/Camera.js';


// stacks
const MasterStack = createNativeStackNavigator(); // overall wrapper stack, contains all other substacks (e.g. auth, main, etc.)
const StoopedStack = createBottomTabNavigator(); // stack for stooped screens, for now, this would be the main stack
const AuthStack = createNativeStackNavigator(); // stack for auth screens

// stacks for stooped app
const HomeStack = createNativeStackNavigator(); // stack for home screens
const ref = createNavigationContainerRef();
const CameraStack = createNativeStackNavigator();



const HomeContainer = ({route, navigation}) => {
    return (
        <HomeStack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
            
        >
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Detail" component={DetailScreen} 
            options={{
                tabBarVisible: false, //like this
                tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
            }}
            />
        </HomeStack.Navigator>
    )
}



const CameraContainer = ({route, navigation}) => {
    return (
        <CameraStack.Navigator
            initialRouteName='Camera'
            screenOptions={{
                headerShown: false,
            }}
        >
            <CameraStack.Screen name='Camera' component={CameraScreen}/>
        </CameraStack.Navigator>
    )
}



const StoopedContainer = ({route}) => {

    const [routeRef, setRouteRef] = useState(route.params.navRef.getCurrentRoute());
    const HIDDENROUTES = ['Detail']; // routes that should not be displayed in the bottom tab bar

    useEffect(()=>{
        if(route.params.navRef.getCurrentRoute()){
            setRouteRef(route.params.navRef.getCurrentRoute().name);
        }
    }, [route.params.navRef.getCurrentRoute()]); // fires upon route change


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
                    if (route.name === 'HomePageGroup') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'CameraPageGroup') {
                        iconName = focused ? 'camera' : 'camera-outline';
                    }
                    

                    return <Ionicons name={iconName} size={STYLE.sizes.screenWidth * 0.08} color={color} />;
                },
                unamountOnBlur: false,
                tabBarStyle: {
                    display: HIDDENROUTES.includes(routeRef) ? 'none' : 'flex',
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
            <StoopedStack.Screen name="HomePageGroup" component={HomeContainer} />
            <StoopedStack.Screen name="CameraPageGroup" component={CameraContainer} />
        </StoopedStack.Navigator>
    )
}


export default function MainContainer() {

    return (
        <NavigationContainer
            theme={{
                dark: true,
                colors: {
                    background: STYLE.color.background,
                    primary: STYLE.color.primary,
                    card: STYLE.color.background,
                    text: STYLE.color.font,
                    border: STYLE.color.border,
                },
            }}
            ref={ref}
            onReady={() => {
            }}
            onStateChange={async () => {
            }}
        >
            <MasterStack.Navigator
                initialRouteName='Stooped'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MasterStack.Screen name="Stooped" component={StoopedContainer} initialParams={{navRef: ref}}/>
            </MasterStack.Navigator>
        </NavigationContainer>
    )
}