import request from "postman-request";

interface Forecast {
    temperature: number
    condition: string
    feelsLike: number
    windSpeed: number
    weatherIcon: string
}

type Callback = (err: any, forecast: Forecast) => void

export const forecast = (longtitude: number, latitude: number, callback: Callback) => {
    const url = `http://api.weatherstack.com/current?access_key=127378fd81aa9c943c08e5a444745487&query=${encodeURIComponent(latitude)},${encodeURIComponent(longtitude)}&units=f`;

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback('Unable to get data from weather service!', undefined!);
            return;
        }

        if (response.body.error) {
            callback('Unable to find location', undefined!);
            return;
        }

        const data = response.body;
        const { temperature, feelslike, weather_descriptions, wind_speed, weather_icons } = data.current;
        callback(undefined, {
            temperature,
            feelsLike: feelslike,
            weatherIcon: weather_icons[0],
            windSpeed: wind_speed,
            condition: weather_descriptions[0],

        });
    });
};
