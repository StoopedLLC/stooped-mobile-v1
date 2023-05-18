/*
This component is similiar to a button but instead you swipe to move on to the next page or to submit a request.

props:
    exteriorButtonColor: the color of the button
    innerButtonColor: the color of the button that you swipe
    message: the message that is displayed on the button
    onSwipeComplete: the function that is called when the button is swiped to the end

*/
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, Dimensions} from 'react-native';
import STYLE from '@styles/Styles';
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { ChevronsRight } from "react-native-feather";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export default function SwipeButton(props){

    const X = useSharedValue(0);
    const [toggle, setToggle] = useState(false);

    const handleComplete = (isToggled) => {
        if (isToggled !== toggle) {
            setToggle(isToggled);
        }
        if(props.hasOwnProperty('onSwipeComplete')){
            props.onSwipeComplete();
        }
        // X.value = withSpring(0);
    }

    const handleGestureEvent = useAnimatedGestureHandler(
        {
            onStart: (_, context) => {
                context.completed = toggle;
            },

            onActive: (event, context) => {
                let newValue;
                if(context.completed) {
                    newValue = 290 + event.translationX;
                } else {
                    newValue = event.translationX;
                }

                if(newValue >= 0 && newValue <= (STYLE.sizes.screenWidth * .6)) {
                    X.value = newValue;
                }
            },

            // TODO: implement where it goes to the next page...
            onEnd: () => {
                if (X.value < (STYLE.sizes.screenWidth * .6)/2) {
                    X.value = withSpring(0);
                } else {
                    X.value = withSpring(STYLE.sizes.screenWidth * .6);
                    runOnJS(handleComplete)(true);
                }

            }
        }
    );
    

    const AnimatedStyles = {
        swipeStyles: useAnimatedStyle(() => {
            return {
                transform: [{
                    translateX: X.value,
                }]
            }
        }),
        swipeText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(X.value, [0, (STYLE.sizes.screenWidth * .2)], [0.3, 0], Extrapolation.CLAMP),
                transform: [{
                    translateX: interpolate(X.value, [0, (STYLE.sizes.screenWidth * .07)], [0, (STYLE.sizes.screenWidth * .2)/2 - (STYLE.sizes.screenWidth * .03)])
                }]
            }
        }), 
    }



    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            <View style={{
                width: STYLE.sizes.screenWidth * .9,
                height: STYLE.sizes.screenHeight * .09,
                backgroundColor: props.exteriorButtonColor,
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 50,
            }}>
                
                <PanGestureHandler onGestureEvent={handleGestureEvent}>
                    <Animated.View style={[{
                    marginLeft: STYLE.sizes.screenWidth * .035,
                    backgroundColor: props.innerButtonColor,
                    height: STYLE.sizes.screenHeight * .06, 
                    width: STYLE.sizes.screenWidth * .2,
                    borderRadius: 50,
                    position: "absolute",
                    left: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    }, AnimatedStyles.swipeStyles]}>
                        <ChevronsRight color={"black"} width={40} height={40} />
                    </Animated.View>
                </PanGestureHandler>

                <Animated.Text style={[{color: "black", opacity: 0.3, fontWeight: 'bold'}, AnimatedStyles.swipeText]}>
                    {props.message}
                </Animated.Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})