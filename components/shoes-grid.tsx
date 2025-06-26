"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchWithCacheBusting } from "@/lib/cache-buster"

interface Shoe {
  id: number
  name: string
  price: number
  image: string
  slug: string
  sizes: string[]
  inStockSizes: string[]
  description?: string
  details?: string[]
  isFeatured?: boolean
}

// CORRECTED sizing system - exactly 73 sizes INCLUDING 7.5C
const allSizes = [
  // Men's sizes (17 sizes: 7-15, including half sizes)
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "13.5",
  "14",
  "14.5",
  "15",
  // Women's sizes (15 sizes: 5W-12W, including half sizes)
  "5W",
  "5.5W",
  "6W",
  "6.5W",
  "7W",
  "7.5W",
  "8W",
  "8.5W",
  "9W",
  "9.5W",
  "10W",
  "10.5W",
  "11W",
  "11.5W",
  "12W",
  // Infant sizes (14 sizes: 1C-7.5C, including half sizes) - INCLUDES 7.5C
  "1C",
  "1.5C",
  "2C",
  "2.5C",
  "3C",
  "3.5C",
  "4C",
  "4.5C",
  "5C",
  "5.5C",
  "6C",
  "6.5C",
  "7C",
  "7.5C",
  // Toddler sizes (12 sizes: 8C-13.5C, including half sizes)
  "8C",
  "8.5C",
  "9C",
  "9.5C",
  "10C",
  "10.5C",
  "11C",
  "11.5C",
  "12C",
  "12.5C",
  "13C",
  "13.5C",
  // Youth (10 sizes: 1Y-5.5Y, including half sizes)
  "1Y",
  "1.5Y",
  "2Y",
  "2.5Y",
  "3Y",
  "3.5Y",
  "4Y",
  "4.5Y",
  "5Y",
  "5.5Y",
  // Big Kids (5 sizes: 6Y-8Y, including 8Y to get exactly 73 total)
  "6Y",
  "6.5Y",
  "7Y",
  "7.5Y",
  "8Y",
]

// Default shoes data with $160 sticker price
const defaultShoes: Shoe[] = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 160,
    image: "/images/kuffiyeh-side-sunset.png",
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 160,
    image: "/images/mexican-side-view.png",
    slug: "mexican-eagle-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 3,
    name: "Black & Red Kuffiyeh",
    price: 160,
    image: "/images/black-red-geometric-hero.jpg",
    slug: "black-red-geometric",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 160,
    image: "/images/jordanian-side-view.jpg",
    slug: "jordanian-flag-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 5,
    name: "Black & White Checkered",
    price: 160,
    image: "/images/geometric-checkered-side.jpg",
    slug: "geometric-checkered",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 160,
    image: "/images/chinese-side-sunset.png",
    slug: "chinese-flag-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 160,
    image: "/images/checkered-drip-sunset.png",
    slug: "checkered-drip-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 160,
    image: "/images/palestine-map-side.jpg",
    slug: "map-of-palestine-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 160,
    image: "/images/lebanese-side-view.jpg",
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 160,
    image: "/images/filipino-side-view.jpg",
    slug: "filipino-sun-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
  },
]

export function ShoesGrid() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadShoes = useCallback(
    async (forceRefresh = false) => {
      console.log("🔄 Loading shoes data...", forceRefresh ? "(FORCED)" : "(auto)")

      try {
        const response = await fetchWithCacheBusting("/data/shoes.json")
        if (response.ok) {
          const liveShoes = await response.json()
          if (Array.isArray(liveShoes) && liveShoes.length > 0) {
            console.log(`✅ SUCCESS: Loaded ${liveShoes.length} shoes from LIVE data`)
            const processedShoes = liveShoes.map((shoe: Shoe) => ({
              ...shoe,
              sizes: shoe.sizes || allSizes,
              inStockSizes: shoe.inStockSizes || allSizes,
            }))
            setShoes(processedShoes)
            localStorage.setItem("sp_shoes_global", JSON.stringify(processedShoes))
            setIsLoading(false)
            return
          }
        }
      } catch (error) {
        console.log("💥 Live data error, falling back.", error)
      }

      try {
        const savedShoes = localStorage.getItem("sp_shoes_global")
        if (savedShoes) {
          const parsedShoes = JSON.parse(savedShoes)
          if (Array.isArray(parsedShoes) && parsedShoes.length > 0) {
            console.log(`📦 Loaded ${parsedShoes.length} shoes from localStorage`)
            setShoes(parsedShoes)
          }
        }
      } catch (error) {
        console.log("💥 localStorage error, falling back.", error)
      }

      if (shoes.length === 0) {
        console.log("🆕 Using default shoes data")
        setShoes(defaultShoes)
      }
      setIsLoading(false)
    },
    [shoes.length],
  )

  useEffect(() => {
    loadShoes(true)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_shoes_global" || e.key === "sp_force_refresh") {
        loadShoes(true)
      }
    }
    const handleFocus = () => loadShoes(true)
    const handleForceRefresh = () => loadShoes(true)
    const handleOnline = () => loadShoes(true)
    const handleVisibilityChange = () => {
      if (!document.hidden) loadShoes(true)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("forceDataRefresh", handleForceRefresh as EventListener)
    window.addEventListener("online", handleOnline)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const interval = setInterval(() => loadShoes(), 3000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("forceDataRefresh", handleForceRefresh as EventListener)
      window.removeEventListener("online", handleOnline)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearInterval(interval)
    }
  }, [loadShoes])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading shoes...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {shoes.map((shoe) => (
        <div key={shoe.id}>
          <Link href={`/shoes/${shoe.slug}`}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="aspect-[4/3] relative">
                <Image
                  src={shoe.image || "/placeholder.svg?height=400&width=400&text=Shoe+Image"}
                  alt={shoe.name}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-neutral-900">{shoe.name}</h3>
                <p className="text-2xl font-bold text-neutral-900 mb-2">${shoe.price}</p>
                <p className="text-sm text-neutral-600 mb-4">Available in {shoe.inStockSizes?.length || 0} sizes</p>
                <Button className="w-full bg-neutral-700 text-white">View Details</Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
