import request from "postman-request";

type Callback = (err: any, current: string) => void

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
        const { temperature, feelslike, weather_descriptions } = data.current;
        callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} °F out. It feels like ${feelslike} °F degrees out.`);
    });
};
