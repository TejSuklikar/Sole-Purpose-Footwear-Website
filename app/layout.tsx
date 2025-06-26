import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Sole Purpose Footwear - Custom Sneaker Art",
  description:
    "Custom footwear designed to speak your truth. One-of-a-kind kicks that blend creativity, comfort, and culture.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="bg-black">{children}</main>
            <Footer />
            <ScrollToTop />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
