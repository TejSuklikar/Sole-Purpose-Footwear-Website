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
  description?: string
  isFeatured?: boolean
}

export function HeroSection() {
  const [featuredShoes, setFeaturedShoes] = useState<Shoe[]>([])

  // Load featured shoes from global storage
  useEffect(() => {
    const loadFeaturedShoes = () => {
      const savedShoes = localStorage.getItem("sp_shoes_global")
      if (savedShoes) {
        const shoes = JSON.parse(savedShoes)
        const featured = shoes.filter((shoe: Shoe) => shoe.isFeatured).slice(0, 3)
        setFeaturedShoes(featured)
      }
    }

    loadFeaturedShoes()

    // Listen for storage changes to update when admin makes changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_shoes_global") {
        loadFeaturedShoes()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadFeaturedShoes, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">Sole Purpose</h1>
          <p className="text-xl md:text-2xl font-medium text-neutral-300 mb-6 font-sans">
            Personalize your step with a unique hand painted design
          </p>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            Where contemporary design meets traditional craftsmanship. Each pair celebrates culture, identity, and
            personal expression through meticulous hand-painted artistry.
          </p>
        </div>

        {featuredShoes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {featuredShoes.map((shoe, index) => (
              <div
                key={shoe.id}
                className={`${index === 0 ? "fade-in-up" : index === 1 ? "fade-in-up-delay-1" : "fade-in-up-delay-2"}`}
              >
                <Link href={`/shoes/${shoe.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                      <Image
                        src={shoe.image || "/placeholder.svg"}
                        alt={shoe.name}
                        fill
                        className="object-cover object-center"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair text-xl font-semibold mb-2 text-black">{shoe.name}</h3>
                        <p className="text-neutral-800 mb-4 line-clamp-2">{shoe.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-black">${shoe.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black border-2 border-black px-8 py-3 text-lg font-medium"
            >
              <Link href="/shoes">View All Designs</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-black border-2 border-black px-8 py-3 text-lg font-medium"
            >
              <Link href="/order">Start a Custom Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
