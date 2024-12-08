WeatherApp
WeatherApp is a web application that allows users to check the weather in any city and view a detailed report of their searches. The app is built with React for the frontend, Node.js for the backend, and SQL (MySQL) for data storage. The app implements secure user authentication with JWT (JSON Web Tokens) for login and registration. The weather data is fetched from the WeatherStack API to provide real-time forecasts.

Features
1. User Authentication (Login & Sign Up)
WeatherApp supports user authentication using JWT. Users can sign up with their credentials and log in to access the features of the app. Upon successful login, a token is generated to authenticate subsequent requests securely. This helps keep user data safe and private.

2. Weather Search
WeatherApp allows users to search for the weather in any city of their choice. The app communicates with the WeatherStack API to fetch accurate weather information such as temperature, weather descriptions, and more. Users can easily check the current weather conditions in real-time.

3. Weather Search Reports
After searching for the weather, users can view a report that displays which city they searched for, along with the corresponding weather information. The report also shows which user made the search, giving users a personalized experience. All search history is stored in the backend database (MySQL) for future reference.

Technologies Used
Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Database: MySQL
Authentication: JWT (JSON Web Tokens)
API: WeatherStack (for weather data)
Usage:
Sign Up: Users can create a new account by providing their username, email, and password. Upon successful signup, users are logged in automatically.

Login: Once signed up, users can log in by entering their credentials. A JWT token is returned for authenticated requests.

Search Weather: After logging in, users can enter a city name and check the current weather. The app fetches weather details like temperature and weather conditions from WeatherStack API.

View Weather Report: Users can see a report of their previous weather searches, including the user's name, city searched, and the weather details returned.
