/*
This file contains all functions pertaining to the user.
It should contain a set of functions that retrieves user's past posts, thank you letters, items, etc.
as well as functions that updates user's information, such as their profile picture, etc.
*/

import DjangoApiClient from "@api/djangoApiClient"
import AsyncStorage from "@react-native-async-storage/async-storage"


const getUserData = async (userId) => {
    /*
    this method attempts to retrieve the user's data

    @params:
        userId: the id of the user

    @returns:
        the user's data
    */

    try{
        const url = `/users/${userId}/`
        const res = await DjangoApiClient.get(url)
        console.log('user data', res.data)
        return res.data
    }catch(error){
        console.log(error.response.data)
        return null
    }
}


const getPastUserPosts = async (userId) => {
    /*
    this method attempts to retrieve the user's past posts

    @params:
        userId: the id of the user

    @returns:
        an array of the user's past posts
    */
    const data = await fetchPastRecords(userId, 'uploads')
    return data
}

const getPastUserThankYouLetters = async (userId) => {
    /*
    this method attempts to retrieve the user's past thank you letters

    @params:
        userId: the id of the user

    @returns:
        an array of the user's past thank you letters
    */
}

const getPastUserPickups = async (userId) => {
    /*
    this method attempts to retrieve the user's past pickups

    @params:
        userId: the id of the user

    @returns:
        an array of the user's past pickups
    */
    const data = await fetchPastRecords(userId, 'picked_up')
    return data
}

const fetchPastRecords = async (userId, type) => {
    /*
    this method attempts to retrieve the user's past records

    @params:
        userId: the id of the user
        type: the type of records to retrieve, can be one of the following:
            - picked_up
            - uploads
            
    @returns:
        an array of the user's past records
    */

    const url = '/past-records/'
    const params = {
        user_id: userId,
        record_type: type
    }
    try{
        const response = await DjangoApiClient.get(url, params)

        let records = response.data.results; // Assuming the response data is in a property called 'data'
        let nextPage = response.data.next; // Assuming the pagination information is in a property called 'nextPage'

        while (nextPage) {
            const nextPageResponse = await DjangoApiClient.get(nextPage); // Fetch the next page
            records.extends(nextPageResponse.data.results) // Concatenate the new data with the existing data
            nextPage = nextPageResponse.data.next; // Update the 'nextPage' variable
        }
        return records
    }catch(error){
        if(error.response){
            console.log(error.response)
            return []
        }else{
            console.log(error)
            return []
        }
    }

}

const getUserId = async () => {
    /*
    this method attempts to retrieve the user's id from the local storage

    @params:
        none

    @returns:
        the user's id, or empty string if the user is not logged in
    */
    try {
        let user = await AsyncStorage.getItem('user');
        user = user.replace(/['"]+/g, '')
        if (user !== null) {
            return user
        }
        return ''
    } catch (e) {
        console.log('error while getting user: ', e)
        return ''
    }
}

const updateUserProfile = async (userId, data) => {
    /*
    this method attempts to update the user's profile

    @params:
        userId: the id of the user
        data: the data to update the user's profile with

    @returns:
        the updated user's data
    */
    
    // FIXME: is there a way to update username as well?
}


export {
    getPastUserPosts,
    getPastUserThankYouLetters,
    getPastUserPickups,
    getUserData,
    getUserId
}