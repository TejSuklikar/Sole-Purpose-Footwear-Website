"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const shoes = [
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    image: "/images/jordanian-af1.png",
    slug: "jordanian-flag-af1",
    sizes: ["6", "7", "8", "9"],
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    image: "/images/geometric-af1.png",
    slug: "geometric-checkered",
    sizes: ["7.5", "8", "8.5", "9", "9.5"],
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 450,
    image: "/images/chinese-af1.png",
    slug: "chinese-flag-af1",
    sizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 395,
    image: "/images/checkered-drip-af1.png",
    slug: "checkered-drip-af1",
    sizes: ["7", "8", "9", "10"],
  },
  {
    id: 8,
    name: "Abstract Waves",
    price: 350,
    image: "/placeholder.svg?height=400&width=400",
    slug: "abstract-waves",
    sizes: ["7.5", "8", "8.5", "9"],
  },
  {
    id: 9,
    name: "Urban Street Art",
    price: 400,
    image: "/placeholder.svg?height=400&width=400",
    slug: "urban-street-art",
    sizes: ["8", "9", "10", "11"],
  },
]

export function ShoesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {shoes.map((shoe) => (
        <div key={shoe.id} className="group">
          <Link href={`/shoes/${shoe.slug}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src={shoe.image || "/placeholder.svg"}
                  alt={shoe.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{shoe.name}</h3>
                <p className="text-2xl font-bold text-neutral-900 mb-4">${shoe.price}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {shoe.sizes.slice(0, 4).map((size) => (
                    <span key={size} className="px-2 py-1 bg-neutral-100 text-xs rounded">
                      {size}
                    </span>
                  ))}
                  {shoe.sizes.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-100 text-xs rounded">+{shoe.sizes.length - 4}</span>
                  )}
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
