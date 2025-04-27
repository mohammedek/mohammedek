"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          border: "1px solid rgba(93, 53, 255, 0.3)",
          backdropFilter: "blur(8px)",
        },
        success: {
          style: {
            borderLeft: "4px solid #5d35ff",
          },
        },
        error: {
          style: {
            borderLeft: "4px solid #ff3535",
          },
        },
      }}
    />
  )
}
