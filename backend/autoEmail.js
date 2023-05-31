import emailjs from '@emailjs/browser';


function autoEmailSend(name, email, id) {
    emailjs.send(
        "service_b907f5g",
        "template_t09q3hr",
        {
            to_name: name, 
            to_email: email,
            verification_id: id,
        },
        "cp0LqwE6uy5u4xBGF"
    ).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
}
