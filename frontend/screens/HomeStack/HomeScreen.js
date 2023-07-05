import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, TouchableNativeFeedback, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import STYLE from "@styles/Styles";
import { SearchBar } from 'react-native-elements';
import { List } from 'react-native-feather'
import CarouselList from "@components/CarouselList";
import StoopMap from "@components/StoopMap";
import { addToSavedItem, removeFromSavedItem, getFeed } from "@backend/item"; 
import { getCurrentLocation, getDistanceInMiles } from "@backend/location";
import FilterModal from "@components/FilterModal";
import Loading from "@components/Loading";
import { getUserId } from "@backend/user";


export default function HomeScreen({navigation, route}) {
    const nav = useNavigation();
    const [search, setSearch] = React.useState('');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [contentFeed, setContentFeed] = useState([]);
    const [toggle, setToggle] = useState(false); // toggle between list and map view
    const [showFilter, setShowFilter] = useState(false);

    const [radius, setRadius] = useState(1600);
    const [time_posted, setTimePosted] = useState(72);
    const [sortBy, setSortBy] = useState('distance');
    const [filterReady, setFilterReady] = useState(false);
    const [filter, setFilter] = useState({
        radius: 1600,
        time_posted: 72,
        sortBy: 'distance',
    })


    const toggleView = () => {
        setToggle(!toggle);
        console.log("toggle view");
    }

    const activateFilter = (filters) => {
        let changed = false;
        if(filters.radius!==radius){
            changed = true;
        }
        if(filters.time_posted!==time_posted){
            changed = true;
        }
        if(filters.sortBy!==sortBy){
            // TODO: figure out sorting
            setSortBy(filters.sortBy);
        }
        if(changed){
            setRadius(filters.radius);
            setTimePosted(filters.time_posted);
            setFilter({
                radius: filters.radius,
                time_posted: filters.time_posted,
                ...filters
            })
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


    const dataLoad = async () => {
        try{
            // obtain location first
            const location = await getCurrentLocation();
            if(!location){
                return; // add further effect on failed load
            }

            const userId = await getUserId();

            const f = await getFeed({id:userId},location, { 
                radius: radius,
                time_units: 'hours',
                time_posted: time_posted,
            });
            if(f){
                for(let i = 0; i < f.length; i++){
                    f[i].distance = getDistanceInMiles({
                        latitude: location.latitude, 
                        longitude: location.longitude
                    }, {
                        latitude: f[i].location.latitude, 
                        longitude: f[i].location.longitude
                    })
                }
            }
            // console.log('feed', f)

            if(f){
                setContentFeed(f);
            }else{
                alert('fail to load feed') // add further effect on fail load
            }
        }catch(error){
            alert('something went wrong! Please restart the app.')
            console.log(error);
        }
    }

    // obtain location and load data
    // useEffect(() => {
    //     if(radius && time_posted && sortBy){
    //         dataLoad();
    //     }
    // }, [])

    useEffect(() => {
        console.log('filter', filter)
        dataLoad();
    }, [filter])

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
                        <List width={STYLE.sizes.screenWidth * 0.1} height={STYLE.sizes.screenWidth * 0.09} stroke={STYLE.color.font}/>
                    </TouchableOpacity>

                    <TouchableNativeFeedback
                        onPress={() => console.log('user icon pressed')}
                    >
                        <View style={styles.userIconContainer}>
                            <Image source={require('@images/default-user-icon.png')}
                                style={{width: STYLE.sizes.screenWidth * 0.09, height: STYLE.sizes.screenWidth * 0.09}}
                            />
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
                        placeholder="Search"
                        onChangeText={val=>setSearch(val)}
                        value={search}
                        containerStyle={{
                            backgroundColor: STYLE.color.background, 
                            width: STYLE.sizes.screenWidth * 0.75, 
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                            paddingLeft: 0,
                        }}
                        inputContainerStyle={styles.searchBox}
                    />
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={()=>{setShowFilter(!showFilter)}}
                    >
                        <Image source={require('@images/filter-symbol.png')} 
                        style={{width: STYLE.sizes.screenWidth * 0.07, height: STYLE.sizes.screenWidth * 0.051}}
                        />
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
                        <StoopMap data={contentFeed} onSearchTriggered={dataLoad}/>
                    )
                }
            </ScrollView>
            <FilterModal 
                onConfirm={activateFilter} 
                isVisible={showFilter} 
                setIsVisible={(v)=> setShowFilter(v)} 
                initialValues={{distance: radius, postedWithin: time_posted, sortBy: sortBy}} 
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
        backgroundColor: STYLE.color.accent.gray,
        borderRadius: STYLE.borders.normalRound,
    },
    filterButton:{
        backgroundColor: STYLE.color.accent.gray,
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: STYLE.sizes.screenHeight * 0.015,
        borderRadius: STYLE.borders.normalRound,
        paddingHorizontal: STYLE.sizes.screenWidth * 0.022,
        paddingVertical: STYLE.sizes.screenHeight * 0.018,
    },
    userIconContainer:{
        backgroundColor: STYLE.color.font,
        padding: STYLE.sizes.screenWidth * 0.01,
        borderRadius: 0.055 * STYLE.sizes.screenWidth,
    },
});
