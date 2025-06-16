"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const featuredShoes = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    description: "Traditional Kuffiyeh patterns in bold red on white canvas 🇯🇴",
    image: "/images/kuffiyeh-sunset.png",
    price: "$350",
    slug: "red-kuffiyeh-af1",
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    description: "Hand-painted Mexican flag design with detailed eagle artwork 🇲🇽",
    image: "/images/mexican-eagle-hero.png",
    price: "$425",
    slug: "mexican-eagle-af1",
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    description: "Sleek black forces with striking red geometric patterns ❤️🖤",
    image: "/images/black-red-geometric-hero.jpg",
    price: "$375",
    slug: "black-red-geometric",
  },
]

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4">
            Sole Purpose Footwear
          </h1>
          <p className="text-xl md:text-2xl font-medium text-neutral-700 mb-6 font-sans">
            Personalize your step with a unique hand painted design
          </p>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Where contemporary design meets traditional craftsmanship. Each pair celebrates culture, identity, and
            personal expression through meticulous hand-painted artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featuredShoes.map((shoe, index) => (
            <div
              key={shoe.id}
              className={`group hover-lift ${
                index === 0 ? "fade-in-up" : index === 1 ? "fade-in-up-delay-1" : "fade-in-up-delay-2"
              }`}
            >
              <Link href={`/shoes/${shoe.slug}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                    <Image
                      src={shoe.image || "/placeholder.svg"}
                      alt={shoe.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-playfair text-xl font-semibold mb-2">{shoe.name}</h3>
                      <p className="text-neutral-600 mb-4 line-clamp-2">{shoe.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-neutral-900">{shoe.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 text-lg">
            <Link href="/shoes">
              View All Designs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
