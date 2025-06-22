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

export function ShoesGrid({ filters }: ShoesGridProps) {
  const [shoes, setShoes] = useState<Shoe[]>([])

  // Load shoes from global storage
  useEffect(() => {
    const loadShoes = () => {
      const savedShoes = localStorage.getItem("sp_shoes_global")
      if (savedShoes) {
        setShoes(JSON.parse(savedShoes))
      }
    }

    loadShoes()

    // Listen for storage changes to update when admin makes changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_shoes_global") {
        loadShoes()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadShoes, 1000)

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
