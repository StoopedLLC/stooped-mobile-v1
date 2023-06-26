// import {getDownloadURL, uploadBytes, ref} from 'firebase/storage';
// import {storage} from './fireStoreClient';
import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import client from './s3Client';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";


/*
    Uploads a file to AWS s3 storage
    NOTE: Please set the image quality to 0 before uploading the image to firebase storage. 
        It is a known bug that >0.2 qauality images will crash the app upon upload.
    NOTE: The image upload will usually take a while. Since it is async, other operations can be performed while waiting for the upload to finish.

    @param imageUrl: the url of the file to be uploaded, usually from the user's device
    @param purpose: the purpose of the file, can be 'OTHER', 'PROFILE', 'ITEM'
    @return: the url of the uploaded file on the web
*/
const DIRECTORY_MAP = { 
    'OTHER': '',
    'PROFILE': 'profile/',
    'ITEM': 'item-images/',
}
const BUCKET_NAME = 'stooped-beta-storage'
const uploadImage = async (imageUrl, purpose = 'OTHER') => {
    // extract the file name from the url
    const imageName = imageUrl.split('/').pop();

    try{
        // get the file in blob format from the url
        const response = await fetch(imageUrl);
        const blob = await response.blob();


        // create new AWS S3 upload command
        const uploadCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: DIRECTORY_MAP[purpose] + imageName,
            Body: blob,
            ContentType: blob.type,
            ContentLength: blob.size,
        });

        // send the upload command to AWS S3
        const uploadResponse = await client.send(uploadCommand);
        console.log('uploadResponse',uploadResponse)

        // generate the url of the uploaded file
        const region = await client.config.region();
        const url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${DIRECTORY_MAP[purpose]+imageName}`;
        console.log('url',url);
        return url;
    }catch(error){
        console.log(error);
    }

}

export default uploadImage;