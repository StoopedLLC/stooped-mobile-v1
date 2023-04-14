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
    const url = `/saved-items`;
    const data = {
        user_id: user.id,
        item_id: item.id
    }

    try{
        const res = await DjangoApiClient.post(url, data);
        if(res.status === 200){
            return true;
        }
        return false;
    }catch(error){
        console.log(error);
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
    const url = `/saved-items/${item.id}`;
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


const getFeed = async (user, location) => {
    /*
        This function refreshes the feed of the user.
        It gets the items that are within the user's location and

        @params:
            user: the user object
            location: the location object, including
                location.latitude: the latitude of the user
                location.longitude: the longitude of the user

        @return:
            a list of items that are within the user's location
    */
                
    const url = `/items`;

    try{
        const res = await DjangoApiClient.get(url, {});
        if(res.status === 200){
            return res.data.results;
        }
        
    }catch(error){
        console.log(error);
        return null;
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
        const item = {
            name: name,
            location: location,
            image: imageUrl,
            owner: userId,
        }
        // send the item object to the backend
        const url = `/items`;
        const res = await DjangoApiClient.post(url, item);
        if(res.status === 201 || res.status === 200){
            return true;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }

}


// module.exports = {
//     addToSavedItem,
//     removeFromSavedItem,
//     getFeed
// }

export {
    addToSavedItem,
    removeFromSavedItem,
    getFeed
}