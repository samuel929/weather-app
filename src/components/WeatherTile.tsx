import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { UIWeatherData } from "@/types/weatherTypes"
import RenderSimpleWeatherIcon from "./WeatherIconRender"

function WeatherTile({
  weather,
  onClick,
  isSelected,
}: {
  weather: UIWeatherData
  onClick: () => void
  isSelected: boolean
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? "z-10" 
          : "hover:shadow-md"
      }`}
    >
      <Card 
        className={`
          p-4 bg-white/70 backdrop-blur-sm rounded-2xl border-0
          ${isSelected 
            ? "bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg" 
            : "shadow-sm"
          }
          transition-all duration-200
        `}
      >
        <div className="flex flex-col items-center">
          <p className="font-medium text-slate-600">{weather.date}</p>
          
          <div className={`
            my-3 p-2 rounded-full
            ${isSelected 
              ? "bg-gradient-to-r from-sky-100 to-blue-100" 
              : "bg-sky-50"
            }
          `}>
            {weather.icon ? (
              <img src={weather.icon || "/placeholder.svg"} alt={weather.condition} className="h-10 w-10" />
            ) : (
              <RenderSimpleWeatherIcon condition={weather.condition} />
            )}
          </div>
          
          <p className={`
            text-2xl font-bold
            ${isSelected 
              ? "bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent" 
              : "text-slate-800"
            }
          `}>
            {weather.temp}°
          </p>
          
          <p className="text-sm text-slate-600 mt-1">{weather.condition}</p>
        </div>
      </Card>
      
      {isSelected && (
        <motion.div 
          className="h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mt-1 mx-auto w-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 32, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}

export default WeatherTile
