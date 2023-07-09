/*
This component is the map view to be shown on the home page with all the items

props:
    - data: array of items to be shown on the map
    - currLocation: current location of the user

*/
import React, {useEffect, useRef, useState} from "react"
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from "react-native"
import MapView, { Marker } from "react-native-maps"
import STYLE from "@styles/Styles"
import GenericButton from "./GenericButton"
import { getDistanceInMiles } from "../../backend/location"
import { useNavigation } from "@react-navigation/native"



export default function StoopMap({ data, onSearchTriggered }) {

    const mapRef = useRef(null)
    const [searchButtonVisible, setSearchButtonVisible] = useState(false)
    const [regionZoom, setRegionZoom] = useState(0.01)

    const [showItemModal, setShowItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const nav = useNavigation();
    const visibility = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToSuppliedMarkers(data.map(item => `marker-${item.id}`), {
                edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
                animated: true,
            })
        }
    }, [])

    useEffect(() => {
        if(selectedItem!==null){
            setShowItemModal(true)
        }
    }, [selectedItem])

    useEffect(() => {
        Animated.timing(visibility, {
            toValue: showItemModal ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [showItemModal])
    



    return (
        <View style={styles.mapView}>
            {
                searchButtonVisible && 
                <View
                    style={{position:'absolute', top: 10, right: 10, zIndex: 1}}
                >
                    <GenericButton
                        label="Search in this Area"
                        onPress={() => {
                            // TODO: redo search in this area
                            console.log('search in this area')
                            mapRef.current.getCamera().then((camera) => {
                                console.log(camera)
                                const region = {
                                    latitude: camera.center.latitude,
                                    longitude: camera.center.longitude,
                                    
                                }
                                console.log('zoomed to region', region)

                                const radius = getDistanceInMiles({
                                    latitude: regionZoom,
                                    longitude: 0,
                                },{
                                    latitude: 0,
                                    longitude: 0,
                                }
                                ) * 1600
                                console.log('radius', radius)
                                onSearchTriggered(region, radius);
                            })
                        }}
                        labelStyle={{color: STYLE.color.font, fontSize: 10 }}
                        style={{ width: STYLE.sizes.screenWidth * .2 }}
                    />
                </View>

            }
            {
                showItemModal &&
                <Animated.View
                    style={{
                        opacity: visibility,
                        position: 'absolute',
                        bottom: STYLE.sizes.screenHeight * 0.1,
                        alignSelf: 'center',
                        height: STYLE.sizes.screenHeight * 0.15,
                        width: STYLE.sizes.screenWidth * 0.7,
                        backgroundColor: STYLE.color.background+ '66',
                        zIndex: 1,
                        borderRadius: STYLE.borders.normalRound,
                        paddingHorizontal: STYLE.sizes.screenWidth * 0.05,
                        paddingVertical: STYLE.sizes.screenHeight * 0.02,
                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 5,
                        elevation: 5,
                    }}
                >
                    <TouchableOpacity style={{
                        flex: 1,
                        flexDirection:'row',
                        justifyContent: 'space-between',
                    }} onPress={()=>{
                        setShowItemModal(false)
                        nav.navigate('Detail', {item: selectedItem})
                    }}>
                        <View style={{flex: 0.3, alignSelf:'center'}}>
                            <Image 
                                style={{
                                    height: STYLE.sizes.screenHeight * 0.1, 
                                    width: STYLE.sizes.screenHeight * 0.1,
                                    borderRadius: STYLE.borders.normalRound,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                source={{uri: (selectedItem.image_links && selectedItem.image_links[0]) || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}}
                            />
                        </View>
                        <View style={{flex: 0.6}}>
                            <Text adjustsFontSizeToFit style={{fontFamily: STYLE.font.poppinsSemiBold, color: STYLE.color.font, fontSize: 20, }}>{selectedItem.name || 'name'}</Text>
                            <Text adjustsFontSizeToFit style={{color: STYLE.color.font, fontSize: 15}}>{`${selectedItem.distance.toFixed(2) || 'distance'}mi away`}</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            }
            <MapView
                ref={mapRef}
                style={styles.map}
                // initialRegion={{
                //     latitude: itemLocation.latitude,
                //     longitude: itemLocation.longitude,
                // }}
                showsUserLocation={true}
                onRegionChangeComplete={(region) => {
                    if (region.latitudeDelta > 0.001 && region.longitudeDelta > 0.001) {
                        setSearchButtonVisible(true)
                        // wait for 10 seconds then hide the search button
                        setRegionZoom(region.latitudeDelta)
                    }
                }}
                onMarkerDeselect={() => {
                    setSelectedItem(null)
                    setShowItemModal(false)
                }}
            >
                
                {data.map((item, index) => {
                    return (
                        <Marker 
                            key={`marker-${item.id}`} 
                            coordinate={item.location} 
                            identifier={`marker-${item.id}`}
                            onPress={(e) => { 
                                setSelectedItem(item)
                            }}
                        >
                            <Image 
                                source={require('@images/map-pin.png')}
                                style={STYLE.mapPin}
                            />
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
    mapView:{
        height: STYLE.sizes.screenHeight * .72,
        width: STYLE.sizes.screenWidth * .95,
        alignSelf: 'center',
        borderRadius: STYLE.borders.moreRound,
        // shadow on the bottom right
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:-1,
        elevation: -1,
        flex: 1,
        overflow: 'hidden',
        borderRadius: STYLE.borders.normalRound,
    },
})