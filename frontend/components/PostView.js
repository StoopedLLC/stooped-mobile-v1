/*
*/



import React, { useEffect, useCallback, useState } from 'react';
import {GlassButton} from '@metafic-co/react-native-glassmorphism'
import STYLE from '@styles/Styles.js';
import ItemFrame from './ItemFrame';
import { View, Text, Dimensions, StyleSheet, Image, TouchableNativeFeedback, SafeAreaView, ScrollView } from 'react-native';
import { formatIsoDate } from "@backend/util";


export default function PostView(props){

    let squares = [];
    let test = 5; // swap out test for props.data.length
    for (let index = 0; index < test; index++) {
        squares.push(
            <View key={index} 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: 20,
                marginBottom: 20,
            }}>
                <View
                style={{
                    // borderWidth: 2,
                    // border: '1px solid black',
                    borderRadius: 30,
                    height: STYLE.sizes.screenHeight * .6,
                    width: STYLE.sizes.screenWidth * .9,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    shadowColor: 'rgba(30,30,30,0.5)',
                    shadowOffset: {width: 10, height: 10},
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                }}>
                    <View style={[{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: STYLE.sizes.screenHeight * 0.02,
                    paddingBottom: STYLE.sizes.screenHeight * 0.005,
                    paddingLeft: STYLE.sizes.screenWidth * 0.04,
                    paddingRight: STYLE.sizes.screenWidth * 0.04,
                    }]}>
                        <Image
                        source={require('@images/Bryant.jpg')}
                        style={{
                        resizeMode: 'cover',
                        width: STYLE.sizes.screenWidth * 0.16,
                        height: STYLE.sizes.screenWidth * 0.16,
                        borderRadius: 100,
                        borderColor: 'rgba(0,0,0)',
                        borderWidth: 2,
                        }}
                        />

                        <View 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: STYLE.sizes.screenWidth * 0.06
                        }}>
                            <Text
                            style={{
                                fontSize: '18em',
                                color: 'white',
                            }}>
                                Hello
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text>Hello post {index}</Text>
                    </View>
                </View>
                
            </View>
        )
    }


    return (
        <ScrollView
        decelerationRate={0}
        snapToInterval={STYLE.sizes.screenHeight * .65} //your element width
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        style={{
            height: STYLE.sizes.screenHeight * 0.80,
            marginTop: STYLE.sizes.screenHeight * 0.02
        }}
        >
            {squares}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
})