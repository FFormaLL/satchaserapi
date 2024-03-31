
async function getZipData(zipCode) {
    const response = await fetch(`https://thezipcodes.com/api/v1/search?zipCode=${zipCode}&countryCode=US&apiKey=86d473d8f6115756cd879b49882817c5`)
    const responseJson = await response.json()
    return responseJson
}


async function run() {
    const zipCode = "02721"
    const zipData = await getZipData(zipCode)
    // console.log(zipData)

    // HamGridSquare.js
    // Copyright 2014 Paul Brewer KI6CQ
    // License:  MIT License http://opensource.org/licenses/MIT or CC-BY-SA
    //
    // Javascript routines to convert from lat-lon to Maidenhead Grid Squares
    // typically used in Ham Radio Satellite operations and VHF Contests
    //
    // Inspired in part by K6WRU Walter Underwood's python answer
    // http://ham.stackexchange.com/a/244
    // to this stack overflow question:
    // How Can One Convert From Lat/Long to Grid Square
    // http://ham.stackexchange.com/questions/221/how-can-one-convert-from-lat-long-to-grid-square
    //

    latLonToGridSquare = function (param1, param2) {
        var lat = -100.0;
        var lon = 0.0;
        var adjLat, adjLon, GLat, GLon, nLat, nLon, gLat, gLon, rLat, rLon;
        var U = 'ABCDEFGHIJKLMNOPQRSTUVWX'
        var L = U.toLowerCase();
        // support Chris Veness 2002-2012 LatLon library and
        // other objects with lat/lon properties
        // properties could be getter functions, numbers, or strings
        function toNum(x) {
            if (typeof (x) === 'number') return x;
            if (typeof (x) === 'string') return parseFloat(x);
            if (typeof (x) === 'function') return parseFloat(x());
            throw "HamGridSquare -- toNum -- can not convert input: " + x;
        }
        if (typeof (param1) === 'object') {
            if (param1.length === 2) {
                lat = toNum(param1[0]);
                lon = toNum(param1[1]);
            } else if (('lat' in param1) && ('lon' in param1)) {
                lat = toNum(param1.lat);
                lon = toNum(param1.lon);
            } else if (('latitude' in param1) && ('longitude' in param1)) {
                lat = toNum(param1.latitude);
                lon = toNum(param1.longitude);
            } else {
                throw "HamGridSquare -- can not convert object -- " + param1;
            }
        } else {
            lat = toNum(param1);
            lon = toNum(param2);
        }
        if (isNaN(lat)) throw "lat is NaN";
        if (isNaN(lon)) throw "lon is NaN";
        if (Math.abs(lat) === 90.0) throw "grid squares invalid at N/S poles";
        if (Math.abs(lat) > 90) throw "invalid latitude: " + lat;
        if (Math.abs(lon) > 180) throw "invalid longitude: " + lon;
        adjLat = lat + 90;
        adjLon = lon + 180;
        GLat = U[Math.trunc(adjLat / 10)];
        GLon = U[Math.trunc(adjLon / 20)];
        nLat = '' + Math.trunc(adjLat % 10);
        nLon = '' + Math.trunc((adjLon / 2) % 10);
        rLat = (adjLat - Math.trunc(adjLat)) * 60;
        rLon = (adjLon - 2 * Math.trunc(adjLon / 2)) * 60;
        gLat = L[Math.trunc(rLat / 2.5)];
        gLon = L[Math.trunc(rLon / 5)];
        return GLon + GLat + nLon + nLat + gLon + gLat;
    }

    return latLonToGridSquare(zipData.location[0].latitude, zipData.location[0].longitude)
}

module.exports = {run}