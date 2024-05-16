import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import cloudsIcon from './Assets/clouds.png';
import clearIcon from './Assets/clear.png';
import rainIcon from './Assets/rain.png';
import drizzleIcon from './Assets/drizzle.png';
import mistIcon from './Assets/mist.png';
import snowIcon from './Assets/snow.png';
import windIcon from './Assets/wind.png';
import humidityIcon from './Assets/humidity.png';
import hazeIcon from './Assets/haze.png';

const WeatherApp = () => {
      const [weatherData, setWeatherData] = useState(null);
      const [city, setCity] = useState('');
      const [error, setError] = useState(false);

      const fetchWeather = async () => {
            try {
                  const apiKey = "ccbbe741d8f9e6d24c21a0833eafd0b1";
                  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

                  const response = await fetch(apiUrl);
                  if (response.status === 404) {
                        setError(true);
                        setWeatherData(null);
                  } else {
                        const data = await response.json();
                        if (data.main) {
                              setWeatherData(data);
                              setError(false);
                        } else {
                              throw new Error("No weather data found");
                        }
                  }
            } catch (error) {
                  console.error('Error:', error);
                  setError(true);
                  setWeatherData(null);
            }
      };

      useEffect(() => {
            fetchWeather();
      }, []);

      const handleSubmit = (e) => {
            e.preventDefault();
            fetchWeather();
      };

      const getWeatherIcon = (weatherMain) => {
            switch (weatherMain) {
                  case "Clouds":
                        return cloudsIcon;
                  case "Clear":
                        return clearIcon;
                  case "Rain":
                        return rainIcon;
                  case "Drizzle":
                        return drizzleIcon;
                  case "Mist":
                        return mistIcon;
                  case "Snow":
                        return snowIcon;
                  case "Haze":
                        return hazeIcon;
                  default:
                        return null;
            }
      };


      return (
            <div className='container'>
                  <form className='form' onSubmit={handleSubmit}>
                        <input
                              type="text"
                              placeholder="Enter the city name"
                              spellCheck="false"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className='inputBox'
                              required
                        />
                        <button type="submit" className='btn'>
                              <i className='fas fa-search search'></i>
                        </button>

                  </form>
                  {error && <div className='error'><span><i className="fa-solid fa-triangle-exclamation"></i> Please write a valid city name</span></div>}
                  {weatherData && (
                        <div className='weather'>
                              <img
                                    src={getWeatherIcon(weatherData.weather[0].main)}
                                    alt={weatherData.weather[0].description}
                                    className='weatherLogo'
                              />
                              <h1 className='temperature'>{Math.round(weatherData.main.temp)}°C</h1>
                              <h3 className='cityName'>{weatherData.name}</h3>
                              <div className='details'>
                                    <div className='col'>
                                          <img src={humidityIcon} alt="humidity" />
                                          <div>
                                                <p className='humidity'>{weatherData.main.humidity}%</p>
                                                <p>Humidity</p>
                                          </div>
                                    </div>
                                    <div className='col'>
                                          <img src={windIcon} alt="wind" />
                                          <div>
                                                <p className='wind'>{weatherData.wind.speed} km/h</p>
                                                <p>Wind Speed</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default WeatherApp;
