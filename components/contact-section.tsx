"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ResumeData } from "@/lib/resume-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, Github, ExternalLink, Loader2 } from "lucide-react"
import { submitContactForm } from "@/lib/actions"
import { toast } from "sonner"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(formRef.current)
      const result = await submitContactForm(formData)

      if (result.success) {
        toast.success(result.message)
        formRef.current.reset()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
      console.error("Contact form error:", error)
    } finally {
      setIsSubmitting(false)
    }
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
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact Information</h3>

            <div className="space-y-4">
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-purple-900/50 p-2 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: "#5d35ff" }}
                >
                  <Mail className="h-5 w-5 text-purple-300" />
                </motion.div>
                <a
                  href={`mailto:${ResumeData.contact.email}`}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {ResumeData.contact.email}
                </a>
              </motion.div>

              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-purple-900/50 p-2 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: "#5d35ff" }}
                >
                  <Phone className="h-5 w-5 text-purple-300" />
                </motion.div>
                <a
                  href={`tel:${ResumeData.contact.phone}`}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {ResumeData.contact.phone}
                </a>
              </motion.div>

              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-purple-900/50 p-2 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: "#5d35ff" }}
                >
                  <Linkedin className="h-5 w-5 text-purple-300" />
                </motion.div>
                <a
                  href={ResumeData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </motion.div>

              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-purple-900/50 p-2 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: "#5d35ff" }}
                >
                  <Github className="h-5 w-5 text-purple-300" />
                </motion.div>
                <a
                  href={ResumeData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  GitHub Profile
                </a>
              </motion.div>

              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-purple-900/50 p-2 rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: "#5d35ff" }}
                >
                  <ExternalLink className="h-5 w-5 text-purple-300" />
                </motion.div>
                <a
                  href={`https://${ResumeData.contact.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Portfolio Website
                </a>
              </motion.div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Location</h3>
              <p className="text-gray-300">{ResumeData.contact.location}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-black/30 border-purple-900/50 focus:border-cyan-500 text-white"
                />
              </motion.div>
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-black/30 border-purple-900/50 focus:border-cyan-500 text-white"
                />
              </motion.div>
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                <Input
                  name="subject"
                  placeholder="Subject"
                  className="bg-black/30 border-purple-900/50 focus:border-cyan-500 text-white"
                />
              </motion.div>
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="bg-black/30 border-purple-900/50 focus:border-cyan-500 text-white resize-none"
                />
              </motion.div>
              <motion.div
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
