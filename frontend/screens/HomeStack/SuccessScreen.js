import React, {useState, useEffect, useCallback, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView, ImageBackground, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import STYLE from '@styles/Styles';
import GenericButton from '@components/GenericButton';


export default function SuccessScreen({navigation, route}){
    const {name} = route.params.item;

    const headingFade = useRef(new Animated.Value(0)).current;
    const text1FadeVal = useRef(new Animated.Value(0)).current;
    const text2FadeVal = useRef(new Animated.Value(0)).current;
    const btnPanAniVal = useRef(new Animated.Value(0)).current;

    
    const thankyouContent = 'Thank you for joining the effort to create a healthier Earth!'
    const currIndex = useRef(0);
    const [thankyouText, setThankyouText] = useState('');
    const [startEffect, setStartEffect] = useState(false);

    useEffect(() => {
        fadeEffect(headingFade, () => {
            fadeEffect(text1FadeVal, () => {
                fadeEffect(text2FadeVal, () => {
                    // do nothing
                    setStartEffect(true);

                })
            })
        })
    }, [])

    const tick = ()=> {
      setThankyouText(prev => prev + thankyouContent[currIndex.current]);
      currIndex.current++;
    }
    React.useEffect(() => {
        if(startEffect){
            if (currIndex.current < thankyouContent.length) {
                let addChar = setInterval(tick, 50);
                return () => clearInterval(addChar);
            }else if(currIndex.current === thankyouContent.length){
                // start next animation
                fadeEffect(btnPanAniVal, () => {
                    // do nothing
                })
            }
        }
    }, [thankyouText, startEffect]);

    const fadeEffect = useCallback((aniVal, nextAnimation) => {
        Animated.timing(
            aniVal,
            {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }
        ).start(nextAnimation);
    }, [])


    

    return (
        <View style={{flex: 1}}>
            <ImageBackground source={{uri: 'https://rainscapes.com/wp-content/uploads/2022/04/AdobeStock_269948070-scaled.jpeg'}} 
            style={styles.imageContainer}>
                <View style={styles.overlay}>
                    <Animated.View 
                        style={{flex: 0.2, justifyContent: 'center', opacity: headingFade }}
                    >
                        <Text adjustsFontSizeToFit style={styles.heading}>Congradulations!</Text>
                    </Animated.View>
                    <Animated.View style={{flex: 0.1, justifyContent: 'center', opacity: text1FadeVal}}>
                        <Text adjustsFontSizeToFit style={styles.bodyText}>{`By picking up ${name}, you just saved...`}</Text>
                    </Animated.View>
                    <Animated.View style={{textAlign: 'flex-start', opacity: text2FadeVal}}>
                        <Text adjustsFontSizeToFit style={styles.bodyText}>{`\u2022 up to 10 trees`}</Text>
                        <Text adjustsFontSizeToFit style={styles.bodyText}>{`\u2022 up to $200`}</Text>
                        <Text adjustsFontSizeToFit style={styles.bodyText}>{`\u2022 up to 5 tons of metal`}</Text>
                    </Animated.View>
                    <View style={{flex: 0.3, justifyContent: 'flex-end'}}>
                        <Text style={[{
                            fontSize: STYLE.sizes.screenHeight * 0.025,
                            fontFamily: STYLE.font.dmsansBold,
                            color: STYLE.colors.font,
                            fontSize: STYLE.sizes.h3,
                            paddingVertical: STYLE.sizes.screenHeight * 0.005,
                        }]}>{thankyouText}</Text>
                    </View>
                    <Animated.View style={[styles.buttonPan, {opacity: btnPanAniVal}]}>
                        <GenericButton
                            label='Leave a note for the owner'
                            onPress={() => navigation.navigate('Home')}
                            labelStyle={styles.buttonLabel}
                            style={{backgroundColor: STYLE.colors.accent.blue, marginVertical: STYLE.sizes.screenHeight * 0.01}}
                        />
                        <GenericButton
                            label='Share your finding on instagram'
                            onPress={() => navigation.navigate('Home')}
                            labelStyle={styles.buttonLabel}
                            style={{marginVertical: STYLE.sizes.screenHeight * 0.01}}
                        />
                        <GenericButton
                            label='Back to Home'
                            onPress={() => navigation.navigate('Home')}
                            labelStyle={styles.buttonLabel}
                            style={{backgroundColor: STYLE.colors.accent.gray, marginVertical: STYLE.sizes.screenHeight * 0.01}}
                        />
                    </Animated.View>

                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        flex:1,
        resizeMode: 'cover', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    overlay:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        paddingHorizontal: STYLE.sizes.screenWidth * 0.05,
        paddingVertical: STYLE.sizes.screenHeight * 0.05,
        alignItems: 'center',
    },
    heading:{
        color: STYLE.colors.font,
        fontSize: STYLE.sizes.h2,
        fontFamily: STYLE.font.poppinsMed,
    },
    bodyText:{
        color: STYLE.colors.font,
        fontSize: STYLE.sizes.h3,
        paddingVertical: STYLE.sizes.screenHeight * 0.005,
    },
    buttonLabel:{
        fontSize: STYLE.sizes.screenHeight * 0.02,
    },
    buttonPan:{
        flex: 0.4,
        justifyContent: 'center',
        // width: '100%',
    }
    
});