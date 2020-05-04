"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postman_request_1 = __importDefault(require("postman-request"));
exports.geocode = function (address, callback) {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZXNsYXVyZW50ZSIsImEiOiJjazlvc294eWcwM2EzM29yMTkwN3B1M3U2In0.OnOQBU9MTuZ4esAaEkclsw&limit=1";
    postman_request_1.default({ url: url, json: true }, function (err, response) {
        var _a, _b;
        if (err) {
            callback('Unable to get data from geocoding service!', undefined);
            return;
        }
        if (!response.body || ((_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            callback('Unable to geocode address', undefined);
            return;
        }
        var features = response.body.features;
        var _c = features[0].geometry.coordinates, lon = _c[0], lat = _c[1];
        callback(undefined, {
            longtitude: lon,
            latitude: lat,
            placeName: features[0].place_name,
        });
    });
};
