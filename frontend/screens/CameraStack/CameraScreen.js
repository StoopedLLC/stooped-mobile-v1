import React, {useEffect, useRef} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from "@styles/Styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { getCameraPermission, pickImage } from '@backend/image';
import { PlusSquare } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import LocationPicker from "@components/LocationPicker";
import { getCurrentLocation } from "@backend/location";
import FormField from "@components/FormField";
import SwipeButton from "@components/SwipeButton";
import {uploadItem} from "@backend/item";
import Loading from "@components/Loading";





export default function CameraScreen() {
    // nav
    const nav = useNavigation();


    // reference to camera component
    const cameraRef = React.useRef(null);

    // state variables for camera setting
    const [cameraType, setCameraType] = React.useState(CameraType.back);
    const [flashMode, setFlashMode] = React.useState(FlashMode.off);

    // state variables for icon
    const [flashIcon, setFlashIcon] = React.useState('flash-outline');

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
            setFlashIcon('flash-outline');
        } else if (flashMode === 'off') {
            setFlashMode('on');
            setFlashIcon('flash');
        } else {
            setFlashMode('auto');
            setFlashIcon('flash');
        }
    }


    // capture image
    // image based state variables
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [freezeCamera, setFreezeCaemra] = React.useState(false);

    // function to capture image
    const captureImage = async () => {
        try{
            const photo = await cameraRef.current.takePictureAsync({ quality: 0, base64: true, skipProcessing: true });
            setCapturedImage(photo.uri);
            if (photo.uri) {
              await cameraRef.current.pausePreview();
              console.log(photo.uri);
              setFreezeCaemra(true);
            }
        }catch(error) {
            console.log(error);
        }
    }


    // modal ref
    const modalRef = useRef(null);

    // helper to close modal
    const closeModal = () => {
        modalRef.current.close();
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





    // hook to open modal
    useEffect(() => {
        if (freezeCamera){
            modalRef.current.open();
        }
    }, [freezeCamera])



    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                {
                    freezeCamera && capturedImage ? (
                        <ImageBackground
                            source={{uri: capturedImage}}
                            style={{flex: 1,}}
                        />

                    ): (
                    <>
                        {/* XXX: research react-native-vision-camera for more advanced camera feature (e.g. tap to focus) */}
                        <Camera 
                            ref={cameraRef}
                            style={{flex: 1,}} 
                            type={cameraType} 
                            flashMode={flashMode} 
                        />

                        {/* Button panel top left corner */}
                        <View
                            style={styles.buttonPanel}
                        >
                            <TouchableOpacity
                                style={{marginVertical: STYLE.sizes.screenHeight * 0.005, alignItems: 'center', justifyContent: 'center'}}
                                onPress={toggleCameraType}
                            >
                                <Ionicons name="camera-reverse" size={30} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{marginVertical: STYLE.sizes.screenHeight * 0.005, alignItems: 'center', justifyContent: 'center'}}
                                onPress={toggleFlashMode}
                            >
                                <Ionicons name={flashIcon} size={30} color="white" />
                            </TouchableOpacity>
                        </View>


                        {/* Pick Image top right corner */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: STYLE.sizes.screenHeight * 0.02,
                                right: STYLE.sizes.screenWidth * 0.05,
                                paddingHorizontal: STYLE.sizes.screenWidth * 0.02,
                                paddingVertical: STYLE.sizes.screenHeight * 0.01,
                                borderRadius: STYLE.borders.lessRound,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                            onPress={async () => {
                                const image = await pickImage();
                                if(image){
                                    nav.navigate('PreUpload', {image: image});
                                }
                            }}
                        >
                            <PlusSquare width={STYLE.sizes.screenHeight * 0.04} height={STYLE.sizes.screenHeight * 0.04} color="white" />
                        </TouchableOpacity>


                        {/* Capture Image Button */}
                        <View
                            style={styles.captureButtonWrap}
                        >
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => {
                                    // setOnPress(!onPress);
                                    captureImage();
                                }}
                            >
                                <Image
                                    source={require('@images/camera-click.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                        </View>
                    </>
                    )
                }
                <ConfirmUpload 
                    modalRef={modalRef}
                    image={capturedImage}
                    onClose={() => {
                        console.log('close')
                        setFreezeCaemra(false);
                        setCapturedImage(null);
                    }}
                />
                
            </View>
        </View>
    );
}


