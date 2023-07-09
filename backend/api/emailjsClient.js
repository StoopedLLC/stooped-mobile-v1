import axios from 'axios';
import {SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY} from '@env';


const client = axios.create({
    baseURL: 'https://api.emailjs.com/api/v1.0/email/send',
    headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost',
    }
});

export const sendEmail = async (name, email, id) => {

    try{
        const response = await client.post(
            '',
            {
                service_id: 'service_b907f5g',
                template_id: 'template_t09q3hr',
                user_id: PUBLIC_KEY,
                template_params: {
                    to_name: name, 
                    to_email: email,
                    verification_id: id,
                },
            }
        );
        console.log(response.data)
        return true
    }catch(error){
        console.log('email failed with following error')
        console.log(error.response.data)
        return false
    }
}