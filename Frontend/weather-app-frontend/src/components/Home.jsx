import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-800 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to WeatherApp</h1>
        <p className="text-xl text-gray-300">Your go-to app for weather updates!</p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-3xl w-full mb-8 hover:bg-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What the project does</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          WeatherApp provides real-time weather updates for your location. It helps you stay informed about weather
          conditions with just a few clicks, whether you are planning your day or traveling. You can search for weather
          reports by city and get accurate forecasts.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-3xl w-full mb-8 hover:bg-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How it Works</h2>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 text-lg space-y-4">
          <li>Step 1: Sign up and log in to access the app.</li>
          <li>Step 2: Search for weather updates by entering your city name.</li>
          <li>Step 3: View real-time weather forecasts and conditions for the selected location.</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;

