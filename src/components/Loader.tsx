import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";



export default function Loader() {

    return(
        <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-gray-500" />
            </motion.div>
          </div>
    )
}