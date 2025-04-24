"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { InteractiveText } from "@/components/interactive-text"

export function IntroSection() {
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center max-w-3xl z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text"
        >
          MOHAMMED EK
        </motion.h1>

        <motion.div variants={itemVariants}>
          <InteractiveText
            text="Senior Flutter Developer"
            className="text-xl md:text-2xl font-light text-cyan-400 mb-6"
            charClassName="hover:text-white hover:scale-110 transition-all duration-300"
          />
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
          Results-driven Flutter developer with 4+ years of experience building responsive, scalable mobile
          applications. Successfully delivered 8+ production-ready applications with improved performance and user
          experience.
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Building AI-powered applications using Flutter and Vertex AI. Exploring data science and machine learning as a
          passionate rookie.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            View Projects
          </Button>
          <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950">
            Download Resume
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-gray-400 text-sm"
        >
          Scroll Down
        </motion.div>
      </div>
    </div>
  )
}
