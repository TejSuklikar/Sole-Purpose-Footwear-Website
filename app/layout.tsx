import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AuthGuard } from "@/components/auth-guard"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Sole Purpose Footwear - Custom Sneaker Artistry",
  description: "Contemporary footwear brand specializing in custom sneaker designs and made-to-order artistry.",
  openGraph: {
    title: "Sole Purpose Footwear - Custom Sneaker Artistry",
    description: "Contemporary footwear brand specializing in custom sneaker designs and made-to-order artistry.",
    type: "website",
  },
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <AuthGuard>
              <ScrollToTop />
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartSidebar />
            </AuthGuard>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
