const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

console.log("URL:", url);

request({
    url: url,
    json: true
}, (error, response, body) => {
    // console.log(JSON.stringify(body, null, 2));

    if (error) {
        console.log('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address.')
    } else if (body.status === 'OVER_QUERY_LIMIT') {
        console.log('Sorry, your query limit exceeded.')
    } else if (body.status === 'OK') {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }   
});