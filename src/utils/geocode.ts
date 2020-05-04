import request from "postman-request";

export interface Result {
    longtitude: number
    latitude: number
    placeName: string
}

type Callback = (err: any, result: Result) => void

export const geocode = (address: string, callback: Callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXNsYXVyZW50ZSIsImEiOiJjazlvc294eWcwM2EzM29yMTkwN3B1M3U2In0.OnOQBU9MTuZ4esAaEkclsw&limit=1`;

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback('Unable to get data from geocoding service!', undefined!);
            return;
        }

        if (!response.body || response.body?.features?.length === 0) {
            callback('Unable to geocode address', undefined!);
            return;
        }

        const { features } = response.body;
        const [lon, lat] = features[0].geometry.coordinates;
        callback(undefined, {
            longtitude: lon,
            latitude: lat,
            placeName: features[0].place_name,
        });
    });
};
