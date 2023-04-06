# React Native Mobile Client

## Version
- 0.2.0 - refactored version with core feature intact  <---- currently in development
- 0.1.x - initial alpha release (not on this repo, reference [this](https://github.com/StoopedLLC/React-Native-MobileApp) repo)

## Description
This is a mobile client for the stooped app. It will serve as a mobile client for the stooped app to be used on mobile device. This repo will be the main repo for the mobile client and will be used to deploy to the app stores. 

## A note on the distribution of the code
ALL code in this repository belongs to Stooped LLC. The code is not open source and is not to be used by anyone other than Stooped LLC. If you are not a member of Stooped LLC, please do not use the code in this repository. If you are a member of Stooped LLC, please do not share the code in this repository with anyone outside of Stooped LLC. Any illegal use of the code in this repository, including but not limited to unauthorized forking, sharing, and usage, will be prosecuted to the fullest extent of the law.


## Organization and architecture

### branch naming convention
`version#-TYPE-description`
* version# - the version of the app
* TYPE - the type of branch
    - ADD - adding a feature
    - FIX - fixing a bug
    - EXP - experimenting with a feature
    - CHG - changing a feature
* description - a short description of the branch
     - linked together with dashes

### file structure
* [frontend/](/frontend/) - contains all the frontend code
    - [components/](/frontend/components/) - contains all the reusable components
        * [SaveButton.js](/frontend/components/SaveButton.js) - contains the "flag" shaped save button
        * [ItemFrame.js](/frontend/components/ItemFrame.js) - contains the frame used in the slider in the home screen
    - [screens/](/frontend/screens) - contains all the screens
        * [HomeStack/](/frontend/screens/HomeStack/) - contains all the screens for the home stack
    - [assets/](/frontend/assets/) - contains all utility files (similar to public in node.js apps)
        * [styles/]() - contains all the stylesheets
        * [img/](/frontend/src/images/) - contains all the images
        * [fonts/](/frontend/src/fonts/) - contains all the fonts
    - [MainContainer.js](/frontend/MainContainer.js) - the main navigation file
* [backend/]() - contains all API connection and app logic
    - [api/]() - contains all direct connections to APIs (gcp, cloud storage, django gateway, etc)
* [assets/](/assets/) - WILL BE DELETED - contains all the assets that came in with the expo template
* [tests/](/tests/) - contains all unit tests

### general file naming convention
Any file that exports a component should be named in PascalCase. Anything that is not a component should be named in camelCase. For example, if you are exporting a component called `MyComponent`, the file should be named `MyComponent.js`. If you are exporting a function called `myFunction`, the file should be named `myFunction.js`.
Any screens that is part of the navigation should have the name `Screen` at the end of the file name. For example, if you are exporting a screen called `Home`, the file should be named `HomeScreen.js`. If you are exporting a screen called `MyProfile`, the file should be named `MyProfileScreen.js`. Note that screen files exports a component, so the file name should be in PascalCase.


### changes in route naming
Implemented babel.config.js package - root import, which allows us to change the names of importing from the root. i.e We now use '@styles/Styles' to import the Styles.js file instead of the conventional './frontend/assets/styles/Styles'. This helps with organization.


### installed packages
see [package.json](/package.json) for the most updated list of packages
* expo: ~47.0.12
* expo-status-bar: ~1.4.2
* react: 18.1.0
* react-native: "0.70.5
* axios: ^1.3.3
* mocha: ^10.2.0 (dev dependency)
* chai: ^4.3.7 (dev dependency)
* firebase: ^9.17.1
* expo-font: ~11.0.1
* @expo-google-fonts/inter: ^0.2.3
* @expo-google-fonts/poppins: ^0.2.3
* @expo-google-fonts/dm-sans: ^0.2.3
* expo-splash-screen: ~0.17.5
* react-native-screens: ~3.18.0
* react-native-safe-area-context": 4.4.1
* @react-navigation/native: ^6.1.6
* @react-navigation/bottom-tabs: ^6.5.7
* @react-navigation/native-stack: ^6.9.12
* react-native-vector-icons: ^9.2.0
* expo-haptics: ~12.0.1
* react-native-elements: ^3.4.3
* react-native-feather: ^1.1.2,
* react-native-reanimated-carousel: ^3.3.0
* react-native-gesture-handler: ~2.8.0
* react-native-reanimated: ~2.12.0
* babel-plugin-root-import: ^6.6.0 (dev dependency)
* regenerator-runtime: ^0.13.11 (dev dependency)
* expo-location: ~15.0.1
<<<<<<< HEAD
* expo-constants: ~14.0.2
* expo-intent-launcher: ~10.3.1
=======
* "expo-linear-gradient": "~12.0.1",
* "expo-status-bar": "~1.4.2",
* "react-native-ionicons": "^4.6.5",
* "react-native-reanimated": "~2.12.0",

>>>>>>> a3b8076 (Commit for finishing the detail Screen which included the sliding button. Also commiting the start of the Camera Screen. Already set everything up so all the changes should be made purely on the Camera.js file for Camera Screen.)


## Developer help

### deevlopment schedule
See [notion]()

### package management

#### installing packages
```
npx expo install <package-name>
```
NOTE: Do NOT use `npm install` or `yarn add` to install packages. Use the above command instead. This will ensure that the package is installed in the version compatible with expo.

### running the app
Please make sure that you have expo installed on your computer. If you do not have expo installed, please follow the instructions [here](https://docs.expo.io/get-started/installation/)

#### on a mobile device
1. download the expo app on your mobile device
2. run `expo start` in the root directory of the project
3. scan the QR code with the expo app on your mobile device
4. the app should now be running on your mobile device
See expo menu for more options

#### on a simulator
1. run `expo start` in the root directory of the project
2. select the option to run on a simulator
3. the app should now be running on your simulator
Please make sure that you have a simulator installed on your computer. In other words, please make sure that you have Xcode installed on your mac or Android Studio installed on your windows computer.




