const { ListItem } = require('twilio/lib/rest/content/v1/content');
const { BucketInstance } = require('twilio/lib/rest/verify/v2/service/rateLimit/bucket');

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_NUMBER
require("dotenv").config()

async function hitWebsite() {
    // Hit website
    const response = await fetch('https://sat.fg8oj.com/daily.php?e=0&ia=0&aa=360&l=FN42IP&a=0&u=America%2FNew_York&start=0&it=8&at=22&o=JSON&satlist=FM')
    const responseJson = await response.json()
    return responseJson.data

    // const {data} = await response.json()
    // return data
}

async function hitFreqWebsite() {
    // Get freq
    const response = await fetch('https://raw.githubusercontent.com/palewire/ham-satellite-database/main/data/amsat-active-frequencies.json')
    const freqJson = await response.json()
    return freqJson

    // const {data} = await response.json()
    // return data
}


function buildProfile(satFreqs, satTimes, totalRecords = 3) {
    const satProfiles = []
    for (let i = 0; i < totalRecords; i++) {
        for (let j = 0; j < satFreqs.length; j++) {
            if (satTimes[i].sat.toLowerCase() === satFreqs[j].name.toLowerCase()) {

                const satProfile = {
                    name: satTimes[i].sat,
                    uplink: satFreqs[j].uplink,
                    downlink: satFreqs[j].downlink,
                    arrivalDateTime: satTimes[i].aos_time,
                    departureDateTime: satTimes[i].los_time,
                    mode: satFreqs[j].mode,
                    callsign: satFreqs[j].callsign,
                    duration_min: satTimes[i].duration_min

                }
                satProfiles.push(satProfile)
            }

        }

    }
    return satProfiles
}



// Takes data from URL and conerts the array objects in data with tags
function parseResponse(profiles) {
    const records = []
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i]
        const arrivalDateTime = new Date(profile.arrivalDateTime * 1000)
        const arrivalTime = `${arrivalDateTime.getHours()}:${arrivalDateTime.getMinutes()}`
        const stringRecord = `${i + 1}): ${profile.name} ${arrivalTime} for ${profile.duration_min} minutes\nuplink: ${profile.uplink}\ndownlink: ${profile.downlink}\nmode: ${profile.mode}\ncallsign: ${profile.callsign}\n`

        records.push(stringRecord)
    }
    return records
}




async function run() {
    const numbers = ["+11234567890"]

    const times = await hitWebsite()
    const freqs = await hitFreqWebsite()
    const profiles = buildProfile(freqs, times)
    const parsedData = parseResponse(profiles)

    const smsString = `Hey! Satellites overhead!\n\n${parsedData.join("\n")}`
    console.log(smsString)



    numbers.forEach(number => {
        client.messages
            .create({
                body: smsString,
                from: twilioNumber,
                to: number
            })
            .then(message => console.log(`Message sent to ${number}: ${message.sid}`))
            .catch(err => console.error(`Error sending message to ${number}: ${err}`))
    });



}
run()