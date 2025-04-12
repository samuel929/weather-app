import { motion } from "framer-motion";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import { UIWeatherData } from "@/types/weatherTypes";


interface IProps{
    selectedDay: UIWeatherData
}
export default function SelectDayDisplay({ selectedDay }: IProps) {
   return(
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Selected Day Details</h2>
    <CurrentWeatherDisplay weather={selectedDay} />
  </motion.div>
   )
}