
This is using 3 different APIs

This gets LIVE overhead Satellite information like name and arrival times
https://sat.fg8oj.com/daily.php?e=0&ia=0&aa=360&l=${grid}&a=0&u=America%2FNew_York&start=0&it=8&at=22&o=JSON&satlist=FM

This is a full database of all active HAM Satellites that we use to retrieve uplink and 
downlink freqs aswell as other info.
We compare this to the overhead Sats to retrieve data needed for text transmission
https://raw.githubusercontent.com/palewire/ham-satellite-database/main/data/amsat-active-frequencies.json

This is to convert Zipcode to GRID locator for location of overhead satellites
https://thezipcodes.com/api/v1/search?zipCode=${zipCode}&countryCode=US&apiKey=86d473d8f6115756cd879b49882817c5


Get up and working

Clean up ugly code 

add function to text twilio to send sats

storage.js with functions that you pass params to save data
let storage figure out where to store

contracts sending and receiving concept
api route has contract 
contract of user is these props
success saving is thisfailed sto save is this

streamline code with functions

INPUT VALIDATION
user inputted data needs to made sure its whats expected
