/*
This component is the map view to be shown on the home page with all the items

props:
    - data: array of items to be shown on the map
    - currLocation: current location of the user

*/
import React, {useEffect, useRef, useState} from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"
import STYLE from "@styles/Styles"
import GenericButton from "./GenericButton"



export default function StoopMap({ data, onSearchTriggered }) {

    const mapRef = useRef(null)
    const [searchButtonVisible, setSearchButtonVisible] = useState(false)

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToSuppliedMarkers(data.map(item => `marker-${item.id}`), {
                edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
                animated: true,
            })
        }
    }, [mapRef.current])

    return (
        <View style={styles.mapView}>
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
                        setTimeout(() => {
                            setSearchButtonVisible(false)
                        }, 10000)
                    }
                }}
            >
                {
                    searchButtonVisible && 
                    <GenericButton
                        label="Search in this Area"
                        onPress={() => {
                            // TODO: redo search in this area
                            console.log('search in this area')
                            onSearchTriggered();
                        }}
                        labelStyle={{ position: 'absolute', top: 10, right: 10, color: STYLE.color.font, fontSize: 10 }}
                        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1, width: STYLE.sizes.screenWidth * .2 }}
                    />

                }
                {data.map((item, index) => {
                    return (
                        <Marker key={`marker-${item.id}`} coordinate={item.location} identifier={`marker-${item.id}`}>
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