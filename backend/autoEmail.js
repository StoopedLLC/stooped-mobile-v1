import emailjs from '@emailjs/browser';
import {SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY} from '@env';


function autoEmailSend(name, email, id) {
    console.log(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY)
    emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
            to_name: name, 
            to_email: email,
            verification_id: id,
        },
        PUBLIC_KEY
    ).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        return true
     }, function(error) {
        console.log('FAILED...', error);
        return false
     });
}

export {
    autoEmailSend
}
