/*
This file contains all methods related to login
*/
import DjangoApiClient from "@api/djangoApiClient"
import {autoEmailSend} from '@backend/autoEmail'
import {sendEmail} from '@api/emailjsClient'



const authenticateUser = async (username, password) => {
    /* 
    this method attempts to authenticate an user, 
    if successful, it returns true, or else it returns false

    @params:
        username: the username OR email of the user,
        password: the password entered by the user,

    @returns:
        json object representing the result of authentication call
    */

    const url = `/login/`
    try{
        let res = await DjangoApiClient.patch(url, {
            "username_or_email": username,
            password
        })
        if(res.status!==200 || res.status!==201){
            res = await DjangoApiClient.patch(url, {
                "username_or_email": username,
                password
            })
        }

        if(res.status===200 || res.status===201){
            return res.data // FIXME: it should also return token along with data
        }else{
            return ''
        }
    }catch(err){
        if(err.response){
            if(err.response.status===400){
                return err.response.data
            }else{
                return err.response.data
            }
        }
        console.log(err);
        return ''
    }
    
}

const completeSignUp = async (code, newUserData)=>{
    /*
    this method attempts to complete the sign up process
    if successful, it returns true, or else it returns false

    @params:
        code: the verification code sent to the user
        newUserData: the data of the user that is being created

    @returns:
        whether sign up is successful or not
    */
        const url = '/verify/'
        try{
            const res = await DjangoApiClient.post(url, {
                username: newUserData.username,
                email: newUserData.email,
                password: newUserData.password,
                first_name: newUserData.firstName,
                last_name: newUserData.lastName,
                code: code
            })
            if(res.status===201 && res.data.success === true){
                return 201 // FIXME: should probably return the token
            }
            return false
        }catch(err){
            if(err.response){
                return err.response.status
            }else{
                return 500
            }
        }
    
}

const sendVerificationEmail = async (email, name) => {
    /*
    this method collects user email and send them a verifation code
    It will first go through the app backend to generate a code, then use SMTP to send that code to user

    @params:
        email: user email
        name: name of the user
    
    @returns:
        whether the email is sent successfully or not ('success' or 'email-exists')
    */

    const url = '/verification/'
    console.log('sending verification email')
    try{
        const res = await DjangoApiClient.post(url, {
            email
        })
        const codeReceived = res.data.code
        // console.log('code', codeReceived)
        const emailSent = await sendEmail(name, email, codeReceived)
        if(emailSent){
            return 'success'
        }else{
            return 'fail to send email'
        }
    }catch(err){
        console.log(err)
        console.log(err.response.data)
        if(err.response){
            return err.response.data.error
        }
    }
}

const resetPassword = async (username, newPassword) => {
    /*
    this method allows user to reset a password

    @params:
        username: username of the user
        newPassword: the new password that the user wants to set

    @returns:
        whether the password is reset successfully or not
    */

    try{
        const url = '/reset-password/'
        const res = await DjangoApiClient.post(url, {
            username,
            password: newPassword
        })
        if(res.status===200){
            return true
        }else{
            return false
        }
    }catch(err){
        return false
    }
}




export {
    authenticateUser,
    completeSignUp,
    sendVerificationEmail,
    resetPassword
}