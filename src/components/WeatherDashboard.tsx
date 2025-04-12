"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { fetchCurrentWeather } from "../api/weatherService"
import { saveHistoricalToLocalStorage, useHistoricalWeather } from "@/lib/utilWeatherData"
import { UIWeatherData } from "@/types/weatherTypes"
import { Cloud, CloudRain, Loader, Loader2, Search, Sun } from "lucide-react"
import WeatherTile from "./WeatherTile"
import RenderAnimatedWeatherIcon from "./RenderWeatherIcon"
import CurrentWeatherDisplay from "./CurrentWeatherDisplay"
import SearchBar from "./SearchBar"
import Navigation from "./Navigation"
import SelectDayDisplay from "./SelectDayDisplay"




export default function WeatherApp() {
  const [location, setLocation] = useState("New York")
  const [searchInput, setSearchInput] = useState("New York")
  const [currentWeather, setCurrentWeather] = useState<UIWeatherData | null>(null)
  const [forecast, setForecast] = useState<UIWeatherData[]>([])
  const [history, setHistory] = useState<UIWeatherData[] | null>([])
  const [selectedDay, setSelectedDay] = useState<UIWeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<"current" | "forecast" | "history">("current")

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true)

      try {
        // Fetch current weather
        const currentData = await fetchCurrentWeather(location)
        const currentUIData: UIWeatherData = {
          date: new Date(currentData.location.localtime).toLocaleDateString(),
          temp: currentData.current.temperature,
          condition: currentData.current.weather_descriptions[0] || "Unknown",
          humidity: currentData.current.humidity,
          windSpeed: currentData.current.wind_speed,
          location: `${currentData.location.name}, ${currentData.location.country}`,
          icon: currentData.current.weather_icons[0],
        }
        
        setCurrentWeather(currentUIData)
         // Save to localStorage
        await saveHistoricalToLocalStorage([currentUIData])
       

        // Fetch forecast data (next 3 days)

        

        // // Fetch history data (past 3 days)
        const historyUIData = await useHistoricalWeather()
        setHistory(historyUIData)

      
      } catch (error) {
        console.error("Error fetching weather data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [location])

  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLocation(searchInput)
  }

  const handleDaySelect = (day: UIWeatherData) => {
    setSelectedDay(day)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className=" text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Weather Forecast</h1>
        <p className="text-slate-600">Enter a city or location to get the weather forecast</p>
      </div>

      
        {/* Navigation */}
        <Navigation
            view={view}
            setView={setView}
          />

        {/* Search Bar */}
         <SearchBar
           setSearchInput={setSearchInput}
           handleSearch={handleSearch}
           searchInput={searchInput}
         />


        {/* Loading State */}
        {isLoading ? (
          <Loader/>
        ) : (
          <>
            {/* Main Weather Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="my-8"
              >
                {view === "current" && currentWeather && (
                  <CurrentWeatherDisplay weather={selectedDay || currentWeather} />
                )}

                {view === "forecast" && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">3-Day Forecast</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {forecast.map((day, index) => (
                        <WeatherTile
                          key={index}
                          weather={day}
                          onClick={() => handleDaySelect(day)}
                          isSelected={selectedDay?.date === day.date}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {view === "history" && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">3-Day History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {history?.map((day, index) => (
                        <WeatherTile
                          key={index}
                          weather={day}
                          onClick={() => handleDaySelect(day)}
                          isSelected={selectedDay?.date === day.date}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Selected Day Display */}
            {selectedDay && view !== "current" && (
              <SelectDayDisplay  selectedDay={selectedDay}/>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}








