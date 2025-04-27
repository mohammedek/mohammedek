"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CreativeBackground({ cursorPosition }) {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const timer = setTimeout(() => setIsLoaded(true), 500)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    const { width, height } = dimensions

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Particle system
    const particles = []
    const particleCount = Math.min(150, Math.floor((width * height) / 8000))

    class Particle {
      constructor() {
        this.reset()
        // Start particles at random positions
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 1
      }

      reset() {
        // Position
        this.x = Math.random() * width
        this.y = Math.random() * height

        // Size and opacity
        this.baseSize = Math.random() * 2 + 0.5
        this.size = this.baseSize
        this.opacity = Math.random() * 0.6 + 0.2

        // Velocity
        this.vx = Math.random() * 0.2 - 0.1
        this.vy = Math.random() * 0.2 - 0.1

        // Color
        const hue = Math.random() * 60 + 220 // Blue to purple range
        this.color = `hsla(${hue}, 100%, 70%, ${this.opacity})`

        // Pulse properties
        this.pulseFactor = Math.random() * 0.5 + 0.5
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2

        // Lifespan
        this.life = Math.random() * 100 + 100
        this.maxLife = this.life
      }

      update(time, cursorX, cursorY) {
        // Cursor influence
        const dx = this.x - cursorX
        const dy = this.y - cursorY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.2
          this.vx += (dx / distance) * force
          this.vy += (dy / distance) * force
        }

        // Update position
        this.x += this.vx
        this.y += this.vy

        // Dampen velocity
        this.vx *= 0.99
        this.vy *= 0.99

        // Pulse size
        this.size = Math.max(
          0.1,
          this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * this.pulseFactor,
        )

        // Decrease life
        this.life--

        // Reset if off-screen or dead
        if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50 || this.life <= 0) {
          this.reset()
        }
      }

      draw(ctx) {
        // Fade out as life decreases
        const lifeRatio = this.life / this.maxLife
        const alpha = this.opacity * lifeRatio
        const safeSize = Math.max(0.1, this.size) // Ensure size is positive

        ctx.globalAlpha = alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, safeSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connection lines
    function drawConnections(particles, ctx, maxDistance) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    let animationFrameId
    const lastTime = 0

    // Animation loop
    const animate = (timestamp) => {
      const time = timestamp / 1000
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (const particle of particles) {
        particle.update(time, cursorPosition.x * width, cursorPosition.y * height)
        particle.draw(ctx)
      }

      // Draw connections between nearby particles
      drawConnections(particles, ctx, 100)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions, cursorPosition])

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </motion.div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/80 pointer-events-none" />

      {/* Noise texture overlay for film grain effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
    </div>
  )
}
