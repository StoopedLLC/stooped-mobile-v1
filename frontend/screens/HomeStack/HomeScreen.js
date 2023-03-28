import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, TouchableNativeFeedback, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import STYLE from "../../src/styles/styles";
import ItemFrame from "../../components/ItemFrame";
import { SearchBar } from 'react-native-elements';
import { List } from 'react-native-feather'


export default function HomeScreen() {
    const nav = useNavigation();
    const [search, setSearch] = React.useState('');


    return (
        <ScrollView scrollEnabled={false}>
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal:STYLE.sizes.screenWidth*0.01,
                        marginVertical: STYLE.sizes.screenHeight * 0.02,
                    }}
                >
                    <TouchableNativeFeedback
                        onPress={() => console.log('list toggle pressed')}
                    >
                        <List width={STYLE.sizes.screenWidth * 0.1} height={STYLE.sizes.screenWidth * 0.1} stroke={STYLE.color.font}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => console.log('user icon pressed')}
                    >
                        <View style={styles.userIconContainer}>
                            <Image source={require('../../src/images/default-user-icon.png')}
                                style={{width: STYLE.sizes.screenWidth * 0.1, height: STYLE.sizes.screenWidth * 0.1}}
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
                    marginVertical: STYLE.sizes.screenHeight * 0.02,
                }}>
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
                    >
                        <Image source={require('../../src/images/filter-symbol.png')} 
                        style={{width: STYLE.sizes.screenWidth * 0.07, height: STYLE.sizes.screenWidth * 0.051}}
                        />
                    </TouchableOpacity>
                </ScrollView>
                {/* end of search + filter */}

                {/* TODO: move the folloiwng view to new component for slider wrap */}
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={styles.frame}>
                        <ItemFrame item={{name: 'name', location:{}, id:'123123123'}}/>
                    </View>
                </View>
                {/*  */}


                <TouchableOpacity 
                    style={{paddingTop: 20}}
                    onPress={()=>{
                        console.log('pressed');
                        nav.navigate('Detail', {name: 'name', location:{}, id:'123123123'});
                    }}>
                    <Text style={styles.text}>Go to Detail Screen</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: STYLE.color.background,
        marginHorizontal: STYLE.sizes.screenWidth * 0.05,
        marginVertical: STYLE.sizes.screenHeight * 0.05,
    },
    text: {
        color: STYLE.color.font
    },
    // TODO: move the following to a new component for slider wrap
    frame:{
        width: STYLE.sizes.screenWidth * 0.9,
        height: STYLE.sizes.screenWidth * 0.9,
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
