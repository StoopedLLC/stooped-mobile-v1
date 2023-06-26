import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import STYLE from '@styles/Styles';


export default function Loading({style}) {
    const dotSize = 10;
    const dotMargin = 5;
    const dotDelay = 300; // Delay between dot animations in milliseconds

    const animation1 = useRef(new Animated.Value(0)).current;
    const animation2 = useRef(new Animated.Value(0)).current;
    const animation3 = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        const animateDot = (animation, delay) => {
          setTimeout(() => {
            Animated.loop(
              Animated.sequence([
                Animated.timing(animation, {
                  toValue: 1,
                  duration: 1000,
                  easing: Easing.linear,
                  useNativeDriver: true,
                }),
                Animated.timing(animation, {
                  toValue: 0,
                  duration: 1000,
                  easing: Easing.linear,
                  useNativeDriver: true,
                }),
              ]),
            ).start();
          }, delay);
        };
      
        animateDot(animation1, 0);
        animateDot(animation2, dotDelay);
        animateDot(animation3, dotDelay * 2);
      };

    useEffect(() => {
        startAnimation();
    }, []);

    const dotStyle = {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: '#fff',
        marginHorizontal: dotMargin,
    };

    const dot1Scale = animation1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
    });

    const dot2Scale = animation2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
    });

    const dot3Scale = animation3.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
    });

    return (
        <View style={[{ 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#00000088', 
            borderRadius: STYLE.borders.lessRound,
            width: STYLE.sizes.screenWidth * 0.2,
            height: STYLE.sizes.screenWidth * 0.15,
            elevation: 5,
            zIndex: 5,
            position: 'absolute',
            top: STYLE.sizes.screenHeight * 0.35,
            left: STYLE.sizes.screenWidth * 0.35,

        }, style]}>
            <Animated.View style={[dotStyle, { transform: [{ scale: dot1Scale }] }]} />
            <Animated.View style={[dotStyle, { transform: [{ scale: dot2Scale }] }]} />
            <Animated.View style={[dotStyle, { transform: [{ scale: dot3Scale }] }]} />
        </View>
    );
};