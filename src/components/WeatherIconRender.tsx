import {  Cloud, CloudRain, Sun } from "lucide-react"

interface IProps {
    condition: string
}

export default function RenderSimpleWeatherIcon({ condition }: IProps) {
    const lowerCondition = condition.toLowerCase()
  
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return <Sun className="h-8 w-8 text-yellow-500" />
    }
  
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    }
  
    return <Cloud className="h-8 w-8 text-gray-500" />
  }
  
  