import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/weather-report"); 
    } catch (error) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-200 dark:bg-gray-600 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-200 dark:bg-gray-600 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Login;





