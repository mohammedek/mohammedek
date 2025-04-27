import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mohammed EK - Senior Flutter Developer",
  description: "Portfolio of Mohammed EK, a Senior Flutter Developer with 4+ years of experience",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
