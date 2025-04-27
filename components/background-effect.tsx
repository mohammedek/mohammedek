"use client"

import { useRef, useEffect } from "react"

export function BackgroundEffect({ cursorPosition, scrollY }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = window.innerWidth
    const height = window.innerHeight

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Create particles
    const particlesArray = []
    const numberOfParticles = Math.min(100, Math.floor((width * height) / 10000)) // Adjust based on screen size

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 3 + 1 // Smaller particles for better performance
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = `hsl(${Math.random() * 60 + 240}, 100%, 50%)`
        this.opacity = Math.random() * 0.5 + 0.3 // Varying opacity
      }

      update() {
        // Adjust movement based on cursor position with reduced effect
        const cursorEffect = 1
        this.x += this.speedX + cursorPosition.x * cursorEffect
        this.y += this.speedY - cursorPosition.y * cursorEffect

        // Wrap around screen edges
        if (this.x > width) this.x = 0
        else if (this.x < 0) this.x = width

        if (this.y > height) this.y = 0
        else if (this.y < 0) this.y = height
      }

      draw() {
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)

      // Draw grid with scroll effect
      ctx.strokeStyle = "rgba(77, 53, 255, 0.07)" // More subtle grid
      ctx.lineWidth = 1

      const gridSize = 50
      const offsetX = (scrollY * 0.05) % gridSize
      const offsetY = (scrollY * 0.02) % gridSize

      // Draw fewer grid lines for better performance
      for (let x = -offsetX; x < width; x += gridSize * 2) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = -offsetY; y < height; y += gridSize * 2) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [cursorPosition, scrollY])

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
    </div>
  )
}
