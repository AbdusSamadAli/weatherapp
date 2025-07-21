import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/signup', { username, password });
      if (response.status === 200) {
        setRedirectToLogin(true);
      }
    } catch (error) {
      setErrorMessage('Error signing up');
      console.error('Signup Error:', error);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-800 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;




