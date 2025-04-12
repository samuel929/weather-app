import { WeatherData, ForecastOrHistoryData } from "../types/weatherTypes";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchCurrentWeather = async (location: string): Promise<WeatherData> => {
  const res = await fetch(
    `${BASE_URL}/current?access_key=${API_KEY}&query=${location}`
  );
  const data = await res.json();
  return data;
};

const fetchHistoryWeather = async (
  location: string,
  date: string
): Promise<ForecastOrHistoryData> => {
  const res = await fetch(
    `${BASE_URL}/historical?access_key=${API_KEY}&query=${location}&historical_date=${date}`
  );
  const data = await res.json();
  const day = data.historical[date];

  return {
    date,
    temperature: day.temperature,
    weather_icon: day.weather_icons?.[0] ?? "",
    description: day.weather_descriptions?.[0] ?? "",
  };
};

const fetchForecastWeather = async (
  location: string,
  date: string
): Promise<ForecastOrHistoryData> => {
  return fetchHistoryWeather(location, date);
};

export { fetchCurrentWeather, fetchHistoryWeather, fetchForecastWeather };
