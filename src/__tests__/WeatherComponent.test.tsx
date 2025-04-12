/**
 * @jest-environment jsdom
 */

import { render, waitFor } from "@testing-library/react"
import { useEffect, useState } from "react"
import { fetchCurrentWeather } from "../api/weatherService"
import { UIWeatherData } from "../types/weatherTypes"

jest.mock("../api/weatherService", () => ({
  fetchCurrentWeather: jest.fn(),
}))

const mockWeatherAPIResponse = {
  location: {
    name: "Pretoria",
    country: "South Africa",
    localtime: "2025-04-12 14:00",
  },
  current: {
    temperature: 25,
    humidity: 40,
    wind_speed: 10,
    weather_descriptions: ["Sunny"],
    weather_icons: ["https://example.com/icon.png"],
  },
}

const TestComponent = () => {
  const [currentWeather, setCurrentWeather] = useState<UIWeatherData | null>(null)
  const location = "Pretoria"

  useEffect(() => {
    const fetchData = async () => {
      const currentData = await fetchCurrentWeather(location)
      const currentUIData: UIWeatherData = {
        date: new Date(currentData.location?.localtime).toLocaleDateString(),
        temp: currentData.current?.temperature,
        condition: currentData.current?.weather_descriptions[0] || "Unknown",
        humidity: currentData.current?.humidity,
        windSpeed: currentData.current?.wind_speed,
        location: `${currentData.location?.name}, ${currentData.location?.country}`,
        icon: currentData.current?.weather_icons[0],
      }

      setCurrentWeather(currentUIData)
    }

    fetchData()
  }, [])

  return (
    <div>
      {currentWeather && (
        <>
          <p data-testid="location">{currentWeather.location}</p>
          <p data-testid="temp">{currentWeather.temp}</p>
          <p data-testid="condition">{currentWeather.condition}</p>
        </>
      )}
    </div>
  )
}

test("fetches and sets current weather correctly", async () => {
  ;(fetchCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherAPIResponse)

  const { getByTestId } = render(<TestComponent />)

  await waitFor(() => {
    expect(getByTestId("location").textContent).toBe("Pretoria, South Africa")
    expect(getByTestId("temp").textContent).toBe("25")
    expect(getByTestId("condition").textContent).toBe("Sunny")
  })
})
