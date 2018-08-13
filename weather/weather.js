const request = require('request');

const apiKey = 'dbfe83c5fec8d123166b4c85b0c23ef2';

var getWeather = (latitude, longitude, callback) => {
    var url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

    console.log("URL:", url);

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature
            }); 
        } else {
            callback('Unable to fetch weather from DarkSky servers.');
        }
    });
};

module.exports.getWeather = getWeather;

