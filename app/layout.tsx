import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./client-layout"

export const metadata: Metadata = {
  title: "Sole Purpose Footwear - Custom Sneakers & Cultural Designs",
  description:
    "Custom footwear designed to speak your truth. We craft one-of-a-kind kicks that blend creativity, comfort, and culture — made for movement, made with meaning.",
  keywords:
    "custom sneakers, cultural footwear, custom Air Force 1, Palestinian flag shoes, Mexican heritage shoes, custom kicks",
  authors: [{ name: "Sole Purpose Footwear" }],
  creator: "Sole Purpose Footwear",
  publisher: "Sole Purpose Footwear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://solepurpose.shop"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sole Purpose Footwear - Custom Sneakers & Cultural Designs",
    description:
      "Custom footwear designed to speak your truth. We craft one-of-a-kind kicks that blend creativity, comfort, and culture.",
    url: "https://solepurpose.shop",
    siteName: "Sole Purpose Footwear",
    images: [
      {
        url: "/images/hero-shoe-1.png",
        width: 1200,
        height: 630,
        alt: "Custom Palestinian flag Air Force 1 sneakers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sole Purpose Footwear - Custom Sneakers & Cultural Designs",
    description:
      "Custom footwear designed to speak your truth. We craft one-of-a-kind kicks that blend creativity, comfort, and culture.",
    images: ["/images/hero-shoe-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}


import './globals.css'