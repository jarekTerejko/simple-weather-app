"use strict";

const weatherCity = document.querySelector('#city');
const weatherForm = document.querySelector('#search');
const weatherInfoContainer = document.createElement('div');
weatherInfoContainer.classList.add('weather');

const displayWeather = (e) => {

    e.preventDefault();

    let weatherOutput = '';
    console.log(weatherCity.value);
    const cityName = weatherCity.value;
    const apiKey = 'd719249cdf9188c2b4935c8196104c58';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(res => {

            console.log(res);

            weatherOutput =
                `<h2>Currently in city: <span class="searched-city">${res.name}</span> <span class="country">${res.sys.country}</span>
                </h2>
                <ul>
                    <li><strong>Weather: </strong>${res.weather[0].description}</li>
                    <li><strong>Temperature: </strong>${res.main.temp + ' &#8451;'}</li>
                    <li><strong>Pressure: </strong>${res.main.pressure + ' hPa'}</li>
                    <li><strong>Humidity: </strong>${res.main.humidity + ' %'}</li>
                    <li><strong>Visibility: </strong>${res.visibility + ' m'}</li>
                    <li><strong>Wind: </strong>${res.wind.speed + ' m/s'}</li>
                </ul>`;

            weatherInfoContainer.innerHTML = weatherOutput;
            document.querySelector('.container').appendChild(weatherInfoContainer);

        })
        .catch(err => {

            console.log(err);

            weatherInfoContainer.innerHTML = `<p class="alert">City not found :(</p>`;
            document.querySelector('.container').appendChild(weatherInfoContainer);

        });

    weatherCity.value = '';
}

weatherForm.addEventListener('submit', displayWeather);