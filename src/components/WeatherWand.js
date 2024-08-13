import React, { useState } from 'react';
import summonWeather from '../utils/fetchWeather';
import SearchableDropdown from './SearchableDropdown';
import WeatherTile from './WeatherTile';
import WeatherSummary from './WeatherSummary';
import {
  FaTemperatureHigh,
  FaWind,
  FaTint,
  FaCompressArrowsAlt,
  FaEye,
  FaThermometerHalf,
  FaCloudSun,
  FaCompass,
  FaSun,
  FaMoon,
} from 'react-icons/fa';

/**
 * WeatherWand component handles the main weather functionality.
 * Users can search for locations, get current weather data, and display it.
 *
 * @returns The main weather functionality component.
 */
const WeatherWand = () => {
  const [location, setLocation] = useState(''); // State to store the selected location
  const [weatherData, setWeatherData] = useState(null); // State to store the fetched weather data
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [backgroundClass, setBackgroundClass] = useState('default-bg'); // State to manage the background class based on weather

  /**
   * Handles the selection of a location, either by geolocation or user input.
   *
   * @param {string|object} selectedLocation - The location selected by the user.
   */
  const handleLocationSelect = (selectedLocation) => {
    if (selectedLocation === 'current') {
      if (navigator.geolocation) {
        // If geolocation is supported, get the user's current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude); // Fetch weather data based on coordinates
          },
          (error) => {
            // Handle geolocation errors
            setErrorMessage('Unable to retrieve your location');
            setWeatherData(null);
          }
        );
      } else {
        // Handle the case where geolocation is not supported
        setErrorMessage('Geolocation is not supported by this browser');
      }
    } else {
      // If a specific location is selected, update the location state
      setLocation(selectedLocation);
    }
  };

  /**
   * Fetches weather data based on geographic coordinates.
   *
   * @param {number} lat - The latitude of the location.
   * @param {number} lon - The longitude of the location.
   */
  const fetchWeatherByCoordinates = async (lat, lon) => {
    setIsLoading(true); // Set loading state to true
    try {
      const data = await summonWeather(`${lat},${lon}`, true); // Fetch weather data
      setWeatherData(data); // Store the fetched data in state
      updateBackground(data); // Update the background based on weather conditions
      setErrorMessage(''); // Clear any error messages
    } catch (err) {
      // Handle errors during data fetching
      setErrorMessage('Unable to retrieve weather data for your location');
      setWeatherData(null);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  /**
   * Handles the search for weather data based on the selected location.
   */
  const handleWeatherSearch = async () => {
    if (location) {
      setIsLoading(true); // Set loading state to true
      try {
        const data = await summonWeather(location); // Fetch weather data
        setWeatherData(data); // Store the fetched data in state
        updateBackground(data); // Update the background based on weather conditions
        setErrorMessage(''); // Clear any error messages
      } catch (err) {
        // Handle errors during data fetching
        setErrorMessage('Unable to find location');
        setWeatherData(null);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    } else {
      // If no location is selected, prompt the user to select one
      setErrorMessage('Please select a location');
    }
  };

  /**
   * Updates the background class based on the main weather condition.
   *
   * @param {object} data - The weather data object.
   */
  const updateBackground = (data) => {
    const weatherMain = data.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear':
        setBackgroundClass('sunny-bg');
        break;
      case 'clouds':
        setBackgroundClass('cloudy-bg');
        break;
      case 'rain':
        setBackgroundClass('rainy-bg');
        break;
      case 'snow':
        setBackgroundClass('snowy-bg');
        break;
      case 'thunderstorm':
        setBackgroundClass('thunderstorm-bg');
        break;
      case 'mist':
      case 'drizzle':
      case 'fog':
      case 'haze':
      case 'smoke':
      case 'dust':
      case 'sand':
      case 'ash':
        setBackgroundClass('mist-bg');
        break;
      case 'squall':
      case 'tornado':
        setBackgroundClass('windy-bg');
        break;
      default:
        setBackgroundClass('default-bg');
        break;
    }
  };

  return (
    <div className={`weather-wizard ${backgroundClass}`}>
      <div className="w-full max-w-lg">
        <SearchableDropdown onSelect={handleLocationSelect} />
        <button onClick={handleWeatherSearch} className="search-spell w-full mb-4">
          Summon Weather
        </button>
        {errorMessage && <p className="error-curse">{errorMessage}</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          weatherData && weatherData.main && (
            <>
              <WeatherSummary
                summary={{
                  feels_like: weatherData.main.feels_like,
                  temp_min: weatherData.main.temp_min,
                  temp_max: weatherData.main.temp_max,
                  weather: weatherData.weather,
                }}
                className="w-full"
              />
              <div className="weather-grid">
                {/* Displaying individual weather tiles with relevant data */}
                <WeatherTile icon={<FaTemperatureHigh />} label="Temperature" value={`${weatherData.main.temp}°C`} />
                <WeatherTile icon={<FaWind />} label="Wind Speed" value={`${weatherData.wind.speed} m/s`} />
                <WeatherTile icon={<FaCompass />} label="Wind Direction" value={`${weatherData.wind.deg}°`} />
                <WeatherTile icon={<FaTint />} label="Humidity" value={`${weatherData.main.humidity}%`} />
                <WeatherTile icon={<FaThermometerHalf />} label="Feels Like" value={`${weatherData.main.feels_like}°C`} />
                <WeatherTile icon={<FaCompressArrowsAlt />} label="Pressure" value={`${weatherData.main.pressure} hPa`} />
                <WeatherTile icon={<FaEye />} label="Visibility" value={`${weatherData.visibility / 1000} km`} />
                <WeatherTile icon={<FaCloudSun />} label="Cloudiness" value={`${weatherData.clouds.all}%`} />
                <WeatherTile icon={<FaSun />} label="Sunrise" value={new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} />
                <WeatherTile icon={<FaMoon />} label="Sunset" value={new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default WeatherWand;

/*
Talking Points:
- The WeatherWand component is the core of the Weather Wizard app, handling location selection, weather data retrieval, and display.
- I implemented state management using `useState` to keep track of the selected location, weather data, error messages, and loading state.
- The `handleLocationSelect` function allows users to either use their current location or select a specific one, providing flexibility in how they interact with the app.
- I included a dynamic background that changes based on the current weather conditions to make the app more immersive and visually engaging.
- The weather data is displayed through the WeatherSummary and WeatherTile components, breaking down complex information into easily understandable pieces.
- The use of icons from the React Icons library helps visually convey the weather conditions, making the data more accessible and user-friendly.
- Overall, the WeatherWand component ties together all the key functionalities of the app, providing users with a magical and informative weather experience.
*/
