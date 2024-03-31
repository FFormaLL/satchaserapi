const buildsatprofile = require('./buildsatprofile.js')
require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_NUMBER



async function run() {
    const parsedData = await buildsatprofile.run()
    const smsString = `Hey! Satellites overhead!\n\n${parsedData}`
    console.log(smsString)

    const number = ""

    client.messages
        .create({
            body: smsString,
            from: twilioNumber,
            to: number
        })
        .then(message => console.log(`Message sent to ${number}: ${message.sid}`))
        .catch(err => console.error(`Error sending message to ${number}: ${err}`))


}
run()