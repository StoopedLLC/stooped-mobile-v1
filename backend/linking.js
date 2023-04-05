/*
    This file contains all methods that interact with external apps.
    For example, it contains methods that open the app settings page, or opening a browser.

It contains the following methods:
    - openAppSettings: open the app settings page
*/
import { Linking } from 'react-native';
import Constants from 'expo-constants'
import * as IntentLauncher from 'expo-intent-launcher'


const pkg = Constants.manifest.releaseChannel? Constants.manifest.android.package : 'host.exp.exponent'

const openAppSettings = () => {
    /*
        This function opens the app settings page.
    */
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:')
  } else {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
      { data: 'package:' + pkg },
    )
  }
}

export{
    openAppSettings
}