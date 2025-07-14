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
  images: string[]
  slug: string
  sizes: string[]
  inStockSizes: string[]
  description: string
  details: string[]
  isFeatured: boolean
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

// Default shoes data with $160 sticker price - Updated with Kuffiyeh Dunks
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
    isFeatured: false,
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
    slug: "black-and-red-kuffiyeh-af1",
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
    slug: "black-and-white-checkered-af1",
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
    name: "Palestine AF1",
    price: 160,
    image: "/images/palestine-af1-side-v3.jpeg",
    images: ["/images/palestine-af1-side-v3.jpeg", "/images/palestine-af1-pair-v3.jpeg"],
    slug: "palestine-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "White Nike Air Force 1s featuring a Palestinian flag and kuffiyeh design on the swoosh.",
    details: ["Hand-painted with premium acrylic paints", "Based on Nike Air Force 1 silhouette"],
    isFeatured: false,
  },
  {
    id: 12,
    name: "Palestine Dunks",
    price: 160,
    image: "/images/palestine-dunks-side.jpeg",
    images: ["/images/palestine-dunks-side.jpeg", "/images/palestine-dunks-pair.jpeg"],
    slug: "palestine-dunks",
    sizes: allSizes,
    inStockSizes: allSizes,
    description:
      "Nike Dunks featuring a Palestinian flag design on the heel and a traditional kuffiyeh pattern on the swoosh.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 14,
    name: "Palestine Heel Kuffiyeh AF1",
    price: 160,
    image: "/images/palestine-heel-kuffiyeh-af1-side-2.jpeg",
    images: ["/images/palestine-heel-kuffiyeh-af1-side-2.jpeg", "/images/palestine-heel-kuffiyeh-af1-back-2.jpeg"],
    slug: "palestine-heel-kuffiyeh-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "White Nike Air Force 1s with a Palestinian flag swoosh and kuffiyeh details on the heel.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
  {
    id: 15,
    name: "Traditional Kuffiyeh AF1",
    price: 160,
    image: "/images/traditional-kuffiyeh-af1-side-2.jpeg",
    images: ["/images/traditional-kuffiyeh-af1-side-2.jpeg", "/images/traditional-kuffiyeh-af1-heel-2.jpeg"],
    slug: "traditional-kuffiyeh-af1",
    sizes: allSizes,
    inStockSizes: allSizes,
    description: "Classic white Nike Air Force 1s featuring a traditional black kuffiyeh pattern.",
    details: ["Sticker price: $160"],
    isFeatured: false,
  },
]

export function ShoesGrid() {
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load shoes data
  useEffect(() => {
    const loadShoes = async () => {
      try {
        console.log("🔄 Loading shoes data...")

        // Try to fetch from live data
        const response = await fetch("/data/shoes.json", { cache: "no-store" })

        if (response.ok) {
          const liveShoes = await response.json()
          if (Array.isArray(liveShoes) && liveShoes.length > 0) {
            console.log("✅ Loaded live shoes data:", liveShoes.length, "shoes")

            // Update shoes with live data
            const updatedShoes = liveShoes.map((shoe: Shoe) => ({
              ...shoe,
              image: shoe.images?.[0] || shoe.image, // Use first image as primary
              sizes: shoe.sizes || allSizes,
              inStockSizes: shoe.inStockSizes || allSizes,
            }))

            setShoes(updatedShoes)
            setIsLoading(false)
            return
          }
        } else {
          console.log("❌ Failed to fetch live shoes data:", response.status, response.statusText)
        }
      } catch (error) {
        console.log("⚠️ Live shoes data not available:", error)
      }

      // Fallback to default shoes
      console.log("🔄 Using default shoes data")
      setShoes(defaultShoes)
      setIsLoading(false)
    }

    loadShoes()
  }, [])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading shoes...</p>
      </div>
    )
  }

  if (shoes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg mb-4">No shoes available at the moment.</p>
        <p className="text-neutral-400">Check back later for new designs!</p>
        <Button
          onClick={() => {
            window.location.reload()
          }}
          className="mt-4 bg-white text-black"
        >
          Refresh Data
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-neutral-400 text-sm">Showing {shoes.length} custom designs</p>
        <Button
          onClick={() => {
            window.location.reload()
          }}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shoes.map((shoe) => (
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
                  <p className="text-sm text-neutral-600 mb-4">Available in {shoe.inStockSizes.length} sizes</p>
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
