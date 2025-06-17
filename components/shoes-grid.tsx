"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const allSizes = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]

const shoes = [
  // Featured shoes (first 3 from hero section)
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 350,
    image: "/images/kuffiyeh-side-sunset.png",
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 425,
    image: "/images/mexican-side-view.png",
    slug: "mexican-eagle-af1",
    sizes: allSizes,
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    price: 375,
    image: "/images/black-red-geometric-hero.jpg",
    slug: "black-red-geometric",
    sizes: allSizes,
  },
  // Other shoes
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    image: "/images/jordanian-side-view.jpg",
    slug: "jordanian-flag-af1",
    sizes: allSizes,
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    image: "/images/geometric-checkered-side.jpg",
    slug: "geometric-checkered",
    sizes: allSizes,
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 450,
    image: "/images/chinese-side-sunset.png",
    slug: "chinese-flag-af1",
    sizes: allSizes,
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 395,
    image: "/images/checkered-drip-sunset.png",
    slug: "checkered-drip-af1",
    sizes: allSizes,
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 380,
    image: "/images/palestine-map-side.jpg",
    slug: "map-of-palestine-af1",
    sizes: allSizes,
  },
  // New shoes added at the bottom
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 410,
    image: "/images/lebanese-side-view.jpg",
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 420,
    image: "/images/filipino-side-view.jpg",
    slug: "filipino-sun-af1",
    sizes: allSizes,
  },
]

interface FilterState {
  selectedSizes: string[]
  priceRanges: { min: number; max: number }[]
}

interface ShoesGridProps {
  filters: FilterState
}

export function ShoesGrid({ filters }: ShoesGridProps) {
  const filteredShoes = useMemo(() => {
    let filtered = shoes

    // Filter by size
    if (filters.selectedSizes.length > 0) {
      filtered = filtered.filter((shoe) => filters.selectedSizes.some((size) => shoe.sizes.includes(size)))
    }

    // Filter by price range
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter((shoe) =>
        filters.priceRanges.some((range) => shoe.price >= range.min && shoe.price <= range.max),
      )
    }

    return filtered
  }, [filters])

  return (
    <div>
      {/* Results count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-neutral-300 text-sm sm:text-base">
          Showing {filteredShoes.length} of {shoes.length} shoes
        </p>
        {(filters.selectedSizes.length > 0 || filters.priceRanges.length > 0) && (
          <p className="text-neutral-400 text-xs sm:text-sm">Filters applied</p>
        )}
      </div>

      {/* No results message */}
      {filteredShoes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400 text-lg mb-4">No shoes match your current filters</p>
          <p className="text-neutral-500 text-sm">Try adjusting your size or price range selections</p>
        </div>
      )}

      {/* Shoes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredShoes.map((shoe) => (
          <div key={shoe.id}>
            <Link href={`/shoes/${shoe.slug}`}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105">
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
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-neutral-900">{shoe.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">${shoe.price}</p>
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-neutral-600 mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {shoe.sizes.slice(0, 6).map((size) => (
                        <span
                          key={size}
                          className={`px-2 py-1 text-xs rounded border ${
                            filters.selectedSizes.includes(size)
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-neutral-100 text-neutral-700 border-neutral-300"
                          }`}
                        >
                          {size}
                        </span>
                      ))}
                      {shoe.sizes.length > 6 && (
                        <span className="px-2 py-1 text-xs text-neutral-500">+{shoe.sizes.length - 6} more</span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-neutral-700 hover:bg-neutral-800 text-white">View Details</Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
