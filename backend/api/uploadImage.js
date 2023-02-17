import {getDownloadURL, uploadBytes, ref} from 'firebase/storage';
import {storage} from './fireStoreClient';


/*
    Uploads a file to firebase storage
    NOTE: Please set the image quality to 0 before uploading the image to firebase storage. 
        It is a known bug that >0.2 qauality images will crash the app upon upload.

    @param imageUrl: the url of the file to be uploaded, usually from the user's device
    @return: the url of the uploaded file on the web
*/
const uploadImage = async (imageUrl) => {
    // extract the file name from the url
    const imageName = imageUrl.split('/').pop();

    try{
        // get the file in blob format from the url
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        console.log(blob)
    
        // upload the file to firebase storage
        const storageRef = ref(storage, 'images/' + imageName)
        const snapshot = await uploadBytes(storageRef, response.blob());
        return await getDownloadURL(snapshot.ref);
    }catch(error){
        console.log(error);
    }

}

export default uploadImage;