import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback, useState } from 'react';
import STYLE from '@styles/Styles.js';
import MainContainer from './frontend/MainContainer';


SplashScreen.preventAutoHideAsync();

export default function App() {

  // font loading
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const [appIsReady, setAppIsReady] = useState(false);


  
  useEffect(() => {
    async function prepare() {
      try {
        // perform splash screen logics here (e.g. check if user is logged in, etc.)
        // Pre-load fonts, make any API calls you need to do here
        console.log('hello world')
        setAppIsReady(true);
      
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      console.log('hide splash')
      // console.log('style constants', STYLE)
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontLoaded]);

  if (!appIsReady || !fontLoaded) {
    return null;
  }

  return (
    // <View 
    //   style={styles.container}
    //   onLayout={onLayoutRootView}>
    //   <Text style={{fontFamily: 'Poppins_400Regular'}}>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <MainContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: STYLE.color.background,
  },
});
