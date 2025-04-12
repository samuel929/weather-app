import { motion } from "framer-motion"
import { Sun, CloudRain, Cloud } from "lucide-react"


interface IProps {
    condition: string
}
export default function RenderAnimatedWeatherIcon({ condition }: IProps) {
    const lowerCondition = condition.toLowerCase()
  
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return (
        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Sun className="h-16 w-16 text-yellow-500" />
        </motion.div>
      )
    }
  
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return (
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <CloudRain className="h-16 w-16 text-blue-500" />
        </motion.div>
      )
    }
  
    return (
      <motion.div
        animate={{
          x: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Cloud className="h-16 w-16 text-gray-500" />
      </motion.div>
    )
  }