"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//
interface Shoe {
  id: number
  name: string
  price: number
  image: string
  images: string[]
  slug: string
  sizes: string[]
  inStockSizes: string[]
  description: string
  details: string[]
  isFeatured: boolean
}

type Filters = {
  priceRange: [number, number]
  sizes: string[]
  featured: boolean | null
}

//
// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
//
const DEFAULT_FILTERS: Filters = {
  priceRange: [0, Number.POSITIVE_INFINITY],
  sizes: [],
  featured: null,
}

// master size list (re-used for every shoe)
const allSizes: string[] = [
  // Men
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
  // Women
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
  // Infant 1C-7.5C
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
  // Toddler 8C-13.5C
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
  // Youth 1Y-5.5Y
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
  // Big kids 6Y-8Y
  "6Y",
  "6.5Y",
  "7Y",
  "7.5Y",
  "8Y",
]

// 12 shoes including the new Palestine Heel Kuffiyeh AF1
const defaultShoes: Shoe[] = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    price: 160,
    image: "/images/kuffiyeh-side-sunset.png",
    images: ["/images/kuffiyeh-side-sunset.png"],
    slug: "red-kuffiyeh-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A vibrant red kuffiyeh design.",
    details: ["Sticker price: $160"],
    isFeatured: true,
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    price: 160,
    image: "/images/mexican-side-view.png",
    images: ["/images/mexican-side-view.png"],
    slug: "mexican-eagle-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A design featuring the Mexican eagle.",
    details: ["Sticker price: $160"],
    isFeatured: true,
  },
  {
    id: 3,
    name: "Black & Red Kuffiyeh",
    price: 160,
    image: "/images/black-red-geometric-hero.jpg",
    images: ["/images/black-red-geometric-hero.jpg"],
    slug: "black-red-geometric",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A striking black and red geometric design.",
    details: ["Sticker price: $160"],
    isFeatured: true,
  },
  {
    id: 4,
    name: "Jordanian Flag AF1",
    price: 160,
    image: "/images/jordanian-side-view.jpg",
    images: ["/images/jordanian-side-view.jpg"],
    slug: "jordanian-flag-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A design featuring the Jordanian flag.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 5,
    name: "Black & White Checkered",
    price: 160,
    image: "/images/geometric-checkered-side.jpg",
    images: ["/images/geometric-checkered-side.jpg"],
    slug: "geometric-checkered",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A classic black and white checkered design.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 6,
    name: "Chinese Flag AF1",
    price: 160,
    image: "/images/chinese-side-sunset.png",
    images: ["/images/chinese-side-sunset.png"],
    slug: "chinese-flag-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A design featuring the Chinese flag.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 7,
    name: "Checkered Drip AF1",
    price: 160,
    image: "/images/checkered-drip-sunset.png",
    images: ["/images/checkered-drip-sunset.png"],
    slug: "checkered-drip-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A checkered drip design.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 8,
    name: "Map of Palestine AF1",
    price: 160,
    image: "/images/palestine-map-side.jpg",
    images: ["/images/palestine-map-side.jpg"],
    slug: "map-of-palestine-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A design featuring the map of Palestine.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 9,
    name: "Lebanese Cedar AF1",
    price: 160,
    image: "/images/lebanese-side-view.jpg",
    images: ["/images/lebanese-side-view.jpg"],
    slug: "lebanese-cedar-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A design featuring the Lebanese cedar.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 10,
    name: "Filipino Sun AF1",
    price: 160,
    image: "/images/filipino-side-view.jpg",
    images: ["/images/filipino-side-view.jpg"],
    slug: "filipino-sun-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "A design featuring the Filipino sun.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 11,
    name: "Kuffiyeh Dunks",
    price: 160,
    image: "/images/kuffiyeh-dunk-single.jpeg",
    images: ["/images/kuffiyeh-dunk-single.jpeg", "/images/kuffiyeh-dunk-pair.jpeg"],
    slug: "kuffiyeh-dunks",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Traditional Kuffiyeh patterns on black Nike Dunks.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 12,
    name: "Palestine Heel Kuffiyeh AF1",
    price: 160,
    image: "/images/palestine-heel-af1-side.jpeg",
    images: ["/images/palestine-heel-af1-side.jpeg", "/images/palestine-heel-af1-back.jpeg"],
    slug: "palestine-heel-kuffiyeh-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "White Nike Air Force 1 with Palestinian flag heel design and traditional Kuffiyeh pattern.",
    details: [
      "Hand-painted Palestinian flag on heel",
      "Traditional Kuffiyeh geometric strip",
      "Palestinian colors on Nike AIR branding",
      "Sticker price: $160",
    ],
    isFeatured: true,
  },
]

//
// ─── COMPONENT ──────────────────────────────────────────────────────────────────
//
export function ShoesGrid({ filters }: { filters?: Partial<Filters> }) {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [loading, setLoading] = useState(true)

  // merge provided filters with defaults
  const mergedFilters: Filters = { ...DEFAULT_FILTERS, ...filters }

  useEffect(() => {
    const loadShoes = async () => {
      try {
        const res = await fetch("/data/shoes.json")
        if (res.ok) {
          const liveShoes: Shoe[] = await res.json()
          setShoes(liveShoes.length ? liveShoes : defaultShoes)
        }
      } catch {
        setShoes(defaultShoes)
      } finally {
        setLoading(false)
      }
    }
    loadShoes()
  }, [])

  const filtered = shoes.filter((shoe) => {
    // price
    if (shoe.price < mergedFilters.priceRange[0] || shoe.price > mergedFilters.priceRange[1]) return false
    // sizes
    if (mergedFilters.sizes.length) {
      const match = mergedFilters.sizes.some((sz) => shoe.inStockSizes.includes(sz))
      if (!match) return false
    }
    // featured
    if (mergedFilters.featured !== null) {
      if (mergedFilters.featured && !shoe.isFeatured) return false
      if (!mergedFilters.featured && shoe.isFeatured) return false
    }
    return true
  })

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="h-8 w-8 mx-auto mb-4 border-b-2 border-white rounded-full animate-spin" />
        <p className="text-white">Loading shoes…</p>
      </div>
    )
  }

  if (!filtered.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-white mb-2">No shoes match your filters.</p>
        <Button onClick={() => window.location.reload()}>Reset filters</Button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 text-center text-neutral-400">Showing {filtered.length} custom designs</div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((shoe) => (
          <Link key={shoe.id} href={`/shoes/${shoe.slug}`}>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src={shoe.image || "/placeholder.svg"}
                  alt={shoe.name}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const tgt = e.target as HTMLImageElement
                    tgt.src = "/placeholder.svg?height=400&width=400"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{shoe.name}</h3>
                <p className="mb-1 text-2xl font-bold text-neutral-900">${shoe.price}</p>
                <p className="mb-4 text-sm text-neutral-600">Available in {shoe.inStockSizes.length} sizes</p>
                <Button className="w-full bg-neutral-700 text-white">View Details</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
