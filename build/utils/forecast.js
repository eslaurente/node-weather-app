"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postman_request_1 = __importDefault(require("postman-request"));
exports.forecast = function (longtitude, latitude, callback) {
    var url = "http://api.weatherstack.com/current?access_key=127378fd81aa9c943c08e5a444745487&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longtitude) + "&units=f";
    postman_request_1.default({ url: url, json: true }, function (err, response) {
        if (err) {
            callback('Unable to get data from weather service!', undefined);
            return;
        }
        if (response.body.error) {
            callback('Unable to find location', undefined);
            return;
        }
        var data = response.body;
        var _a = data.current, temperature = _a.temperature, feelslike = _a.feelslike, weather_descriptions = _a.weather_descriptions;
        callback(undefined, weather_descriptions[0] + ". It is currently " + temperature + " \u00B0F out. It feels like " + feelslike + " \u00B0F degrees out.");
    });
};
