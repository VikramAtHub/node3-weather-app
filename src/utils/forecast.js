const request = require('request');

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=793d7a31b1cebe23ac9dccb7e40030a2&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon);
    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find the location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' :- the current temperature is => ' + body.current.temperature + ', outside it feels like => ' + body.current.feelslike + ', chances of precipitation => ' + body.current.precip + ', humidity => ' + body.current.humidity + '%');
        }
    })
}

module.exports = forecast