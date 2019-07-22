const config = require('../config/email');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config);

module.exports = function (mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};
