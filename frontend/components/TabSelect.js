/*
This component is a tab toggle that allows the user to switch between the different options supplied

props:
    tabs: an array of objects that contain the following properties:
        name: the name of the tab
        value: the value of the tab
    onTabChange: a function that is called when the user changes the tab
    selectedValue: the value of the tab that is currently selected
    themeColor: theme color used for the tab
*/

import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import STYLE from '@styles/Styles';

export default function TabSelect(props) {
    const [selectedIndex, setSelectedIndex] = useState(0); 

    const handleTabChange = (tabIndex) => {
        if (props.selectedValue !== props.tabs[tabIndex].value) {
            props.onTabChange(props.tabs[tabIndex].value);
            setSelectedIndex(tabIndex);
        }
    };

    useEffect(() => {
        const index = props.tabs.findIndex((tab) => {return tab.value === props.selectedValue});
        if(index !== -1){
            handleTabChange(index);
        }
    }, [props.selectedValue]);
  



    return (
    <View style={[styles.container,{borderColor: props.themeColor, borderWidth: 1}]}>
        {props.tabs.map((tab, tabIndex) => (
        <TouchableOpacity
            key={tabIndex}
            style={[
            styles.tab,
            { backgroundColor: selectedIndex === tabIndex ? props.themeColor : 'transparent' },
            { borderColor: props.themeColor}
            ]}
            onPress={() => handleTabChange(tabIndex)}
        >
            <Text style={[styles.tabText, { color: selectedIndex === tabIndex ? STYLE.colors.font : props.themeColor }]}>
            {tab.name}
            </Text>
        </TouchableOpacity>
        ))}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: STYLE.borders.lessRound,
    overflow: 'hidden',
  },
  tab: {
    paddingHorizontal: STYLE.sizes.screenWidth * 0.01,
    paddingVertical: STYLE.sizes.screenHeight * 0.01,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  tabText: {
    fontFamily: STYLE.font.poppinsMed,
    fontSize: 12,
  },
});

