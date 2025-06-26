import "./globals.css"

import type { ReactNode } from "react"
import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { AuthGuard } from "@/components/auth-guard"
import { CartSidebar } from "@/components/cart-sidebar"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: {
    default: "Sole Purpose Footwear",
    template: "%s | Sole Purpose Footwear",
  },
  description: "Hand-painted custom sneakers celebrating culture, heritage, and personal stories.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solepurposefootwear.com",
    siteName: "Sole Purpose Footwear",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-50 antialiased">
        {/* Theme → Auth → Cart providers ensure all hooks work site-wide */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <AuthGuard>
                <ScrollToTop />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartSidebar />
              </AuthGuard>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
