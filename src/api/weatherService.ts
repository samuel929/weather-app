import type { WeatherData} from "../types/weatherTypes"

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const fetchCurrentWeather = async (location: string): Promise<WeatherData> => {
  const res = await fetch(`${BASE_URL}/current?access_key=${API_KEY}&query=${location}`)
  const data = await res.json()
  return data
}


export { fetchCurrentWeather }
