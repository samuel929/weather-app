export interface WeatherData {
  current: {
    temperature: number
    weather_icons: string[]
    weather_descriptions: string[]
    humidity: number
    wind_speed: number
  }
  location: {
    name: string
    country: string
    localtime: string
  }
  request: {
    query: string
  }
}

export interface ForecastOrHistoryData {
  date: string
  temperature: number
  weather_icon: string
  description: string
}

export type UIWeatherData = {
  date: string
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  location: string
  icon?: string
}
