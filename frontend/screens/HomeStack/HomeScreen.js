import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, TouchableNativeFeedback, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import STYLE from "@styles/Styles";
import { SearchBar } from 'react-native-elements';
import { List, Map } from 'react-native-feather'
import CarouselList from "@components/CarouselList";
import StoopMap from "@components/StoopMap";
import { addToSavedItem, removeFromSavedItem, getFeed } from "@backend/item"; 
import { getCurrentLocation, getDistanceInMiles } from "@backend/location";
import FilterModal from "@components/FilterModal";
import Loading from "@components/Loading";
import { getUserId } from "@backend/user";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function HomeScreen({navigation, route}) {
    const nav = useNavigation();
    const [search, setSearch] = React.useState('');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [contentFeed, setContentFeed] = useState([]);
    const [toggle, setToggle] = useState(false); // toggle between list and map view
    const [showFilter, setShowFilter] = useState(false);

    const [filter, setFilter] = useState({
        radius: 1600,
        time_posted: 72,
        sortBy: 'distance',
    })
    const [sortBy, setSortBy] = useState('distance');
    const [initialFilter, setInitialFilter] = useState({
        radius: 1600,
        time_posted: 72,
        sortBy: 'distance',
    })


    const toggleView = () => {
        setToggle(!toggle);
        console.log("toggle view");
    }

    const activateFilter = (newFilter) => {
        let changed = false;
        if(newFilter.radius!==filter.radius){
            changed = true;
        }
        if(newFilter.time_posted!==filter.time_posted){
            changed = true;
        }
        if(newFilter.sortBy!==filter.sortBy){
            // FIXME: look into sorting
            const newFeed = [...contentFeed]
            newFeed.sort((a,b)=>{
                if(newFilter.sortBy==='distance'){
                    return a.distance-b.distance;
                }else if(newFilter.sortBy==='savedCount'){
                    return b.savedCount-a.savedCount;
                }else if(newFilter.sortBy==='posted_date'){
                    return b.posted_date-a.posted_date;
                }else{
                    return 0;
                }
            })
            setSortBy(newFilter.sortBy);
            setContentFeed(newFeed);
        }
        if(changed){
            setFilter({
                radius: newFilter.radius,
                time_posted: newFilter.time_posted,
                ...newFilter
            })
            dataLoad(true, {}, newFilter.radius);
        }
    }

        



    const refreshControl = (
        <RefreshControl
            refreshing={isRefreshing}
            onRefresh={
                async () => {
                    setIsRefreshing(true);
                    await dataLoad();
                    setIsRefreshing(false);
                }
            }
            colors={[STYLE.color.font]}
            tintColor={STYLE.color.font}
        />
    )


    const dataLoad = async (init = false, useUser = true, loc = {}, rad=0) => {
        setIsRefreshing(true);
        try{
            // obtain location first
            const userLocation = await getCurrentLocation();
            if(!userLocation){
                setIsRefreshing(false);
                return; // add further effect on failed load
            }
            const location = !useUser ? loc : userLocation;

            const userId = await getUserId();

            const filterUsed = init ? initialFilter : filter;

            const f = await getFeed({id:userId},location, { 
                radius: rad? Math.min(Math.max(rad, filterUsed.radius), 160000) : filterUsed.radius,
                time_units: 'hours',
                time_posted: filterUsed.time_posted,
            });
            if(f){
                for(let i = 0; i < f.length; i++){
                    f[i].distance = getDistanceInMiles({
                        latitude: userLocation.latitude, 
                        longitude: userLocation.longitude
                    }, {
                        latitude: f[i].location.latitude, 
                        longitude: f[i].location.longitude
                    })
                }
            }
            // console.log('feed', f)
            // update filter
            console.log('rad', rad, 'filter', filter.radius)
            if(rad !=0 && rad!= filter.radius){
                setFilter({
                    ...filter,
                    radius: rad
                })
            }

            // sorting:
            if(sortBy==='distance'){
                f.sort((a,b) => a.distance - b.distance);
            }else if(sortBy==='savedCount'){
                f.sort((a,b) => b.savedCount - a.savedCount);
            }else if(sortBy==='posted_date'){
                f.sort((a,b) => b.posted_date - a.posted_date);
            }


            if(f){
                setContentFeed(f);
            }else{
                alert('fail to load feed') // add further effect on fail load
            }
        }catch(error){
            alert('something went wrong! Please restart the app.')
            console.log(error);
        }
        setIsRefreshing(false);
    }

    // obtain location and load data
    useEffect(() => {
        dataLoad(true);
    }, [initialFilter])


    // rerender if refresh is in param
    if(route.params && route.params.refresh){
        route.params.refresh = false;
        dataLoad();
    }


    return (
        <SafeAreaView>
            <ScrollView 
                scrollEnabled={true}
                refreshControl={refreshControl}
                contentContainerStyle={styles.container}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal:STYLE.sizes.screenWidth*0.02,
                        marginVertical: STYLE.sizes.screenHeight * 0.01,
                    }}
                >
                    <TouchableOpacity
                        onPress={toggleView}
                    >
                        {
                            toggle ?
                            <List width={STYLE.sizes.screenWidth * 0.1} height={STYLE.sizes.screenWidth * 0.09} stroke={STYLE.color.font}/>
                            :
                            <Map width={STYLE.sizes.screenWidth * 0.1} height={STYLE.sizes.screenWidth * 0.09} stroke={STYLE.color.font}/>

                        }
                        
                    </TouchableOpacity>

                    <TouchableNativeFeedback
                        onPress={() => console.log('user icon pressed')}
                    >
                        <View style={styles.userIconContainer}>
                            {/* <Image source={require('@images/default-user-icon.png')}
                                style={{width: STYLE.sizes.screenWidth * 0.09, height: STYLE.sizes.screenWidth * 0.09}}
                            /> */}
                            <Ionicons name="person" size={28} color="white" />                       
                        </View>
                    </TouchableNativeFeedback>
                </View>

                {/* search + filter */}
                <ScrollView contentContainerStyle={{
                    flexDirection:'row', 
                    alignItems: 'center', 
                    justifyContent:'space-between', 
                    paddingHorizontal:STYLE.sizes.screenWidth*0.01,
                    marginVertical: STYLE.sizes.screenHeight * 0.015,
                }}
                    scrollEnabled={false}
                >
                    <SearchBar
                        placeholder="Search Stooped"
                        onChangeText={val=>setSearch(val)}
                        value={search}
                        inputStyle={{color:'#fff'}}
                        placeholderTextColor='rgba(255, 255, 255, 0.5)'
                        containerStyle={{
                            backgroundColor: STYLE.color.background, 
                            width: STYLE.sizes.screenWidth * 0.75, 
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                            paddingLeft: 0,
                            color: 'white'
                        }}
                        inputContainerStyle={styles.searchBox}
                    />
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={()=>{setShowFilter(!showFilter)}}
                    >
                        <Ionicons name="filter-outline" size={30} color="white" />
                    </TouchableOpacity>
                </ScrollView>
                {/* end of search + filter */}
                
                {
                    !toggle ? (
                        <View>
                            {/* component for slider wrap  */}
                            <View style={{
                            }}>
                                <CarouselList data = {contentFeed}/>
                            </View>
                            {/* end of component for slider wrap  */}

                            {/* <TouchableOpacity onPress={()=>{nav.navigate('Pickup', {item: {
                                    id: "1",
                                    name: 'test',
                                    location: {
                                        latitude: 37.78825,
                                        longitude: -122.4324,
                                    },
                                    address: 'test address',
                                    posted_date: 'test date',
                                    saved_count: 0,
                                    distance: 0,
                                }})}}>
                                    <Text> press to go to pick up</Text>
                            </TouchableOpacity> */}
                        </View>
                        
                    ): (
                        <StoopMap data={contentFeed} onSearchTriggered={(loc, zoom)=>dataLoad(true, false, loc, zoom)}/>
                    )
                }
                <TouchableOpacity onPress={()=>{nav.navigate('ConfirmUpload')}}>
                    <Text> press to go to confirm upload</Text>
                </TouchableOpacity>
            </ScrollView>
            <FilterModal 
                onConfirm={activateFilter} 
                isVisible={showFilter} 
                setIsVisible={(v)=> setShowFilter(v)} 
                initialValues={{distance: filter.radius, postedWithin: filter.time_posted, sortBy: sortBy}} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: STYLE.color.background,
        marginHorizontal: STYLE.sizes.screenWidth * 0.05,
    },
    text: {
        color: STYLE.color.font
    },
    
    searchBox:{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        borderRadius: STYLE.borders.lessRound,

    },
    filterButton:{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: STYLE.sizes.screenHeight * 0.015,
        borderRadius: STYLE.borders.lessRound,
        paddingHorizontal: STYLE.sizes.screenWidth * 0.022,
        paddingVertical: STYLE.sizes.screenHeight * 0.01,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    userIconContainer:{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: STYLE.sizes.screenWidth * 0.02,
        borderRadius: STYLE.borders.lessRound,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
});
