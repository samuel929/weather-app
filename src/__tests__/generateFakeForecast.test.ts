import { generateFakeForecast } from "../lib/utilWeatherData"
import { UIWeatherData } from "@/types/weatherTypes"

describe("generateFakeForecast", () => {
  const baseData: UIWeatherData[] = [
    {
      date: "2025-04-10",
      temp: 15,
      condition: "Cloudy",
      humidity: 70,
      windSpeed: 8,
      location: "Cape Town, South Africa",
      icon: "https://example.com/cloudy.png",
    },
    {
      date: "2025-04-11",
      temp: 17,
      condition: "Cloudy",
      humidity: 70,
      windSpeed: 8,
      location: "Cape Town, South Africa",
      icon: "https://example.com/cloudy.png",
    },
  ]

  it("should return 3 forecasted days with increasing temperature", () => {
    const result = generateFakeForecast(baseData)

    expect(result).toHaveLength(3)
    expect(result).not.toBeNull()
    expect(result![0].temp).toBe(18) // 17 + 1
    expect(result![1].temp).toBe(19)
    expect(result![2].temp).toBe(20)

    result?.forEach((forecast) => {
      expect(forecast.condition).toBe("Cloudy")
    })
  })

  it("should return 3 forecasted days with decreasing temperature", () => {
    const decreasingTemp = [...baseData]
    decreasingTemp[1].temp = 13

    const result = generateFakeForecast(decreasingTemp)

    expect(result).toHaveLength(3)
    expect(result![0].temp).toBe(12)
    expect(result![1].temp).toBe(11)
    expect(result![2].temp).toBe(10)
  })

  it("should return 3 forecasted days with stable temperature if no change", () => {
    const stableTemp = [...baseData]
    stableTemp[1].temp = stableTemp[0].temp

    const result = generateFakeForecast(stableTemp)

    expect(result).toHaveLength(3)
    expect(result![0].temp).toBe(15)
    expect(result![1].temp).toBe(15)
    expect(result![2].temp).toBe(15)
  })

  it("should return an empty array if history is null", () => {
    const result = generateFakeForecast(null)
    expect(result).toEqual([])
  })

  it("should return an empty array if history has less than 2 items", () => {
    const result = generateFakeForecast([baseData[0]])
    expect(result).toEqual([])
  })
})
