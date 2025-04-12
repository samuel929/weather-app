import {
    saveHistoricalToLocalStorage,
    loadHistoricalFromLocalStorage,
  } from "../lib/utilWeatherData"
  import { UIWeatherData } from "@/types/weatherTypes"
  
  //  Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {}
  
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  })()
  
  Object.defineProperty(global, "localStorage", {
    value: localStorageMock,
  })
  
  //  Mock weather data
  const mockWeatherData: UIWeatherData[] = [
    {
      date: "2025-04-12",
      temp: 18,
      condition: "Sunny",
      humidity: 60,
      windSpeed: 10,
      location: "New York, United States of America",
      icon: "https://example.com/sunny.png",
    },
  ]
  
  describe("Weather LocalStorage Utilities", () => {
    beforeEach(() => {
      localStorage.clear()
      jest.useFakeTimers()
      jest.setSystemTime(new Date("2025-04-12T08:00:00.000Z"))
    })
  
    afterEach(() => {
      jest.useRealTimers()
    })
  
    it("should save data to localStorage", () => {
      saveHistoricalToLocalStorage(mockWeatherData)
  
      const item = localStorage.getItem("historicalWeather")
      expect(item).not.toBeNull()
  
      const parsed = JSON.parse(item!)
      expect(parsed.data).toEqual(mockWeatherData)
      expect(parsed.lastUpdated).toEqual(new Date("2025-04-12T08:00:00.000Z").toISOString())
    })
  
    it("should load valid historical data within 3 days", () => {
      saveHistoricalToLocalStorage(mockWeatherData)
  
      const data = loadHistoricalFromLocalStorage()
      expect(data).toEqual(mockWeatherData)
    })
  
    it("should retain data if it's less than 3 days old", () => {
      saveHistoricalToLocalStorage(mockWeatherData)
  
      // 2.9 days later
      const almost3Days = new Date("2025-04-14T23:00:00.000Z")
      jest.setSystemTime(almost3Days)
  
      const data = loadHistoricalFromLocalStorage()
      expect(data).toEqual(mockWeatherData)
    })
  
    it("should clear and return null for data older than 3 days", () => {
      saveHistoricalToLocalStorage(mockWeatherData)
  
      // Simulate time passing (4 days)
      const now = new Date("2025-04-16T08:00:00.000Z")
      jest.setSystemTime(now)
  
      const result = loadHistoricalFromLocalStorage()
      expect(result).toBeNull()
      expect(localStorage.getItem("historicalWeather")).toBeNull()
    })
  
    it("should return null if no historicalWeather is found", () => {
      const result = loadHistoricalFromLocalStorage()
      expect(result).toBeNull()
    })
  })
  