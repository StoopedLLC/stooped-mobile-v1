import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { notificationAsync, NotificationFeedbackType } from 'expo-haptics';
import STYLE from '@styles/Styles';
import { Feather } from '@expo/vector-icons';
import GenericButton from '@components/GenericButton';

const ConfirmUploadScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Trigger haptic feedback on component mount
        notificationAsync(NotificationFeedbackType.Success);
    }, []);

    const scale = useRef(new Animated.Value(0)).current;

    const handleShare = () => {
        // Code to prompt user for sharing on stooped social media
        // TODO: Add your implementation here

        // navigation.dispatch(CommonActions.navigate('Camera')); 
    };

    const handleGoHome = () => {
        navigation.dispatch(CommonActions.navigate('Camera')); 
        navigation.navigate('Home', {refresh: true}); // Navigate to home screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.checkmark}>
                    <Feather name="check-circle" size={100} color={'green'}/>
                </View>
                <View style={{marginHorizontal: STYLE.sizes.screenWidth * 0.1 }}>
                    <Text style={styles.title}>Upload Complete</Text>
                    <Text style={styles.subTitle}>Your item was uploaded successfully!</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{
                        fontFamily: STYLE.font.dmsans, fontSize: STYLE.sizes.screenHeight * 0.02,
                        marginHorizontal: STYLE.sizes.screenWidth * 0.1, color: STYLE.colors.font,
                        marginVertical: STYLE.sizes.screenHeight * 0.02,
                    }}>{`Help people to know more about your stoop by adding a caption`} </Text>
                    <View style={{marginTop: STYLE.sizes.screenHeight * 0.01, alignItems:'center'}}>

                        <GenericButton labelStyle={styles.buttonText} style={{width: STYLE.sizes.screenWidth * 0.5, backgroundColor: STYLE.colors.accent.blue}} label={'Add a Caption'} onPress={handleShare}/>
                        <Text style={{marginVertical: STYLE.sizes.screenHeight * 0.01, color: STYLE.colors.font}}> OR </Text>
                        <GenericButton labelStyle={styles.buttonText} style={{width: STYLE.sizes.screenWidth * 0.5}} label={'back to home'} onPress={handleGoHome}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        width: STYLE.sizes.screenWidth * 0.9,
    },
    title: {
        fontSize: 24,
        fontFamily: STYLE.font.poppinsSemiBold,
        marginBottom: 10,
        color: STYLE.colors.font,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 15,
        fontFamily: STYLE.font.poppins,
        color: STYLE.colors.font,
    },
    checkmark: {
        width: 100,
        height: 100,
        marginBottom: STYLE.sizes.screenHeight * 0.04,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        fontSize: STYLE.sizes.screenHeight * 0.018,
    }
};

export default ConfirmUploadScreen;