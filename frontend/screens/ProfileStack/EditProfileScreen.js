import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { ToastAndroid, Platform, AlertIOS} from 'react-native';
import STYLE from "@styles/Styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import FormField from "@components/FormField";




export default function EditProfileScreen({navigation, route}) {

    console.log(route.params)

    const {first_name, last_name, username} = route.params.user;
    const [newUsername, setNewUsername] = useState(username);
    const [newFirstName, setFirstName] = useState(first_name);
    const [newLastName, setLastName] = useState(last_name);
    const [imageChange, setImageChange] = useState(false);


    
    return (
        <SafeAreaView style={{
            
        }}>
            <ScrollView style={{
            width: "90%",
            height: "80%",
            backgroundColor: 'rgba(180, 180, 180, 0.3)',
            borderRadius: STYLE.borders.moreRound,
            shadowColor: 'black',
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 5,
            alignSelf: 'center',
            paddingHorizontal: STYLE.sizes.screenWidth * 0.05,
            }}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps='handled'
            >
                <View style={{
                    // XXX: Might have to change if it falls under complication with Android
                    marginTop: Dimensions.get("window").height * 0.04,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='close-outline' style={{fontSize: 35, color: STYLE.colors.font}} />
                    </TouchableOpacity>

                    <Text style={{fontSize: 18, color: STYLE.colors.font, fontWeight: 'bold'}}>
                        Edit Profile
                    </Text>

                    <TouchableOpacity onPress={() => {
                        pushUpdatedValues();
                        TostMessage();
                        onConfirm({username, 'first_name':first_name, 'last_name':last_name, 'image_url':profileImage});
                        navigation.goBack();
                        }}
                    >
                        <Ionicons name='checkmark' style={{fontSize: 35, color:'#349309'}} />
                    </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center', marginVertical: 10}}>
                    <Image
                        source={{uri: 'https://i.pinimg.com/originals/0e/6a/6a/0e6a6a0e1b6b6b0b6b0b6b0b6b0b6b0b.jpg'}}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: '100%',
                            borderWidth: 2,
                            borderColor: 'black',
                            resizeMode: 'contain',
                            backgroundColor: 'black',
                        }} 
                    />
                    <Text style={{
                        color: "#3493b9",
                        fontSize: 16
                    }}
                    >
                    Change Profile Photo
                    </Text>
                </View>

                <View style={{
                    padding: 10
                }}>
                    {/* <View style={{
                        paddingVertical: 15
                    }}>
                    <Text style={{fontSize: 16, opacity: 0.5, paddingBottom: 5}}>First Name</Text>
                    <TextInput placeholder='first name' defaultValue={first_name} style={{
                        fontSize:17,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        paddingBottom: 8
                    }}
                    onChangeText={setFirstName}
                    />
                    </View>

                    <View style={{
                        paddingVertical: 15
                    }}>
                    <Text style={{fontSize: 16, opacity: 0.5, paddingBottom: 5}}>Last Name</Text>
                    <TextInput placeholder='last name' defaultValue={last_name} style={{
                        fontSize:17,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        paddingBottom: 8
                    }}
                    onChangeText={setLastName}
                    />
                    </View>

                    <View style={{
                    paddingVertical: 15
                    }}>
                    <Text style={{fontSize: 16, opacity: 0.5, paddingBottom: 5}}>Username</Text>
                    <TextInput placeholder='username' defaultValue={username} style={{
                        fontSize:17,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        paddingBottom: 8
                    }}
                    onChangeText={setNewUsername} 
                    />
                    </View> */}

                    <FormField 
                        onTextChange={setFirstName} 
                        label="First Name" 
                        defaultValue={first_name} 
                        placeholder={'Your First Name'} 
                        containerStyle={{marginVertical: STYLE.sizes.screenHeight * 0.015}} 
                    />
                    <FormField 
                        onTextChange={setLastName} 
                        label="Last Name" 
                        defaultValue={last_name} 
                        placeholder={'Your Last Name'}
                        containerStyle={{marginVertical: STYLE.sizes.screenHeight * 0.015}} 
                    />

                    <FormField 
                        onTextChange={setNewUsername} 
                        label="Username" 
                        defaultValue={username} 
                        placeholder={'Your @'} 
                        containerStyle={{marginVertical: STYLE.sizes.screenHeight * 0.015}} 
                    />

                    
                    {/* <View style={{
                    paddingVertical: 15
                    }}>
                    <TextInput placeholder='Website'
                    style={{
                        fontSize:17,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        paddingBottom: 8
                    }} />
                    </View> */}

                    {/* <View style={{
                    paddingVertical: 15
                    }}>
                    
                    <TextInput placeholder='Bio'
                    style={{
                        fontSize:17,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        paddingBottom: 8
                    }} />
                    </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
  );
};


const styles = StyleSheet.create({
   
});