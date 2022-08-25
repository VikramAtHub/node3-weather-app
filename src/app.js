const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engie and views configuration
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aditya vikram singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aditya vikram singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'this is a demo help message this is a demo help message this is a demo help message this is a demo help message this is a demo help message ',
        name: 'Aditya vikram singh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.add) {
        return res.send({
            error: "No address provided!"
        })
    }
    geocode(req.query.add, (error, {lattitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.add,
            });

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-error', {
        title: '404',
        name: 'Aditya vikram singh',
        message: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404-error', {
        title: '404',
        name: 'Aditya vikram singh',
        message: 'My 404 text'
    });
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});