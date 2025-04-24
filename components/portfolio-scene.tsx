"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera, Text, Preload, PerformanceMonitor } from "@react-three/drei"
import { motion } from "framer-motion"
import { Vector3, MathUtils } from "three"
import { Button } from "@/components/ui/button"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { InteractiveBackground } from "@/components/interactive-background"
import { InteractiveText } from "@/components/interactive-text"
import { MouseFollower } from "@/components/mouse-follower"

export default function PortfolioScene() {
  const [dpr, setDpr] = useState(1.5)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e) => {
      setCursorPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <MouseFollower />

      <Canvas shadows gl={{ antialias: true, alpha: false }} dpr={dpr}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 30]} />
        <ambientLight intensity={0.2} />

        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)}>
          <Scene cursorPosition={cursorPosition} isMobile={isMobile} />
        </PerformanceMonitor>

        <Preload all />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-screen" />
        <IntroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  )
}

function Scene({ cursorPosition, isMobile }) {
  const { camera } = useThree()
  const cameraRef = useRef()
  const targetPosition = useRef(new Vector3(0, 0, 10))
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame(({ clock }) => {
    if (!cameraRef.current) return

    // Subtle camera movement based on cursor
    const cameraSpeed = 0.02
    targetPosition.current.x = cursorPosition.x * 2
    targetPosition.current.y = cursorPosition.y * 1 + MathUtils.mapLinear(scrollY.current, 0, 5000, 0, -10)

    // Smooth camera movement
    cameraRef.current.position.x = MathUtils.lerp(cameraRef.current.position.x, targetPosition.current.x, cameraSpeed)
    cameraRef.current.position.y = MathUtils.lerp(cameraRef.current.position.y, targetPosition.current.y, cameraSpeed)

    // Look at center
    cameraRef.current.lookAt(0, MathUtils.mapLinear(scrollY.current, 0, 5000, 0, -10), 0)
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />

      <InteractiveBackground cursorPosition={cursorPosition} />

      <group position={[0, 0, 0]}>
        <FloatingName cursorPosition={cursorPosition} />
      </group>
    </>
  )
}

function FloatingName({ cursorPosition }) {
  const textRef = useRef()
  const subtitleRef = useRef()

  useFrame(({ clock }) => {
    if (textRef.current) {
      // Breathing animation
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 + 2

      // Subtle rotation based on cursor position
      textRef.current.rotation.x = cursorPosition.y * 0.1
      textRef.current.rotation.y = cursorPosition.x * 0.2
    }

    if (subtitleRef.current) {
      subtitleRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5 + 0.5) * 0.2 + 1
      subtitleRef.current.rotation.x = cursorPosition.y * 0.05
      subtitleRef.current.rotation.y = cursorPosition.x * 0.1
    }
  })

  return (
    <group>
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        fontSize={1.5}
        font="/fonts/Geist-Bold.ttf"
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        material-toneMapped={false}
      >
        MOHAMMED EK
      </Text>

      <Text
        ref={subtitleRef}
        position={[0, 1, 0]}
        fontSize={0.5}
        font="/fonts/Geist-Regular.ttf"
        color="#00c8ff"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Flutter Developer
      </Text>
    </group>
  )
}

function IntroSection() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center max-w-3xl"
      >
        <InteractiveText
          text="Flutter Developer"
          className="text-xl md:text-2xl font-light text-cyan-400 mb-2"
          charClassName="hover:text-white hover:scale-110 transition-all duration-300"
        />

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Results-driven Flutter developer with 4+ years of experience building responsive, scalable mobile
          applications. Successfully delivered 8+ production-ready applications with improved performance and user
          experience.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            View Projects
          </Button>
          <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950">
            Download Resume
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
