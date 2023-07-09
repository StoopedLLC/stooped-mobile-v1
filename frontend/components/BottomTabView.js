import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import STYLE from '../assets/styles/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


const BottomTabView = ({posts, claimed, saved, onItemPressed}) => {
  const Tab = createMaterialTopTabNavigator();

  const SquareFeed = (data, count, type) => {
    let squares = [];
    let image_url = '';
    for (let index = 0; index < count; index++) {
      if(data[index].image_links){
        image_url = data[index].image_links[0];
      }else{
        image_url = 'https://cdn.shopify.com/s/files/1/0522/6912/1736/products/wyc8ptqiqkjjvj9wjsom.jpg?v=1614635808';
      }

      squares.push(
        <TouchableOpacity key={index} onPress={()=>{onItemPressed(type, data[index])}}>
          <View
            style={{
              width: STYLE.sizes.screenWidth * 0.33,
              height: STYLE.sizes.screenWidth * 0.33,
              marginVertical: 0.5,
              backgroundColor: 'black',
              shadowColor: 'white',
              shadowOffset: { width: 0, height: -1 },
              shadowOpacity: 0.8,
              shadowRadius: 5,
              marginHorizontal: STYLE.sizes.screenWidth * 0.0015,  
            }}>
              <Image
                source={{uri: image_url}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
        </TouchableOpacity>,
      );
    }
    return squares;
  }

  const PostGrid = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: STYLE.sizes.screenHeight * 0.005,
            justifyContent: 'flex-start',
          }}>
          {SquareFeed(posts, posts.length, 'post')}
        </View>
      </ScrollView>
    );
  };
  const ClaimedGrid = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: STYLE.sizes.screenHeight * 0.005,
            justifyContent: 'flex-start',
          }}>
          {SquareFeed(claimed, claimed.length,'claimed')}
        </View>
      </ScrollView>
    );
  };
  const SavedGrid = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: STYLE.sizes.screenHeight * 0.005,
            justifyContent: 'flex-start',

          }}>
          {SquareFeed(saved, saved.length,'saved')}
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({focused, colour}) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'envelope' : 'envelope-o';
            colour = focused ? 'lightblue' : 'gray';
          } else if (route.name === 'Claimed') {
            iconName = focused ? 'ios-trophy' : 'ios-trophy-outline';
            colour = focused ? 'lightblue' : 'gray';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'heart' : 'heart-outline';
            colour = focused ? 'lightblue' : 'gray';
          }

          return iconName.includes('envelope')? 
          <FontAwesome name={iconName} color={colour} size={22} />:<Ionic name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Claimed" component={ClaimedGrid} />
      <Tab.Screen name="Posts" component={PostGrid} />
      <Tab.Screen name="Saved" component={SavedGrid} />
    </Tab.Navigator>
  );
};

export default BottomTabView;