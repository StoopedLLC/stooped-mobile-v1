/* 
this file contains all functions that interact with items
*/

import DjangoApiClient from "@api/djangoApiClient.js";
// const DjangoApiClient = require("./api/djangoApiClient");
import uploadImage from "@api/uploadImage";


const addToSavedItem = async (user, item) => {
    /*
        This function adds an item to the user's saved items.
        It also adds the user to the item's saved by list.

        @params:
            user: the user object
            item: the item object

        @return:
            true if the operation is successful, false otherwise
    */
    const url = `/saved-items/`;
    const data = {
        user_id: user.id,
        item_id: item.id
    }
    console.log('saved item', data)
    try{
        const res = await DjangoApiClient.post(url, data);
        if(res.status === 200 || res.status === 201){
            return true;
        }
        return false;
    }catch(error){
        console.log(error.response.data);
        return false;
    }
}

const removeFromSavedItem = async (user, item) => {
    /*
        This function removes an item from the user's saved items.
        It also removes the user from the item's saved by list.

        @params:
            user: the user object
            item: the item object

        @return:
            true if the operation is successful, false otherwise
    */
    const url = `/saved-items/${item.id}/?user_id=${user.id}`;
    const data = {
        user_id: user.id,
    }

    try{
        const res = await DjangoApiClient.delete(url, data);
        if(res.status === 200){
            return res.data.success;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

const getSavedItems = async (userId) => {
    /*
        This function gets the user's saved items.
        
        @params:
            user: the user id

        @return:
            a list of items that the user has saved
    */
    const url = `/saved-items/?user_id=${userId}`;
    try{
        const res = await DjangoApiClient.get(url);
        if(res.status === 200){
            return res.data.results;
        }
        return [];
    }catch(error){
        console.log('error loading saved items')
        console.log(error);
        return [];
    }
}




const getFeed = async (user, location, filter) => {
    /*
        This function refreshes the feed of the user.
        It gets the items that are within the user's location and

        @params:
            user: the user object
            location: the location object, including
                location.latitude: the latitude of the user
                location.longitude: the longitude of the user
            filter: the filter object, including
                filter.radius: the radius of the search in meters


        @return:
            a list of items that are within the user's location
    */
                
    const url = `/feed/`;

    try{
        // console.log('attempt to get feed with filter', filter)
        const res = await DjangoApiClient.post(url, {
            user_id: user.id,
            latitude: location.latitude,
            longitude: location.longitude,
            ...filter
        });
        if(res.status === 200){
            return res.data.results; //FIXME: enable google billing
        }
        
    }catch(error){
        console.log(error);
        return false;
    }
}

const uploadItem = async (userId, name, location, deviceUrl) => {
    /*
        This function uploads an item to the backend.

        @params:
            userId: the id of the user
            name: the name of the item
            location: the location object, including
                location.latitude: the latitude of the user
                location.longitude: the longitude of the user
            deviceUrl: the url of the image on the user's device
        
        @return:
            true if the operation is successful, false otherwise
    */
    try{
        // upload the image to AWS S3
        const imageUrl = await uploadImage(deviceUrl, 'ITEM');
        if(!imageUrl){
            return false;
        }
        
        // create the item object
        // 222b6705-3734-4779-a925-1be95c9ec1ad
        const item = {
            name: name,
            location: location,
            image_links: [
                {
                    image_url: imageUrl,
                    is_primary: true
                }
            ],
            owner_id: userId,
            is_available: true,

            //XXX: these should not be included, change API to accomeodate
            condition: 0.5,
            description: "Uploaded from mobile client",
            type: "Miscellaneous",
            is_anonymous: true,

        }
        // send the item object to the backend
        const url = `/items/`;
        const res = await DjangoApiClient.post(url, item);
        if(res.status === 201 || res.status === 200){
            if(res.data.success){
                return res.data.item;
            }
        }else{
            return {}
        }
        return false;
    }catch(error){
        if(error.response){
            console.log(error.response.data);
        }else{
            console.log(error);
        }
        return {};
    }

}


// module.exports = {
//     addToSavedItem,
//     removeFromSavedItem,
//     getFeed
// }

const pickupItem = async (userId, itemId) => {
    /*
        This function allows user to pick up an item.
        it links up with the /api/picked-up endpoint

        @params:
            userId: the id of the user
            itemId: the id of the item
        
        @return:
            true if the operation is successful, false otherwise
    */
    try{
        const url = `/picked-up/`;
        const data = {
            user_id: userId,
            item_id: itemId
        }
        const res = await DjangoApiClient.patch(url, data);
        if(res.status === 201 || res.status === 200){
            return true;
        }
        return false;
    }catch(error){
        if(error.response){
            console.log(error.response.data);
        }else{
            console.log(error);
        }
        return false;
    }
}

const reportMissingItem = async (itemId) => {
    /*
        This function allows user to report an item as missing.

        @params:
            itemId: the id of the item

        @return:
            true if the operation is successful, false otherwise

    */
    try{
        const url = `/is-missing`;
        const data = {
            item_id: itemId
        }
        const res = await DjangoApiClient.patch(url, data);
        if(res.status === 201 || res.status === 200){
            return true;
        }
        return false;
    }catch(error){
        if(error.response){
            console.log(error.response.data);
        }else{
            console.log(error);
        }
        return false;
    }
}

export {
    addToSavedItem,
    removeFromSavedItem,
    getFeed,
    uploadItem,
    pickupItem,
    reportMissingItem,
    getSavedItems
}