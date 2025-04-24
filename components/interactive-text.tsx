"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function InteractiveText({ text, className = "", charClassName = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <h2 className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${charClassName}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            y: hoveredIndex === index ? -5 : 0,
            color: hoveredIndex === index ? "#ffffff" : "",
            scale: hoveredIndex === index ? 1.2 : 1,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
          whileHover={{ scale: 1.2 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  )
}

export function SplitText({ children, ...props }) {
  const words = children.split(" ")
  return words.map((word, i) => {
    return (
      <div key={i} className="inline-block overflow-hidden mr-1">
        <motion.div {...props} style={{ display: "inline-block" }} custom={i}>
          {word + (i !== words.length - 1 ? "\u00A0" : "")}
        </motion.div>
      </div>
    )
  })
}
