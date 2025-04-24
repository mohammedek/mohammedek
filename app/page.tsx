"use client"

import { Suspense, useState, useEffect } from "react"
import { Loader } from "@/components/loader"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use dynamic import with error handling
  const PortfolioContent = () => {
    const [error, setError] = useState(false)
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      import("@/components/portfolio-content")
        .then((module) => {
          setComponent(() => module.default)
        })
        .catch((err) => {
          console.error("Failed to load portfolio content:", err)
          setError(true)
        })
    }, [])

    if (error) return <div className="text-red-500 p-4">Failed to load portfolio. Please refresh the page.</div>
    if (!Component) return <Loader />
    return <Component />
  }

  if (!mounted) {
    return <Loader />
  }

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        <PortfolioContent />
      </Suspense>
    </main>
  )
}
