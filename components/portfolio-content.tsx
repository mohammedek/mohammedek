"use client"

import { useState, useEffect } from "react"
import { IntroSection } from "@/components/intro-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { MouseFollower } from "@/components/mouse-follower"
import { CreativeBackground } from "@/components/creative-background"
import { motion } from "framer-motion"

export default function PortfolioContent() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    // Set loaded state after a delay
    const timer = setTimeout(() => setIsLoaded(true), 1000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {!isMobile && <MouseFollower />}
      <CreativeBackground cursorPosition={cursorPosition} />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <IntroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </motion.div>
    </>
  )
}
