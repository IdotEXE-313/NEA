//Credit to twilio documentation for providing a general structure for how to send a text. Found at https://www.twilio.com/docs/libraries/node

const accountSID = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const twilio = require("twilio")(accountSID, authToken);
require("dotenv").config();

exports.sendText = async(req, res) => {

    const message = req.body.message;

    const sendText = async() => {
        await twilio.messages.create({
            body: message,
            to: process.env.TARGETNUMBER,
            from: '+447361584520' //Twilio account phone number. 
        })
        .then(() => {
            res.send({isSent: true});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //checking if the message is blank or less than 20 or more than 160 characters
    if(typeof(message) != "undefined"){
        if(!(message.length < 20 || message.length > 160)){
            await sendText();
        }
    }
    else{
        res.send({isSent: false});
    }
}