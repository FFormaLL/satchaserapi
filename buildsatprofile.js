const ziptogrid = require('./ziptogrid.js')

async function hitWebsite(grid) {
    // Get Satellites overhead
    const response = await fetch(`https://sat.fg8oj.com/daily.php?e=0&ia=0&aa=360&l=${grid}&a=0&u=America%2FNew_York&start=0&it=8&at=22&o=JSON&satlist=FM`)
    const responseJson = await response.json()
    return responseJson.data
}

async function hitFreqWebsite() {
    // Get freq
    const response = await fetch('https://raw.githubusercontent.com/palewire/ham-satellite-database/main/data/amsat-active-frequencies.json')
    const freqJson = await response.json()
    return freqJson

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

// Takes data from URL and converts the array objects in data with tags
function parseResponse(profiles) {
    const records = []
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i]
        const arrivalDateTime = new Date(profile.arrivalDateTime * 1000)
        const suffix = arrivalDateTime.getHours() >= 12 ? 'PM' : 'AM'
        const hour12 = arrivalDateTime.getHours() % 12 || 12
        const formattedHour = hour12.toString().padStart(2, '0')
        const formattedMinute = arrivalDateTime.getMinutes().toString().padStart(2, '0')
        const arrivalTime = `${formattedHour}:${formattedMinute}${suffix}`
        const stringRecord = `${i + 1}): ${profile.name} ${arrivalTime} for ${profile.duration_min} minutes\nuplink: ${profile.uplink}\ndownlink: ${profile.downlink}\nmode: ${profile.mode}\ncallsign: ${profile.callsign}\n`
        records.push(stringRecord)
    }
    return records
}




async function run() {
    const gridResult = ziptogrid.run()
    const times = await hitWebsite(gridResult)
    const freqs = await hitFreqWebsite()
    const profiles = buildProfile(freqs, times)
    const parsedData = parseResponse(profiles)
    const joinParsedData = parsedData.join("\n")
    return joinParsedData
}

module.exports = { run }