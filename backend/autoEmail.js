import emailjs from '@emailjs/browser';
import {SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY} from '@env';


function autoEmailSend(name, email, id) {
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
     }, function(error) {
        console.log('FAILED...', error);
     });
}
