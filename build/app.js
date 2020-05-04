"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var hbs_1 = __importDefault(require("hbs"));
var geocode_1 = require("./utils/geocode");
var forecast_1 = require("./utils/forecast");
var app = express_1.default();
var PORT = process.env.PORT || 3000;
// Path for Express config
var publicDir = path_1.default.join(__dirname, '../public');
var viewsPath = path_1.default.join(__dirname, '../templates/views');
var partialsPath = path_1.default.join(__dirname, '../templates/partials');
// Setup Handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs_1.default.registerPartials(partialsPath);
// Configure routes
// Setup static directory to serve
app.use(express_1.default.static(publicDir));
var authorName = 'Emerald Laurente';
app.get('', function (req, res) {
    res.render('index', {
        authorName: authorName,
        title: 'Weather',
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        authorName: authorName,
        title: 'About Page',
    });
});
app.get('/help', function (req, res) {
    res.render('help', {
        authorName: authorName,
        title: 'Help Page',
        helpMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    });
});
app.get('/help/*', function (req, res) {
    res.render('not-found', {
        authorName: authorName,
        title: 'Help Page Not Found',
        message: 'Help Page not found',
    });
});
app.get('/weather', function (req, res) {
    var address = req.query.address;
    if (!address) {
        return res.send({
            error: "'address' query is required",
        });
    }
    geocode_1.geocode(address, function (err, _a) {
        var _b = _a === void 0 ? {} : _a, longtitude = _b.longtitude, latitude = _b.latitude, placeName = _b.placeName;
        console.log('Location: ', placeName);
        if (err) {
            console.log('Geocode Error: ', err);
            return res.send({
                error: 'Could not geocode address',
            });
        }
        forecast_1.forecast(longtitude, latitude, function (err, current) {
            if (err) {
                return res.send({
                    error: 'Could not get forecast data',
                });
            }
            res.send({
                authorName: authorName,
                placeName: placeName,
                address: address,
                title: 'Weather',
                forecast: current,
            });
        });
    });
});
app.get('*', function (req, res) {
    res.render('not-found', {
        authorName: authorName,
        title: 'Error: 404',
        message: 'That page does not exist!',
    });
});
// Start server
app.listen(PORT, function () {
    console.log('Server is up on port 3000...');
});
