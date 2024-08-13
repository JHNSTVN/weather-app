import React from 'react';
import { FaMagic } from 'react-icons/fa';

/**
 * WeatherSummary component displays a mystical summary of the weather conditions.
 * If no summary data is available, it shows a "Data not available" message.
 *
 * @param {object} summary - The summary data including feels_like, temp_min, temp_max, and conditions.
 * @returns The UI component for displaying the weather summary with a wizardry theme.
 */
const WeatherSummary = ({ summary }) => {
  if (!summary) {
    // If there's no weather data available, I provide a default message to let the user know.
    return (
      <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-4 text-white mb-4 w-full sm:col-span-2 lg:col-span-2 text-center">
        <p className="text-xl font-semibold">Weather Summary</p>
        <p>The elements are silent... Data not available.</p>
      </div>
    );
  }

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-4 text-white mb-4 w-full sm:w-full lg:col-span-2 text-center">
      <div className="flex flex-col items-center justify-center mb-4">
        {/* I use the FaMagic icon to reinforce the mystical theme of the Weather Wizard app */}
        <FaMagic className="text-3xl text-purple-500 mb-2" />
        {/* I include a whimsical greeting based on the 'feels like' temperature to engage the user with a bit of magic */}
        <p className="text-xl font-semibold border-b border-gray-500 mb-2 pb-1">
          {summary.feels_like ? `The air whispers, 'It feels like ${summary.feels_like}°C...'` : 'The air is still...'}
        </p>
      </div>
      {/* Here, I present the temperature range in a magical way to make the weather feel more enchanting */}
      <p className="text-lg font-semibold">
        The temperature dances between {summary.temp_min ? `${summary.temp_min}°C` : '°C'} and {summary.temp_max ? `${summary.temp_max}°C` : '°C'}.
      </p>
      {/* Display the weather conditions with a description to keep users informed */}
      <p className="text-lg font-semibold">
        Conditions: {summary.weather && summary.weather[0].description ? summary.weather[0].description : 'Mystery clouds...'}
      </p>
      {/* Add some whimsical advice based on the current weather condition to enhance the theme */}
      <p className="mt-4 italic text-sm text-gray-300">
        {getWizardAdvice(summary.weather && summary.weather[0].main)}
      </p>
    </div>
  );
};

/**
 * Provides whimsical advice based on the weather condition.
 * 
 * @param {string} condition - The main weather condition (e.g., 'Clear', 'Rain').
 * @returns {string} A whimsical piece of advice or a magical quote.
 */
const getWizardAdvice = (condition) => {
  // This function adds a unique, wizardly touch by offering advice or quotes based on the weather condition.
  switch (condition.toLowerCase()) {
    case 'clear':
      return "The sun smiles upon you, a good day for casting spells!";
    case 'clouds':
      return "Clouds gather, perfect for scrying the future.";
    case 'rain':
      return "Raindrops are nature's elixir, harness them wisely.";
    case 'snow':
      return "Snowflakes are frozen spells, handle with care.";
    case 'thunderstorm':
      return "The storm rages, a wizard's power grows!";
    default:
      return "The weather is mysterious today, proceed with caution.";
  }
};

export default WeatherSummary;

/*
Talking Points:
- I created the WeatherSummary component to present weather data in a whimsical, engaging manner that aligns with the magical theme of the Weather Wizard app.
- The FaMagic icon at the top of the summary serves as a visual cue to the user, reinforcing the wizardry theme.
- I added personalized weather advice based on the current conditions to make the user experience more fun and unique.
- The summary ensures that even if no data is available, the user is informed with a themed message that keeps the app's tone consistent.
- Overall, this component turns what could be mundane weather data into a magical experience that draws users into the world of the Weather Wizard.
*/
