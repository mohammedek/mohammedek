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
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${Math.random() * 60 + 240}, 100%, 50%)`
      }

      update() {
        this.x += this.speedX + cursorPosition.x * 2
        this.y += this.speedY - cursorPosition.y * 2

        if (this.x > width) this.x = 0
        else if (this.x < 0) this.x = width

        if (this.y > height) this.y = 0
        else if (this.y < 0) this.y = height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = "rgba(77, 53, 255, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 50
      const offsetX = (scrollY * 0.1) % gridSize
      const offsetY = (scrollY * 0.05) % gridSize

      for (let x = -offsetX; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = -offsetY; y < height; y += gridSize) {
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
