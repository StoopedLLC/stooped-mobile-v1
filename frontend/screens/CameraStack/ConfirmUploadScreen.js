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
        // Code to prompt user for sharing on social media
        // Add your implementation here
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
                <Text style={styles.title}>Upload Complete</Text>
                <Text style={styles.subTitle}>Your item was uploaded successfully!</Text>
                <GenericButton style={{width: STYLE.sizes.screenWidth * 0.5}} label={'back to home'} onPress={handleGoHome}/>
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
    },
    title: {
        fontSize: 24,
        fontFamily: STYLE.font.poppinsSemiBold,
        marginBottom: 10,
        color: STYLE.colors.font,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 20,
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
};

export default ConfirmUploadScreen;