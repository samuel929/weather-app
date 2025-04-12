import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Droplets, Wind } from 'lucide-react'
import RenderAnimatedWeatherIcon from "./RenderWeatherIcon"
import { UIWeatherData } from "@/types/weatherTypes"



interface WeatherCardProps {
  weather: UIWeatherData
}


export default function CurrentWeatherDisplay({ weather }: WeatherCardProps) {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.3 }}
      className="mb-8 w-full max-w-md"
    >
      <Card className="p-6 bg-white/70 backdrop-blur-lg border-none rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-slate-800">{weather.location}</h2>
            <p className="text-slate-600">{weather.date}</p>
          </div>

          <div className="flex items-center">
            {weather.icon ? (
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="bg-sky-100/50 p-2 rounded-full"
              >
                <img src={weather.icon || "/placeholder.svg"} alt={weather.condition} className="h-16 w-16" />
              </motion.div>
            ) : (
              <RenderAnimatedWeatherIcon condition={weather.condition}/>
            )}

            <div className="ml-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span className="text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">{weather.temp}°</span>
              </motion.div>
              <p className="text-slate-600 font-medium">{weather.condition}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {weather.humidity > 0 && (
            <div className="text-center p-4 bg-gradient-to-br from-sky-100 to-blue-50 rounded-2xl shadow-sm border border-sky-100/50 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-sky-500 mr-2" />
              <div>
                <p className="text-slate-600 text-sm font-medium">Humidity</p>
                <p className="text-xl font-semibold text-slate-800">{weather.humidity}%</p>
              </div>
            </div>
          )}
          {weather.windSpeed > 0 && (
            <div className="text-center p-4 bg-gradient-to-br from-sky-100 to-blue-50 rounded-2xl shadow-sm border border-sky-100/50 flex items-center justify-center">
              <Wind className="w-5 h-5 text-sky-500 mr-2" />
              <div>
                <p className="text-slate-600 text-sm font-medium">Wind Speed</p>
                <p className="text-xl font-semibold text-slate-800">{weather.windSpeed} km/h</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
