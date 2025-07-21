import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WeatherSearch from "./components/weathersearch";
import WeatherReport from "./components/weatherreport";
import Home from "./components/Home"; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  const toggleDarkMode = () => {
    const currentMode = document.documentElement.classList.contains("dark");
    if (currentMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </li>
            <li>
              <Link to="/weather-search" className="hover:underline">Weather Search</Link>
            </li>
            <li>
              <Link to="/weather-report" className="hover:underline">Weather Report</Link>
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className="text-white hover:text-gray-200"
              >
                Toggle Dark Mode
              </button>
            </li>
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/weather-search" element={<WeatherSearch />} />
            <Route path="/weather-report" element={<WeatherReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;




