"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Featured shoes - directly defined
const featuredShoes = [
  {
    id: 5,
    name: "Black & White Checkered",
    price: 160,
    image: "/images/geometric-checkered-side.jpg",
    slug: "black-and-white-checkered-af1",
    description: "Clean checkered pattern in black and white.",
  },
  {
    id: 13,
    name: "Palestine Heel Kuffiyeh AF1",
    price: 160,
    image: "/images/palestine-heel-kuffiyeh-af1-side-2.jpeg",
    slug: "palestine-heel-kuffiyeh-af1",
    description: "White AF1s with a Palestinian flag swoosh and Kuffiyeh heel.",
  },
  {
    id: 11,
    name: "Kuffiyeh Dunks",
    price: 160,
    image: "/images/kuffiyeh-dunk-single.jpeg",
    slug: "kuffiyeh-dunks",
    description: "Traditional Kuffiyeh patterns hand-painted on black Nike Dunks.",
  },
]

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-in-up">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Sole Purpose
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-300 mb-4 sm:mb-6 font-sans px-4">
            Personalize your step with a unique hand painted design
          </p>
          <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed px-4">
            Where contemporary design meets traditional craftsmanship. Each pair celebrates culture, identity, and
            personal expression through meticulous hand-painted artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-0">
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
                      className={`object-cover object-center ${shoe.slug === "kuffiyeh-dunks" ? "scale-110" : ""}`}
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-playfair text-xl font-semibold mb-2 text-black">{shoe.name}</h3>
                      <p className="text-neutral-800 mb-4 line-clamp-2">{shoe.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-black">$120 - $210</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-black border-2 border-black px-6 sm:px-8 py-3 text-base sm:text-lg font-medium"
            >
              <Link href="/shoes">View All Designs</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-black border-2 border-black px-6 sm:px-8 py-3 text-base sm:text-lg font-medium"
            >
              <Link href="/order">Start a Custom Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
