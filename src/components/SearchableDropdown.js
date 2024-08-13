import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

/**
 * SearchableDropdown component allows the user to search for and select a location.
 * It uses the OpenWeatherMap API to fetch location data based on the user's input.
 *
 * @param {function} onSelect - Function to handle the selection of a location.
 * @returns The dropdown UI component for searching and selecting locations.
 */
const SearchableDropdown = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the user's input
  const [filteredResults, setFilteredResults] = useState([]); // State to store the filtered search results
  const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown's visibility
  const dropdownRef = useRef(null); // Ref to detect clicks outside the dropdown

  /**
   * Handles the search input and fetches location data from the API.
   *
   * @param {object} event - The input event triggered by the user.
   */
  const handleSearch = async (event) => {
    const term = event.target.value; // Capture the user's input
    setSearchTerm(term);

    if (term) {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Fetch API key from environment variables
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${term}&limit=5&appid=${API_KEY}`
        );
        setFilteredResults(response.data); // Update state with the API response data
        setIsOpen(true); // Open the dropdown
      } catch (error) {
        console.error("Error fetching location data:", error); // Log any errors for debugging
        setFilteredResults([]); // Reset results if there's an error
      }
    } else {
      setFilteredResults([]); // Clear results if input is empty
      setIsOpen(true); // Open the dropdown to show the current location option
    }
  };

  /**
   * Handles the selection of a location from the dropdown list.
   *
   * @param {object|string} selectedLocation - The location selected by the user.
   */
  const handleSelect = (selectedLocation) => {
    if (selectedLocation === 'current') {
      onSelect('current'); // Handle "Use My Current Location" selection
    } else {
      // Format the selected location for display
      const locationString = `${selectedLocation.name}, ${selectedLocation.state ? `${selectedLocation.state}, ` : ''}${selectedLocation.country}`;
      setSearchTerm(locationString); // Update the search term with the selected location
      setIsOpen(false); // Close the dropdown
      onSelect(locationString); // Pass the selected location back to the parent component
    }
  };

  /**
   * Closes the dropdown if a click is detected outside of it.
   *
   * @param {object} event - The click event.
   */
  const handleClickOutside = (event) => {
    // If the click is outside the dropdown, close it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add an event listener to detect clicks outside the dropdown.
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-lg searchable-dropdown" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch} // Trigger search on input change
        onFocus={() => setIsOpen(true)} // Open the dropdown when the input is focused
        placeholder="Search for a location..."
        className="input-spell p-3 mb-4 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      {isOpen && (
        <ul className="dropdown-list bg-black bg-opacity-50 backdrop-blur-md rounded-lg shadow-md max-h-48 overflow-y-auto mb-4">
          {!searchTerm && (
            <li
              className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => handleSelect('current')}
            >
              Use My Current Location
            </li>
          )}
          {searchTerm && filteredResults.length > 0 ? (
            filteredResults.map((location) => (
              <li
                key={`${location.lat}-${location.lon}`}
                className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={() => handleSelect(location)}
              >
                {location.name}, {location.state ? `${location.state}, ` : ''}{location.country}
              </li>
            ))
          ) : (
            searchTerm && <li className="p-2">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;

/*
Talking Points:
- This component allows users to search for and select locations by interacting with the OpenWeatherMap API.
- I use `useState` to manage the search term, filtered results, and dropdown state, ensuring the component reacts in real-time to user input.
- The `handleSearch` function is the core of this component, fetching location data based on what the user types. It leverages async/await to handle the asynchronous API calls.
- To enhance the user experience, I implemented a dropdown that closes automatically when the user clicks outside of it. This is handled with a `useRef` and an event listener, ensuring the dropdown behaves intuitively.
- I chose Tailwind CSS for styling because it allows for quick customization, making the dropdown look clean and professional while maintaining consistency with the rest of the app.
*/



