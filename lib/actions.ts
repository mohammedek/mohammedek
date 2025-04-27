"use server"

import { getSupabaseServerClient } from "./supabase"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return { success: false, message: "Please fill all required fields" }
    }

    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("contact_submissions").insert([{ name, email, subject, message }])

    if (error) {
      console.error("Error submitting contact form:", error)
      return { success: false, message: "Failed to submit form. Please try again." }
    }

    return { success: true, message: "Message sent successfully! I'll get back to you soon." }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

export async function trackResumeDownload(formData: FormData) {
  try {
    const userAgent = formData.get("userAgent") as string
    const referrer = formData.get("referrer") as string

    const supabase = getSupabaseServerClient()

    // Track the download
    await supabase.from("resume_downloads").insert([
      {
        user_agent: userAgent,
        referrer: referrer,
      },
    ])

    // Get the active resume file
    const { data: resumeFile } = await supabase
      .from("resume_files")
      .select("*")
      .eq("is_active", true)
      .order("version", { ascending: false })
      .limit(1)
      .single()

    if (!resumeFile) {
      return { success: false, message: "Resume file not found" }
    }

    return {
      success: true,
      fileName: resumeFile.file_name,
      filePath: resumeFile.file_path,
    }
  } catch (error) {
    console.error("Error in trackResumeDownload:", error)
    return { success: false, message: "Failed to process download request" }
  }
}
