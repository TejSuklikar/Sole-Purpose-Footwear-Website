"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const shoes = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 350,
    image: "/images/kuffiyeh-side-sunset.png",
    slug: "red-kuffiyeh-af1",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 425,
    image: "/images/mexican-full-shoe.png",
    slug: "mexican-eagle-af1",
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    price: 375,
    image: "/images/black-red-af1.png",
    slug: "black-red-geometric",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "11"],
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 400,
    image: "/images/jordanian-side-view.jpg",
    slug: "jordanian-flag-af1",
    sizes: ["6", "7", "8", "9", "10"],
  },
  {
    id: 5,
    name: "Geometric Checkered",
    price: 325,
    image: "/images/geometric-checkered-side.jpg",
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
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10"],
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