const ConfirmUpload = (props) => {

    const nav = useNavigation();

    const [location, setLocation] = React.useState({}); // keep track of actual location
    const [initialLocation, setInitialLocation] = React.useState({}); // track the initial location of the user
    const [itemName, setItemName] = React.useState(''); // track the name of the item

    const [loading, setLoading] = React.useState(false); // track if the item is being uploaded

    const mapContainerStyle = {
        width: '100%',
        height: STYLE.sizes.screenHeight * 0.2,
        borderRadius: STYLE.borders.normalRound,
        borderColor: 'black',
        overflow: 'hidden',
    }


    const handleLocationSelected = (location) => {
        setLocation(location);
    }

    // this hook is used to obtain the location of the user
    useEffect(() => {
        const getLocation = async () => {
            const location = await getCurrentLocation();
            setInitialLocation(location);
            setLocation(location);
        }
        getLocation();
    }, []);


    return (
        <Modalize
            ref={props.modalRef}
            snapPoint={STYLE.sizes.screenHeight * 0.3}
            adjustToContentHeight={true}
            onClose={()=>{
                props.onClose();
            }}
        >
            <View
                style={styles.modalContainer}
            >
                <Loading />
                <View style={{
                    paddingBottom: STYLE.sizes.screenHeight * 0.01,
                }}>
                    <Text adjustsFontSizeToFit style={styles.titleText}>Pickup Location</Text>
                </View>
                <LocationPicker
                    onLocationSelected={handleLocationSelected}
                    initialLocation={initialLocation}
                    containerStyle={mapContainerStyle}
                />
                <Text adjustsFontSizeToFit style={styles.description}>Press and hold on the map to pick a location</Text>
                <View style={{flex: 0.5}}>
                    <FormField onTextChange={setItemName} placeholder="Item Name" />
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <SwipeButton 
                        exteriorButtonColor={STYLE.color.accent.yellow} 
                        innerButtonColor={'white'} 
                        message={"SWIPE TO UPLOAD!"}
                        onSwipeComplete={async () => {
                            setLoading(true);
                            const item = await uploadItem('35325253-c96c-41b9-9384-3c129a69833f', itemName, location, props.image);
                            if(item){
                                nav.navigate('Home', {image: props.image, location: location, itemName: itemName});
                            }
                            setLoading(false);
                            props.onClose();
                        }}
                    />
                </View>
            </View>
        </Modalize>


    )
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
        zIndex: 1,
        elevation: 1,
    },
    buttonPanel:{
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: STYLE.sizes.screenHeight * 0.02,
        left: STYLE.sizes.screenWidth * 0.05,
        paddingHorizontal: STYLE.sizes.screenWidth * 0.02,
        paddingVertical: STYLE.sizes.screenHeight * 0.01,
        borderRadius: STYLE.borders.normalRound,
    },
    captureButtonWrap:{
        position: 'absolute',
        width: STYLE.sizes.screenWidth * 0.2,
        height: STYLE.sizes.screenWidth * 0.2,
        backgroundColor: 'black',
        bottom: STYLE.sizes.screenHeight * 0.1,
        left: STYLE.sizes.screenWidth * 0.4,
        borderRadius: STYLE.sizes.screenWidth * 0.1,
        zIndex: 100,
        elevation: 100,
    },
    captureButton:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    // following is for the modal
    modalContainer:{
        backgroundColor: STYLE.color.background,
        height: STYLE.sizes.screenHeight * 0.6,
        paddingHorizontal: STYLE.sizes.screenWidth * 0.05,
        paddingTop: STYLE.sizes.screenHeight * 0.02,
        position: 'intial'
    },
    titleText:{
        fontSize: STYLE.sizes.h3,
        fontFamily: STYLE.font.poppinsMed,
        color: STYLE.color.font
    },
    description:{
        fontSize: STYLE.sizes.p,
        fontFamily: STYLE.font.dmsans,
        color: STYLE.color.font,
        alignSelf: 'center',
    },
});