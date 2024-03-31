translate zip to qra
save phone muber
do every hour
get user profile to fetch sats and send text
s

This is using 3 different APIs

This gets LIVE overhead Satellite information like name and arrival times
https://sat.fg8oj.com/daily.php?e=0&ia=0&aa=360&l=${grid}&a=0&u=America%2FNew_York&start=0&it=8&at=22&o=JSON&satlist=FM

This is a full database of all active HAM Satellites that we use to retrieve uplink and 
downlink freqs aswell as other info.
We compare this to the overhead Sats to retrieve data needed for text transmission
https://raw.githubusercontent.com/palewire/ham-satellite-database/main/data/amsat-active-frequencies.json

This is to convert Zipcode to GRID locator for location of overhead satellites
https://thezipcodes.com/api/v1/search?zipCode=${zipCode}&countryCode=US&apiKey=86d473d8f6115756cd879b49882817c5


