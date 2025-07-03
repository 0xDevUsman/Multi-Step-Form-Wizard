import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FormProvider } from "@/lib/form-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FormWizardUI",
  description: "A beautiful, responsive multi-step form with modern design",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">{children}</div>
          <Toaster position="top-right" richColors />
        </FormProvider>
      </body>
    </html>
  )
}
