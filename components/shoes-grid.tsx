"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const allSizes = [
  // Men's sizes (starting from 7, as youth 7Y = men's 7)
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
  "15",
  // Women's sizes
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
  // Babies and Toddlers (1C-10C)
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
  "8C",
  "8.5C",
  "9C",
  "9.5C",
  "10C",
  // Little Kids (8C-3Y) - includes overlap with toddlers
  "10.5C",
  "11C",
  "11.5C",
  "12C",
  "12.5C",
  "13C",
  "13.5C",
  "1Y",
  "1.5Y",
  "2Y",
  "2.5Y",
  "3Y",
  // Big Kids (1Y-7Y) - includes overlap with little kids
  "3.5Y",
  "4Y",
  "4.5Y",
  "5Y",
  "5.5Y",
  "6Y",
  "6.5Y",
  "7Y",
]

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

interface ShoesGridProps {
  filters: {
    sizes: string[]
    priceRanges: { min: number; max: number }[]
  }
}

export function ShoesGrid({ filters }: ShoesGridProps) {
  const filteredShoes = shoes.filter((shoe) => {
    // Size filter
    if (filters.sizes.length > 0) {
      const hasMatchingSize = filters.sizes.some((size) => shoe.sizes.includes(size))
      if (!hasMatchingSize) return false
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
        <p className="text-neutral-400">Try adjusting your size or price range selections.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-neutral-400 text-sm">
          Showing {filteredShoes.length} of {shoes.length} shoes
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
                  <p className="text-2xl font-bold text-neutral-900 mb-4">${shoe.price}</p>
                  <p className="text-sm text-neutral-600 mb-4">Available in all sizes</p>
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
