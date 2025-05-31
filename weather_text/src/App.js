import React, { useEffect, useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Weather state
  const [weather, setWeather] = useState(null);
  const [cardState, setCardState] = useState({
    loading: true,
    error: null,
  });

  // Helper to fetch weather from Open-Meteo for a static location (e.g., New York)
  // All geolocation and location/city usage are removed.
  const fetchWeather = async () => {
    try {
      // Use static coordinates (example: New York)
      const lat = 40.7128;
      const lon = -74.0060;
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      const weatherRes = await fetch(weatherUrl);

      if (!weatherRes.ok) throw new Error("Unable to fetch data");

      const weatherData = await weatherRes.json();

      // Weather description mapping for Open-Meteo codes
      const weatherDescMap = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Freezing drizzle',
        61: 'Slight rain',
        63: 'Rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Snowfall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm w/ slight hail',
        99: 'Thunderstorm w/ heavy hail',
      };

      const { temperature, weathercode } =
        (weatherData.current_weather || {});

      setWeather({
        temperature,
        description: weatherDescMap[weathercode] || 'Unknown',
      });
      setCardState({ loading: false, error: null });
    } catch (err) {
      setCardState({ loading: false, error: 'Unable to get weather data.' });
    }
  };

  // On mount, just fetch weather statically (no geolocation, no area/city)
  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="weather-bg">
      <div className="center-container">
        <div className="weather-card">
          {cardState.loading && (
            <div className="weather-content weather-loading">
              Fetching weather...
            </div>
          )}
          {cardState.error && (
            <div className="weather-content weather-error">{cardState.error}</div>
          )}
          {!cardState.loading && !cardState.error && weather && (
            <div className="weather-content">
              <div className="weather-temp-row">
                <span className="weather-temp">{Math.round(weather.temperature)}°C</span>
              </div>
              <div className="weather-desc">{weather.description}</div>
            </div>
          )}
        </div>
        <footer className="weather-footer">
          Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="accent-link">Open-Meteo.com</a>
        </footer>
      </div>
    </div>
  );
}

export default App;