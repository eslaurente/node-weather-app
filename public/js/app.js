const getWeather = location => fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
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

document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('.location-input');
    weatherForm.addEventListener('submit', e => {
        e.preventDefault();

        const { value } = document.querySelector('.location-input input');
        const message1 = document.querySelector('#message-1');
        const message2 = document.querySelector('#message-2');

        message1.textContent = 'Loading...';
        message2.textContent = null;
        getWeather(value)
            .then(({ placeName, forecast }) => {
                message1.textContent = placeName;
                message2.textContent = forecast;
            })
            .catch(error => {
                message1.textContent = error;
                message2.textContent = null;
            });
    });
});
