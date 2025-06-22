"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Shoe {
  id: number
  name: string
  price: number
  image: string
  slug: string
  sizes: string[]
  inStockSizes: string[]
}

interface ShoesGridProps {
  filters: {
    sizes: string[]
    priceRanges: { min: number; max: number }[]
  }
}

// Default shoes data as fallback
const defaultShoes: Shoe[] = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 350,
    image: "/images/kuffiyeh-side-sunset.png",
    slug: "red-kuffiyeh-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 425,
    image: "/images/mexican-side-view.png",
    slug: "mexican-eagle-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    price: 375,
    image: "/images/black-red-geometric-hero.jpg",
    slug: "black-red-geometric",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    image: "/images/jordanian-side-view.jpg",
    slug: "jordanian-flag-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    image: "/images/geometric-checkered-side.jpg",
    slug: "geometric-checkered",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 450,
    image: "/images/chinese-side-sunset.png",
    slug: "chinese-flag-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 395,
    image: "/images/checkered-drip-sunset.png",
    slug: "checkered-drip-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 380,
    image: "/images/palestine-map-side.jpg",
    slug: "map-of-palestine-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 410,
    image: "/images/lebanese-side-view.jpg",
    slug: "lebanese-cedar-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 420,
    image: "/images/filipino-side-view.jpg",
    slug: "filipino-sun-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStockSizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  },
]

export function ShoesGrid({ filters }: ShoesGridProps) {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load shoes from global storage
  useEffect(() => {
    const loadShoes = () => {
      try {
        const savedShoes = localStorage.getItem("sp_shoes_global")
        if (savedShoes) {
          const parsedShoes = JSON.parse(savedShoes)
          if (Array.isArray(parsedShoes) && parsedShoes.length > 0) {
            setShoes(parsedShoes)
          } else {
            // If saved shoes is empty or invalid, use default shoes
            setShoes(defaultShoes)
            localStorage.setItem("sp_shoes_global", JSON.stringify(defaultShoes))
          }
        } else {
          // If no saved shoes, initialize with default shoes
          setShoes(defaultShoes)
          localStorage.setItem("sp_shoes_global", JSON.stringify(defaultShoes))
        }
      } catch (error) {
        console.error("Error loading shoes:", error)
        // Fallback to default shoes if there's an error
        setShoes(defaultShoes)
        localStorage.setItem("sp_shoes_global", JSON.stringify(defaultShoes))
      }
      setIsLoading(false)
    }

    // Load shoes immediately
    loadShoes()

    // Listen for storage changes to update when admin makes changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_shoes_global") {
        loadShoes()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadShoes, 2000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const filteredShoes = shoes.filter((shoe) => {
    // Size filter - only show shoes that have the selected sizes IN STOCK
    if (filters.sizes.length > 0) {
      const hasMatchingInStockSize = filters.sizes.some((size) => shoe.inStockSizes.includes(size))
      if (!hasMatchingInStockSize) return false
    }

    // Price range filter
    if (filters.priceRanges.length > 0) {
      const matchesPriceRange = filters.priceRanges.some((range) => shoe.price >= range.min && shoe.price <= range.max)
      if (!matchesPriceRange) return false
    }

    return true
  })

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading shoes...</p>
      </div>
    )
  }

  if (filteredShoes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg mb-4">No shoes match your current filters.</p>
        <p className="text-neutral-400">
          Try adjusting your size or price range selections, or check back later for restocked items.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-neutral-400 text-sm">
          Showing {filteredShoes.length} of {shoes.length} shoes
          {filters.sizes.length > 0 && " with selected sizes in stock"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredShoes.map((shoe) => (
          <div key={shoe.id}>
            <Link href={`/shoes/${shoe.slug}`}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={shoe.image || "/placeholder.svg?height=400&width=400&text=Shoe+Image"}
                    alt={shoe.name}
                    fill
                    className="object-cover object-center"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=400&width=400&text=Shoe+Image"
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900">{shoe.name}</h3>
                  <p className="text-2xl font-bold text-neutral-900 mb-2">${shoe.price}</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    {shoe.inStockSizes.length > 0 ? (
                      <>Available in {shoe.inStockSizes.length} sizes</>
                    ) : (
                      <span className="text-red-600">Currently out of stock</span>
                    )}
                  </p>
                  <Button className="w-full bg-neutral-700 text-white">View Details</Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
