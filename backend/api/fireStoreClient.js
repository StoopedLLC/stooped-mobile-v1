import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// promote this to a config file, put that config file in .env
const firebaseConfig = {
    apiKey: "AIzaSyD96BBxkay1u6JPRum4zmRmm4gLuf-GUA0",
    authDomain: "stooped-beta-db.firebaseapp.com",
    databaseURL: "https://stooped-beta-db-default-rtdb.firebaseio.com",
    projectId: "stooped-beta-db",
    storageBucket: "stooped-beta-db.appspot.com",
    messagingSenderId: "823118132554",
    appId: "1:823118132554:web:f2dfc640e2288badab7db3",
    measurementId: "G-YJ28XWT6SX"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);