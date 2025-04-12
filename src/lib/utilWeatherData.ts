import {  UIWeatherData } from "@/types/weatherTypes"

type HistoricalWeatherCache = {
    lastUpdated: string
    data:   UIWeatherData[]
  }
  
  export const saveHistoricalToLocalStorage = (data:   UIWeatherData[]) => {
    const payload: HistoricalWeatherCache = {
      lastUpdated: new Date().toISOString(),
      data,
    }
  
    localStorage.setItem("historicalWeather", JSON.stringify(payload))
  }
  

  export const loadHistoricalFromLocalStorage = ():  UIWeatherData[] | null => {
    const item = localStorage.getItem("historicalWeather")
    if (!item) return null
  
    const parsed: HistoricalWeatherCache = JSON.parse(item)
    const lastUpdated = new Date(parsed.lastUpdated)
    const now = new Date()
    const daysPassed = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  
    if (daysPassed >= 3) {
      localStorage.removeItem("historicalWeather")
      return null
    }
    return parsed.data
  }
  

  export const useHistoricalWeather = async () => {
    let historicalData = await loadHistoricalFromLocalStorage()
  
    return historicalData
  }
  

  export const generateFakeForecast = (history: UIWeatherData[] | null): UIWeatherData[] | null => {
    if (!history || history.length < 2) return [];
  
    const last = history[history.length - 1];
    const secondLast = history[history.length - 2];
  
    const tempDiff = last.temp - secondLast.temp;
    const trend = Math.sign(tempDiff); // +1, 0, or -1
  
    const forecast: UIWeatherData[] = [];
  
    for (let i = 1; i <= 3; i++) {
      const forecastDate = new Date();
      forecastDate.setDate(forecastDate.getDate() + i);
  
      forecast.push({
        ...last,
        date: forecastDate.toLocaleDateString(),
        temp: last.temp + trend * i, // assume steady change
        condition: last.condition, // reuse condition for simplicity
      });
    }
  
    return forecast;
  };
  