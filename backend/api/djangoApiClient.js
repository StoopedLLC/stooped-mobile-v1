/*
    * This file is used to make API calls to the Django backend.
    * It uses the axios library to make the calls.
    
    variables:
        client: the axios client object
        DjangoApiClient: the object that will be exported (exported)
*/


import axios from 'axios';
import {DJANGO_API_TOKEN} from "@env";

// const axios = require('axios');


const client = axios.create({
    // baseURL: 'http://stooped-beta-3-382121.uk.r.appspot.com/api',
    baseURL: "http://django-api-env.eba-fys6emgc.us-east-1.elasticbeanstalk.com/api/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${DJANGO_API_TOKEN}`
    }
});



const DjangoApiClient = {
    /*
        * functions in this object makes a HTTP request to the Django backend.
        * each function is named after the HTTP method it uses. (e.g. get, post, put, patch)
        
        @params:
            url: the url to make the request to
            params: the parameters to send with the request
        
        @return:
            a promise, which resolves to the response from the server
    */
    get: (url, params) => {
        return client.get(url, {params});
    },
    post: (url, data) => {
        return client.post(url, data);
    },
    put: (url, data) => {
        return client.put(url, data);
    },
    patch: (url, data) => {
        return client.patch(url, data);
    },
    delete: (url) => {
        return client.delete(url);
    }
}

export default DjangoApiClient;
// module.exports = DjangoApiClient;