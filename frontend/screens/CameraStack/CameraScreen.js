import React, {useEffect, useRef} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";
import { Camera, CameraType, FlashMode , permission} from 'expo-camera';
import { getCameraPermission } from '@backend/camera';



export default function CameraScreen() {

    // reference to camera component
    const cameraRef = React.useRef(null);

    // state variables for camera setting
    const [cameraType, setCameraType] = React.useState(CameraType.back);
    const [flashMode, setFlashMode] = React.useState(FlashMode.off);

    // setters for camera setting
    const toggleCameraType = () => {
        setCameraType(
            cameraType === CameraType.back
            ? CameraType.front
            : CameraType.back
        );
    }

    const toggleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off');
        } else if (flashMode === 'off') {
            setFlashMode('on');
        } else {
            setFlashMode('auto');
        }
    }



    // hook to get camera permission, if no permission, ask for permission
    useEffect(() => {
        const getPermission = async () => {
            let permission = await Camera.useCameraPermissions();
            if(!permission.granted){
                permission = await getCameraPermission();
            }
        }
        getPermission();
    },[])

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {/* XXX: research react-native-vision-camera for more advanced camera feature (e.g. tap to focus) */}
                <Camera 
                    ref={cameraRef}
                    style={{flex: 1,}} 
                    type={cameraType} 
                    flashMode={flashMode} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
        marginHorizontal: STYLE.sizes.screenWidth * 0.02,
        borderRadius: STYLE.borders.moreRound,
        marginTop: STYLE.sizes.screenHeight * 0.05,
        marginBottom: STYLE.sizes.screenHeight * 0.03,
        overflow: 'hidden',
    },
});