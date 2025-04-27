"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { trackResumeDownload } from "@/lib/actions"
import { toast } from "sonner"
import { getSupabaseBrowserClient } from "@/lib/supabase"

export function ResumeDownloadButton({ variant = "default", className = "" }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      // Create form data with user info
      const formData = new FormData()
      formData.append("userAgent", navigator.userAgent)
      formData.append("referrer", document.referrer || "direct")

      // Track download and get file info
      const result = await trackResumeDownload(formData)

      if (!result.success) {
        toast.error(result.message || "Failed to download resume")
        return
      }

      // Get file from Supabase Storage
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.storage.from("public").download(result.filePath)

      if (error) {
        console.error("Error downloading file:", error)
        toast.error("Failed to download resume")
        return
      }

      // Create download link
      const url = URL.createObjectURL(data)
      const link = document.createElement("a")
      link.href = url
      link.download = result.fileName
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success("Resume downloaded successfully!")
    } catch (error) {
      console.error("Resume download error:", error)
      toast.error("Failed to download resume")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button variant={variant} className={className} onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </>
      )}
    </Button>
  )
}
