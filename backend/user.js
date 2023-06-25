/*
This file contains all functions pertaining to the user.
It should contain a set of functions that retrieves user's past posts, thank you letters, items, etc.
as well as functions that updates user's information, such as their profile picture, etc.
*/

import DjangoApiClient from "@api/djangoApiClient"


const getUserData = async (userId) => {
    /*
    this method attempts to retrieve the user's data

    @params:
        userId: the id of the user
        
    @returns:
        an object containing the user's data
    */
    const url = '/users/' + userId + '/'
    try{
        const response = await DjangoApiClient.get(url)
        return response.data
    }catch(error){
        console.log(error)
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

export {
    getPastUserPosts,
    getPastUserThankYouLetters,
    getPastUserPickups,
    getUserData
}