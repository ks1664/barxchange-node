const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vmmstudents2020@gmail.com',
        pass: 'Temp@123'
    }
});

let mailDetails = {
    from: 'vmmstudents2020@gmail.com',
    to: 'parwindersingh@vmmeducation@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing email'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});