# React Native Mobile Client

## Version
0.2.0 - refactored version with core feature intact  <---- currently in development
0.1.x - initial alpha release (not on this repo, reference [this](https://github.com/StoopedLLC/React-Native-MobileApp) repo)

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
    - [components/]() - contains all the reusable components
    - [screens/]() - contains all the screens
    - [src/]() - contains all utility files (similar to public in node.js apps)
        * [styles/]() - contains all the stylesheets
        * [img/]() - contains all the images
    - [maincontainer.js]() - the main index file
* [api/]() - contains all API connection and app logic
    - [backend-services/]() - contains all direct connections to APIs (gcp, cloud storage, django gateway, etc)

### installed packages
see [package.json](/package.json) for the most updated list of packages
* expo: ~47.0.12
* expo-status-bar: ~1.4.2
* react: 18.1.0
* react-native: "0.70.5


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




