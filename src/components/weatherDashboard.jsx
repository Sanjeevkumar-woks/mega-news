import React, { useState, useEffect } from "react";

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch data from weather API here

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=4213421342134213421"
        ); // replace with actual API
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-6xl">☀️</span>
            <h1 className="text-5xl font-bold ml-4">
              {weatherData?.mainTemp}°C
            </h1>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">New York, NY</h2>
            <p>Wednesday 04:00</p>
          </div>
        </div>
        <div className="mt-4">
          <p>Precipitation: {weatherData?.precipitation}%</p>
          <p>Humidity: {weatherData?.humidity}%</p>
          <p>Wind: {weatherData?.windSpeed} Km/H</p>
        </div>
        <div className="mt-4 flex justify-between text-center">
          {/* Replace with real forecast data */}
          {weatherData?.forecast.map((day, index) => (
            <div key={index}>
              <p>{day.day}</p>
              <span className="text-3xl">{day.icon}</span>
              <p>{day.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/3">
        {/* Render other city cards */}
        {weatherData?.cities.map((city, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r from-${city.color}-500 to-${city.color}-700 text-white rounded-lg p-4 shadow-md`}
          >
            <div className="flex justify-between">
              <p className="text-sm">{city.time}</p>
              <p className="text-xl font-semibold">{city.name}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-4xl">{city.icon}</span>
              <p className="text-4xl font-bold">{city.temp}°C</p>
            </div>
            <p className="mt-2">Precipitation: {city.precipitation}%</p>
            <p>Humidity: {city.humidity}%</p>
            <p>Wind: {city.wind} Km/H</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDashboard;
