"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading Portfolio")
  const [dots, setDots] = useState("")

  useEffect(() => {
    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return Math.min(prev + Math.random() * 5, 100)
      })
    }, 100)

    // Animate loading text dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  // Split text for animation
  const letters = "MOHAMMED EK".split("")

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="relative mb-8">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl font-bold inline-block"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              },
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "16rem", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
          style={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        />
      </motion.div>

      <motion.div
        className="text-sm text-gray-400 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span>{loadingText}</span>
        <span className="w-6 inline-block">{dots}</span>
        <span>({Math.round(progress)}%)</span>
      </motion.div>
    </div>
  )
}
