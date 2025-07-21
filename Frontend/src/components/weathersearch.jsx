import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/weather`,
        {
          params: { city },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWeatherData(response.data.weatherData); 
      setErrorMessage(""); 
    } catch (error) {
      setErrorMessage("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Search for Weather
          </h1>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
        {weatherData && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {weatherData.location.name} Weather
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              {weatherData.current.temperature}°C
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {weatherData.current.weather_descriptions[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherSearch;




  