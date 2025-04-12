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
    let historicalData = loadHistoricalFromLocalStorage()
  
    return historicalData
  }
  