"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ResumeData } from "@/lib/resume-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SplitText } from "@/components/interactive-text"

export function ExperienceSection() {
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

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
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
          Professional Experience
        </motion.h2>

        <div className="space-y-8">
          {ResumeData.experience.map((job, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }} className="origin-top">
              <Card className="bg-black/50 border border-purple-900/50 backdrop-blur-sm overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-xl md:text-2xl text-white group-hover:text-cyan-400 transition-colors">
                        <SplitText variants={textVariants} initial="hidden" animate="visible">
                          {job.title}
                        </SplitText>
                      </CardTitle>
                      <CardDescription className="text-gray-400">{job.company}</CardDescription>
                      {job.companyInfo && (
                        <CardDescription className="text-gray-500 text-sm mt-1 max-w-2xl">
                          {job.companyInfo}
                        </CardDescription>
                      )}
                    </div>
                    <Badge variant="outline" className="bg-purple-950/50 text-purple-300 border-purple-700">
                      {job.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    {job.responsibilities.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-cyan-500 mr-2">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
