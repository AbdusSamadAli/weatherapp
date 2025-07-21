import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherReport = () => {
  const [weatherReports, setWeatherReports] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in.");
      return;
    }

    axios
      .get("http://localhost:5001/weather-reports", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWeatherReports(response.data);
        setErrorMessage(""); 
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch weather reports.");
      });
  }, []);

  return (
    <div className="bg-gray-800 dark:bg-gray-900 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-3xl mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Weather Search Reports</h2>
        {errorMessage && (
          <p className="text-red-500 dark:text-red-400 mb-4">{errorMessage}</p>
        )}
        <ul className="space-y-4">
          {weatherReports.map((report) => (
            <li
              key={report.id}
              className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow-md"
            >
              <div>
                <strong className="text-gray-800 dark:text-white">User:</strong> {report.username}
              </div>
              <div>
                <strong className="text-gray-800 dark:text-white">City:</strong> {report.city}
              </div>
              <div>
                <strong className="text-gray-800 dark:text-white">Weather:</strong> 
                {JSON.parse(report.weather_info).current.weather_descriptions[0]}
              </div>
              <div>
                <strong className="text-gray-800 dark:text-white">Temperature:</strong> 
                {JSON.parse(report.weather_info).current.temperature}°C
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherReport;


