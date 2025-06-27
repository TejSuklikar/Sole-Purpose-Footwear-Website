"use client"

import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-black">
              <Header />
              <main className="bg-black">{children}</main>
              <Footer />
              <ScrollToTop />
              <Toaster />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
