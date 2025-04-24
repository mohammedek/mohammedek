"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
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
        className="fixed w-6 h-6 rounded-full border-2 border-cyan-400 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
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
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
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
      <CursorTrail mousePosition={mousePosition} />
    </>
  )
}

function CursorTrail({ mousePosition }) {
  const [trail, setTrail] = useState([])
  const maxTrailLength = 10

  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return

    setTrail((prevTrail) => {
      const newTrail = [...prevTrail, { ...mousePosition, id: Date.now() }]
      if (newTrail.length > maxTrailLength) {
        return newTrail.slice(newTrail.length - maxTrailLength)
      }
      return newTrail
    })
  }, [mousePosition])

  return (
    <>
      {trail.map((point, index) => {
        const size = 8 * (1 - index / maxTrailLength)
        const opacity = 0.5 * (1 - index / maxTrailLength)

        return (
          <motion.div
            key={point.id}
            className="fixed rounded-full bg-purple-500 pointer-events-none z-40 mix-blend-screen"
            style={{
              width: size,
              height: size,
              x: point.x - size / 2,
              y: point.y - size / 2,
              opacity,
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
