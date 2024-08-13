import axios from 'axios';

/**
 * summonWeather function fetches weather data based on a location or coordinates.
 *
 * @param {string} location - The location name or coordinates (latitude,longitude).
 * @param {boolean} isCoordinates - Whether the location is in coordinates (true) or name (false).
 * @returns The weather data retrieved from the OpenWeatherMap API.
 * @throws An error if the location cannot be found or the API request fails.
 */
const summonWeather = async (location, isCoordinates = false) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // I retrieve the API key from environment variables to keep it secure and flexible.

  let weatherURL;
  if (isCoordinates) {
    // If the location is provided as coordinates, I build the API URL accordingly.
    const [lat, lon] = location.split(',');
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else {
    // If the location is provided as a name, I first fetch the coordinates.
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
    const geoResponse = await axios.get(geoURL);
    
    // If no data is returned, I throw an error to handle it gracefully in the UI.
    if (geoResponse.data.length === 0) {
      throw new Error('Location not found');
    }
    // Extract the latitude and longitude from the response.
    const { lat, lon } = geoResponse.data[0];
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  }

  try {
    // I make the final request to the OpenWeatherMap API using the constructed URL.
    const response = await axios.get(weatherURL);
    return response.data; // Return the fetched weather data.
  } catch (error) {
    // Log any errors for debugging and throw an error for the UI to handle.
    console.error("Weather fetch failed", error);
    throw new Error(error.response?.data?.message || 'Unable to find location');
  }
};

export default summonWeather;

/*
Talking Points:
- The summonWeather function is the backbone of my app's ability to retrieve weather data from the OpenWeatherMap API.
- I designed it to be flexible, allowing it to handle both location names and geographic coordinates. This makes it easier for users to get weather data regardless of how they specify their location.
- By keeping the API key in an environment variable, I ensure that the key remains secure and that the app is more adaptable to different environments (e.g., development, production).
- The function first determines if the input is coordinates or a location name. If it's a name, I fetch the corresponding coordinates before retrieving the weather data.
- I implemented error handling to manage situations where the location cannot be found or if the API request fails. This ensures that users are informed when something goes wrong, rather than the app failing silently.
- This function is essential for making the Weather Wizard app work, as it connects the user interface with real-time weather data.
*/
