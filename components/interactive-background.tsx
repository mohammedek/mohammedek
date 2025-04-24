"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils } from "three"

export function InteractiveBackground({ cursorPosition }) {
  const particlesRef = useRef()
  const gridRef = useRef()

  // Create particles
  const count = 500
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = Math.random() * 15 - 5
      positions[i3 + 2] = (Math.random() - 0.5) * 30

      sizes[i] = Math.random() * 0.5 + 0.1
    }

    return { positions, sizes }
  }, [count])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      // Rotate particles slowly
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05

      // Move particles based on cursor
      particlesRef.current.rotation.x = MathUtils.lerp(particlesRef.current.rotation.x, cursorPosition.y * 0.2, 0.1)
      particlesRef.current.rotation.z = MathUtils.lerp(particlesRef.current.rotation.z, -cursorPosition.x * 0.2, 0.1)

      // Animate particles
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(clock.getElapsedTime() * 0.2 + i * 0.1) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (gridRef.current) {
      // Subtle grid movement based on cursor
      gridRef.current.rotation.x = -Math.PI / 2 + cursorPosition.y * 0.1
      gridRef.current.position.z = cursorPosition.x * 2
    }
  })

  return (
    <>
      {/* Grid floor */}
      <group ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <gridHelper args={[40, 40, "#4d35ff", "#101010"]} />
        <mesh receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions.positions} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={count} array={positions.sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={0.1} sizeAttenuation color="#ffffff" transparent opacity={0.8} depthWrite={false} />
      </points>

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#5d35ff" />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#00c8ff" />

      {/* Glowing orbs */}
      <GlowingOrbs cursorPosition={cursorPosition} />
    </>
  )
}

function GlowingOrbs({ cursorPosition }) {
  const orbsRef = useRef([])

  // Create orbs
  const orbsCount = 5
  const orbsData = useMemo(() => {
    return Array.from({ length: orbsCount }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 20, Math.random() * 10 - 5, (Math.random() - 0.5) * 20],
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.5 + 0.5,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [orbsCount])

  useFrame(({ clock }) => {
    orbsRef.current.forEach((orb, i) => {
      if (!orb) return

      const time = clock.getElapsedTime()
      const data = orbsData[i]

      // Floating animation
      orb.position.y = data.position[1] + Math.sin(time * data.speed + data.offset) * 2

      // Subtle movement based on cursor
      orb.position.x = data.position[0] + cursorPosition.x * 2
      orb.position.z = data.position[2] + cursorPosition.y * 2

      // Pulsating scale
      orb.scale.setScalar(data.scale + Math.sin(time * data.speed * 0.5) * 0.2)
    })
  })

  return (
    <>
      {orbsData.map((data, i) => (
        <mesh key={i} ref={(el) => (orbsRef.current[i] = el)} position={data.position} scale={data.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#5d35ff" : "#00c8ff"}
            emissive={i % 2 === 0 ? "#5d35ff" : "#00c8ff"}
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  )
}
