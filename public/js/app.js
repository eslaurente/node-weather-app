const getWeather = location => fetch(`/weather?address=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            const { placeName, forecast} = data;
            return {
                placeName,
                forecast,
            };
        }
        return Promise.reject(new Error(data.error));
    });

const hideElement = el => el.setAttribute('style', 'display: none;');

const showElement = el => el.setAttribute('style', 'display: block;');

document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('.location-input');
    const weatherInfo = document.querySelector('#weather-info');
    hideElement(weatherInfo);

    weatherForm.addEventListener('submit', e => {
        e.preventDefault();
        hideElement(weatherInfo);
        const { value } = document.querySelector('.location-input input');
        const statusEl = document.querySelector('#status');
        const locationEl = document.querySelector('#location');
        const weatherIconEl = document.querySelector('#weather-icon');
        const conditionEl = document.querySelector('#condition');
        const temperatureEl = document.querySelector('#temperature');
        const feelsLikeEl = document.querySelector('#feels-like');
        const windSpeedEl = document.querySelector('#wind-speed');


        statusEl.textContent = 'Loading...';
        getWeather(value)
            .then(({ placeName, forecast }) => {
                hideElement(statusEl);
                showElement(weatherInfo);
                locationEl.textContent = placeName;
                weatherIconEl.setAttribute('src', forecast.weatherIcon);
                conditionEl.textContent = forecast.condition;
                temperatureEl.textContent = `${forecast.temperature} °F`;
                feelsLikeEl.textContent = `${forecast.feelsLike} °F`;
                windSpeedEl.textContent = `${forecast.windSpeed} mph`;
            })
            .catch(error => {
                statusEl.textContent = error;
                hideElement(weatherInfo);
            });
    });
});
