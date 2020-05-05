import path from 'path';
import express from 'express';
import hbs from 'hbs';
import { geocode, Result } from './utils/geocode';
import { forecast } from './utils/forecast';

const app = express();
const PORT = process.env.PORT || 3000;

// Path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Configure routes
// Setup static directory to serve
app.use(express.static(publicDir));

const authorName = 'Emerald Laurente';

app.get('', (req, res) => {
    res.render('index', {
        authorName,
        title: 'Weather',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        authorName,
        title: 'About Page',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        authorName,
        title: 'Help Page',
    });
});

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        authorName,
        title: 'Help Page Not Found',
        message: 'Help Page not found',
    });
});


app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: `'address' query is required`,
        });
    }

    geocode(address as string, (err, { longtitude, latitude, placeName } = {} as Result) => {
        console.log('Location: ', placeName);
        if (err) {
            console.log('Geocode Error: ', err);
            return res.send({
                error: 'Could not geocode address',
            });
        }

        forecast(longtitude, latitude, (err, forecast) => {
            if (err) {
                return res.send({
                    error: 'Could not get forecast data',
                });
            }

            res.send({
                authorName,
                placeName,
                address,
                forecast,
                title: 'Weather',
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('not-found', {
        authorName,
        title: 'Error: 404',
        message: 'That page does not exist!',
    });
});


// Start server
app.listen(PORT, () => {
    console.log('Server is up on port 3000...');
});
