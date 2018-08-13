const request = require('request');

var getWeather = () => {
    var url = `https://api.darksky.net/forecast/dbfe83c5fec8d123166b4c85b0c23ef2/13.0826,80.2707`;

    console.log("URL:", url);

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(body.currently.summary);
            console.log(body.currently.temperature);   
        } else {
            console.log('Unable to fetch weather from DarkSky servers.');
        }
    });
};

module.exports.getWeather = getWeather;

