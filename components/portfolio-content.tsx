"use client"

import { useState, useEffect } from "react"
import { IntroSection } from "@/components/intro-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { MouseFollower } from "@/components/mouse-follower"
import { BackgroundEffect } from "@/components/background-effect"

export default function PortfolioContent() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <MouseFollower />
      <BackgroundEffect cursorPosition={cursorPosition} scrollY={scrollY} />

      <div className="relative z-10">
        <IntroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  )
}
