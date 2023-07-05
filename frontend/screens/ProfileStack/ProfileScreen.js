import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image } from "react-native";
import STYLE from "@styles/Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import SaveButton from '@components/SaveButton';
import { collection } from "firebase/firestore";
import MapView, {Marker} from "react-native-maps";
import SwipeButton from "@components/SwipeButton";
import { formatIsoDate, getNumDays, getNumHours } from "@backend/util";
import {ProfileBody, ProfileButtons} from '@components/ProfileUtils';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from '@components/BottomTabView';
import ItemDetailModal from "@components/ItemDetailModal";
import { getPastUserPickups, getPastUserPosts, getUserData } from "@backend/user";
import { getSavedItems } from "@backend/item";
import { getUserId } from "@backend/user";




export default function ProfileScreen() {

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [saved, setSaved] = useState([]);
    const [claimed, setClaimed] = useState([]);
    const [itemData, setItemData] = useState({});
    const [itemModalVisible, setItemModalVisible] = useState(false);


    
    const dataLoad = async () => {
        // TODO get user data from backend
        const userId = await getUserId();
        console.log(userId);
        const user = await getUserData(userId);
        if(user){
            setUser(user);
        }

        // TODO get user posts from backend
        const posts = await getPastUserPosts(userId);
        if(posts){
            setPosts(posts);
        }
        
        const claimed = await getPastUserPickups(userId);
        if(claimed){
            setClaimed(claimed);
        }
        const saved = await getSavedItems(userId);
        if(saved){
            setSaved(saved);
        }

    }

    useEffect(() => {
        dataLoad();
    }, []);
    

    return (
        <SafeAreaView 
        style={{
            height: STYLE.sizes.screenHeight,
        }}>
            <View style={{width: '100%', height: '100%'}}>
            <View style={{width: '100%', padding: 10}}>
                <ProfileBody
                name={user.first_name}
                accountName="mr_peobody"
                profileImage={require('@images/Bryant.jpg')}
                followers="3.6M"
                following="35"
                post={posts.length}
                pickedUp={claimed.length}
                moneySaved={claimed.length * 5}
                />
                <ProfileButtons
                id={0}
                name="Mr Peobody"
                accountName="mr_peobody"
                profileImage={require('@images/Bryant.jpg')}
                />
            </View>
            
            <BottomTabView 
                posts={posts}
                claimed={claimed}
                saved={saved}
                onItemPressed={(type, itemData)=>{
                    itemData.type = type;
                    setItemData(itemData);
                    setItemModalVisible(true);
                }} 
            />
            </View>
            {
                itemModalVisible && 
                <ItemDetailModal item={itemData} setIsVisible={setItemModalVisible} isVisible={itemModalVisible} />
            }
        </SafeAreaView>
  );
};


const styles = StyleSheet.create({
   
});