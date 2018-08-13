const yargs = require('yargs');
const axios = require('axios');

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

const apiKey = 'dbfe83c5fec8d123166b4c85b0c23ef2';
var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        } else if (response.data.status === 'OVER_QUERY_LIMIT') {
            throw new Error('Sorry, your query limit exceeded.');
        }

        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

        console.log(response.data.results[0].formatted_address);

        return axios.get(weatherUrl);
    })
    .then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);

    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    });