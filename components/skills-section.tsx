"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ResumeData } from "@/lib/resume-data"

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  // Define colors for different skill categories
  const categoryColors = {
    "Mobile Development": "from-purple-900/80 to-blue-900/80",
    "Backend & Cloud": "from-blue-900/80 to-cyan-900/80",
    "AI & Data Science": "from-cyan-900/80 to-green-900/80",
    "Tools & Methodologies": "from-green-900/80 to-purple-900/80",
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl w-full"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(ResumeData.skills).map(([category, skills], index) => (
            <motion.div
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-black/30 backdrop-blur-sm border border-purple-900/50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className={`bg-gradient-to-r ${categoryColors[category] || "from-purple-900/80 to-blue-900/80"} px-3 py-1.5 rounded-full text-sm text-white cursor-pointer`}
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 300, damping: 10 },
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
