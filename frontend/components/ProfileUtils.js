import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import STYLE from "@styles/Styles";

export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  pickedUp,
  post,
  followers,
  following,
  moneySaved,
}) => {
  return (
    <View>
        <ImageBackground source={require('@images/banner.png')} resizeMode="cover" imageStyle={{ 
             borderRadius: 20,
             width: "100%",
             height: STYLE.sizes.screenHeight * 0.09,
             borderColor: 'white',
             borderWidth: 3,
             shadowColor: 'white',
             shadowOffset: { width: 0, height: -1 },
             shadowOpacity: 0.8,
             shadowRadius: 20,  
             elevation: -5
            }}>
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: "100%",
                    transform: [{translateX: 0}, {translateY: STYLE.sizes.screenHeight * 0.03}],
                }}>
                    <Image
                        source={profileImage}
                        style={{
                        resizeMode: 'cover',
                        width: 90,
                        height: 90,
                        borderRadius: 100,
                        borderColor: 'white',
                        borderWidth: 2,
                        }}
                    />

                    <View style={{
                        paddingVertical: STYLE.sizes.screenHeight * 0.01,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'white',
                            }}>
                            {name}
                        </Text>
                        <Text
                            style={{
                            fontSize: 14,
                            color: 'white',
                            opacity: 0.7
                            }}>
                            @{name}
                        </Text>
                    </View>
                </View>
          
        </ImageBackground>
        
        <ScrollView 
         horizontal= {true}
         decelerationRate={3}
         snapToInterval={STYLE.sizes.screenWidth} //your element width
         snapToAlignment={"center"}
         showsHorizontalScrollIndicator={false}
         bounces={true}
         style={{
              marginTop: STYLE.sizes.screenHeight * 0.04,
              }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: STYLE.sizes.screenWidth,
          }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white',}}>{post}</Text>
                <Text style={{color: "white"}}>Posts</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white',}}>{pickedUp}</Text>
                <Text style={{color: "white"}}>Picked Up</Text>
              </View>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: STYLE.sizes.screenWidth,
          }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>{followers}</Text>
                <Text style={{color: "white"}}>Followers</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white',}}>${moneySaved}</Text>
                <Text style={{color: "white"}}>Money Saved</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white',}}>{following}</Text>
                <Text style={{color: "white"}}>Following</Text>
              </View>
          </View>
        </ScrollView>
    </View>
  );
};

export const ProfileButtons = ({user, id, name, accountName, profileImage}) => {
  const navigation = useNavigation();
  const [follow, setFollow] = useState(follow);
  return (
    <>
      {/* {id === 0 ? ( */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('EditProfile', {
                user,
                name: name,
                accountName: accountName,
              })
            }
            style={{
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                borderColor: '#DEDEDE',
                color: 'white',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                  color: 'white',
                }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      {/* ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{width: '42%'}}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : '#3493D9',
                borderWidth: follow ? 1 : 0,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: follow ? 'black' : 'white'}}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '42%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text>Message</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Feather
              name="chevron-down"
              style={{fontSize: 20, color: 'black'}}
            />
          </View>
        </View>
      )} */}
    </>
  );
};