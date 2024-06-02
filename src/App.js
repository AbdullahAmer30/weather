import React, { useState, useEffect } from 'react';
import './App.css';


// ... (previous code)

const App = () => {
  const API_KEY = 'e18a2074123f2b542291de38243cc419';

const weatherCodes = {
  '01d': 'clear',
  '02d': 'partly-cloudyy',
  '03d': 'cloudy',
  '04d': 'cloudy',
  '09d': 'rainy',
  '10d': 'rainy',
  '11d': 'thunderstorm',
  '13d': 'snowy',
  '50d': 'foggy',
  '01n': 'clear',
  '02n': 'partly-cloudyy',
  '03n': 'cloudy',
  '04n': 'cloudy',
  '09n': 'rainy',
  '10n': 'rainy',
  '11n': 'thunderstorm',
  '13n': 'snowy',
  '50n': 'foggy',
};
const getWeatherIconUrl = () => {
  if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
    const iconCode = weatherData.weather[0].icon;
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  }
  return null;
};

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null); // Reset weather data on error
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setShowWeather(true);
      fetchWeatherData();
    }
  };

  useEffect(() => {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      const weatherType = weatherCodes[weatherData.weather[0].icon];
      if (weatherType) {
        setBackgroundUrl(`${process.env.PUBLIC_URL}/images/${weatherType}.jpg`);
      }
    }
  }, [weatherData]);

  return (
    <div className={`App ${showWeather ? 'slide-in' : ''}`}
    style={{
      backgroundImage: `url(${backgroundUrl})`,
      transition: 'background-image 2s ease-in-out',
    }}>
      <div className="weather-container">
        <h1>Weather App</h1>
        <div>
          <label htmlFor="cityInput">Enter City:</label>
          <input
            id="cityInput"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button>Get Weather</button>
        </div>
        <div className={`weather-data ${showWeather && weatherData && weatherData.main && weatherData.weather && weatherData.weather.length > 0 && weatherData.name ? 'show' : ''}`}
       >
          {showWeather && weatherData && weatherData.main && weatherData.weather && weatherData.weather.length > 0 && weatherData.name ? (
            <div className="slide-in">
              <h2>Weather in {weatherData.name}</h2>
              <div className="weather-details">
                <img
                  src={getWeatherIconUrl()}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <div className='temperature-box'>
                  <p>{Math.round(weatherData.main.temp)}°C</p>
                </div>
              </div>
              <p>{weatherData.weather[0].description}</p>
              <div> <p>humidity level:{weatherData.main.humidity}</p></div>
            </div>
          ) : null}
            
          
        </div>
      </div>
    </div>
  );
};

export default App;
