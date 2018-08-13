const request = require('request');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

        console.log("URL:", url);

        request({
            url: url,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OVER_QUERY_LIMIT') {
                reject('Sorry, your query limit exceeded.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }   
        });
    });
};

geocodeAddress('13905').then((location) => {
    console.log(JSON.stringify(location, null, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});