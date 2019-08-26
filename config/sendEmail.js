var config = require('../env/email');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(config);

module.exports = function (mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};
