"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { InteractiveText } from "@/components/interactive-text"
import { ResumeData } from "@/lib/resume-data"
import { Github, Linkedin, ExternalLink } from "lucide-react"

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
          {ResumeData.name}
        </motion.h1>

        <motion.div variants={itemVariants}>
          <InteractiveText
            text={ResumeData.title}
            className="text-xl md:text-2xl font-light text-cyan-400 mb-6"
            charClassName="hover:text-white hover:scale-110 transition-all duration-300"
          />
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          {ResumeData.summary}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            View Projects
          </Button>
          <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950">
            Download Resume
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-4">
          <a
            href={ResumeData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/30 rounded-full border border-purple-600/30 hover:bg-purple-900/30 transition-all"
          >
            <Github className="h-5 w-5 text-white" />
          </a>
          <a
            href={ResumeData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/30 rounded-full border border-purple-600/30 hover:bg-purple-900/30 transition-all"
          >
            <Linkedin className="h-5 w-5 text-white" />
          </a>
          <a
            href={`https://${ResumeData.contact.portfolio}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/30 rounded-full border border-purple-600/30 hover:bg-purple-900/30 transition-all"
          >
            <ExternalLink className="h-5 w-5 text-white" />
          </a>
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
