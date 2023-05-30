import * as React from 'react';
import {useState, useEffect} from 'react';
import { View, Text, theme, StyleSheet, Dimensions } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import STYLE from '@styles/Styles.js';

// import * as SecureStore from 'expo-secure-store';


// Import screens
import HomeScreen from '@screens/HomeStack/HomeScreen'; // home page
import DetailScreen from '@screens/HomeStack/DetailScreen'; // page diplaying item details
import PickupScreen from '@screens/HomeStack/PickupScreen.js'; // page for picking up items
import CameraScreen from '@screens/CameraStack/CameraScreen.js'; // camera page for scanning items
import PreUploadScreen from '@screens/CameraStack/PreUploadScreen.js'; // page for previewing and uploading items
import SuccessScreen from '@screens/HomeStack/SuccessScreen.js'; // page for successful pickup

import LandingScreen from '@screens/AuthStack/LandingScreen.js'; // landing page
import RegisterScreen from '@screens/AuthStack/RegisterScreen'; // page for signing up


// stacks
const MasterStack = createNativeStackNavigator(); // overall wrapper stack, contains all other substacks (e.g. auth, main, etc.)
const StoopedStack = createBottomTabNavigator(); // stack for stooped screens, for now, this would be the main stack
const AuthStack = createNativeStackNavigator(); // stack for auth screens

// stacks for stooped app
const HomeStack = createNativeStackNavigator(); // stack for home screens
const ref = createNavigationContainerRef();
const CameraStack = createNativeStackNavigator();


// linking
const linking = {
    prefixes: ['stooped://', 'exp://127.0.0.1:19000/'],
    config: {
        screens: {
            Stooped: {
                screens: {
                    Home: {
                        screens: {
                            Home: 'home',
                            Detail: 'detail',
                            Pickup: 'pickup',
                            Success: 'success',
                        },
                    },
                    Camera: {
                        screens: {
                            Camera: 'camera',
                            PreUpload: 'preupload',
                        },
                    },
                },
            },
            NotFound: '*',
        }
    },
    async getInitialURL() {
        // First, we want to do the default deep link handling
        // Check if app was opened from a deep link
        const url = await Linking.getInitialURL();

        if (url != null) {
          return url;
        }

        // Handle URL from expo push notifications
        const response = await Notifications.getLastNotificationResponseAsync();

        return response?.notification.request.content.data.url;
    },
    subscribe(listener) {
        const onReceiveURL = (url) => {
            listener(url)
        };
        // Listen to incoming links from deep linking
        const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

        // Listen to expo push notifications
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
          const url = response.notification.request.content.data.url;

          // Any custom logic to see whether the URL needs to be handled
          //...

          // Let React Navigation handle the URL
          console.log('received url', url)
          listener(url);
        });

        return () => {
          // Clean up the event listeners
          eventListenerSubscription.remove()
          subscription.remove();
        };
      },

}



const HomeContainer = ({route, navigation}) => {

    return (
        <HomeStack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
            
        >
            <HomeStack.Screen name="Home" component={HomeScreen} options={{gestureEnabled: false}} />
            <HomeStack.Screen name="Detail" component={DetailScreen} 
            options={{
                tabBarVisible: false, //like this
                tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
            }}
            />
            <HomeStack.Screen name="Pickup" component={PickupScreen} />
            <HomeStack.Screen name="Success" component={SuccessScreen} options={{gestureEnabled: false, animation:'fade'}}/>
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
            <CameraStack.Screen name='PreUpload' component={PreUploadScreen}/>
        </CameraStack.Navigator>
    )
}



const StoopedContainer = ({route}) => {

    const [routeRef, setRouteRef] = useState(route.params.navRef.getCurrentRoute());
    const HIDDENROUTES = ['Detail','PreUpload', 'Pickup', 'Success']; // routes that should not be displayed in the bottom tab bar

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
                    } else if (route.name === 'ProfilePageGroup') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'CameraPageGroup') {
                        iconName = focused ? '' : 'camera-outline';
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
                    borderRadius: STYLE.sizes.screenWidth * 0.1,
                    height: 60,
                    paddingTop: STYLE.sizes.screenHeight * 0.01,
                    paddingBottom: STYLE.sizes.screenHeight * 0.01,
                },  
            })}
            style={{
                position: 'absolute',
                zIndex: 0,
                elevation: 0,
            }}
        >
            <StoopedStack.Screen name="HomePageGroup" component={HomeContainer} />
            <StoopedStack.Screen name="CameraPageGroup" component={CameraContainer} />
        </StoopedStack.Navigator>
    )
}


const AuthContainer = ({route}) => {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Landing" component={LandingScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            {/* <AuthStack.Screen name="EmailConfirmation" component={ConfirmEmailScreen} /> */}
            {/* <AuthStack.Screen name="SignupSuccess" component={SignupSuccessScreen} /> */}
        </AuthStack.Navigator>
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
            linking={linking}
        >
            <MasterStack.Navigator
                initialRouteName='Auth'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MasterStack.Screen name="Auth" component={AuthContainer} initialParams={{navRef: ref}}/>
                <MasterStack.Screen name="Stooped" component={StoopedContainer} initialParams={{navRef: ref}}/>
            </MasterStack.Navigator>
        </NavigationContainer>
    )
}