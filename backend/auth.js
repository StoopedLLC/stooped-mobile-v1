/*
This file contains all methods related to login
*/
import DjangoApiClient from "@api/djangoApiClient"
import autoEmailSend from '@backend/autoEmail'



const authenticateUser = async (username, password) => {
    /* 
    this method attempts to authenticate an user, 
    if successful, it returns true, or else it returns false

    @params:
        username: the username OR email of the user,
        password: the password entered by the user,

    @returns:
        whether login is successful or not
    */

    const url = `URL GOES HERE`
    try{
        let res = await DjangoApiClient.post(url, {
            username,
            password
        })
        if(res.status!==200 || res.status!==201){
            res = await DjangoApiClient.post(url, {
                email: username,
                password
            })
        }
        return res.status===200 || res.status===201
    }catch(err){
        console.log(error);
        return false
    }
    
}

const completeSignUp = (code, newUserData)=>{

}

const sendVerificationEmail = async (email, name) => {
    /*
    this method collects user email and send them a verifation code
    It will first go through the app backend to generate a code, then use SMTP to send that code to user

    @params:
        email: user email
        name: name of the user
    
    */

    const url = '/verification'
    try{
        const res = await DjangoApiClient.post(url, {
            email
        })
        const code = res.data.code
        autoEmailSend(email, name, code)
    }catch(err){
        console.log(err)
    }
}


export {
    authenticateUser,
    completeSignUp,
    sendVerificationEmail,
}