"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState([])
  const maxTrailLength = 8

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add to trail with timestamp
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: Date.now() }]
        if (newTrail.length > maxTrailLength) {
          return newTrail.slice(newTrail.length - maxTrailLength)
        }
        return newTrail
      })
    }

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: 0.8,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 30,
          scale: { duration: 0.15 },
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 1000,
          damping: 25,
          opacity: { duration: 0.15 },
        }}
      />

      {/* Cursor trail */}
      {trail.map((point, index) => {
        const size = 6 * (1 - index / maxTrailLength)
        const opacity = 0.4 * (1 - index / maxTrailLength)
        const hue = 240 + index * 10 // Shift from blue to purple

        return (
          <motion.div
            key={point.id}
            className="fixed rounded-full pointer-events-none z-40 mix-blend-screen"
            style={{
              width: size,
              height: size,
              x: point.x - size / 2,
              y: point.y - size / 2,
              opacity,
              backgroundColor: `hsl(${hue}, 100%, 70%)`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )
      })}
    </>
  )
}
