"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredShoes = [
  {
    id: 1,
    name: "Red Kuffiyeh AF1",
    image: "/images/kuffiyeh-side-sunset.png",
    slug: "red-kuffiyeh-af1",
  },
  {
    id: 2,
    name: "Mexican Eagle AF1",
    image: "/images/mexican-eagle-hero.png",
    slug: "mexican-eagle-af1",
  },
  {
    id: 3,
    name: "Black & Red Geometric",
    image: "/images/black-red-geometric-hero.jpg",
    slug: "black-red-geometric",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Cultural
                <span className="block text-gradient">Stories</span>
                <span className="block text-white">on Canvas</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-2xl">
                Custom hand-painted sneakers that celebrate heritage, identity, and artistic expression. Every pair
                tells your unique story.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-200 text-lg px-8 py-6">
                <Link href="/order">Start Custom Order</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
              >
                <Link href="/shoes">View Collection</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Custom Designs</div>
              </div>
              <div className="w-px h-12 bg-neutral-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Countries</div>
              </div>
              <div className="w-px h-12 bg-neutral-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">Hand-Painted</div>
              </div>
            </div>
          </div>

          {/* Featured Shoes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredShoes.map((shoe, index) => (
              <Link
                key={shoe.id}
                href={`/shoes/${shoe.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 hover:border-neutral-600 transition-all duration-300 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className={`aspect-square relative ${index === 0 ? "md:aspect-[2/1]" : ""}`}>
                  <Image
                    src={shoe.image || "/placeholder.svg"}
                    alt={shoe.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white text-lg md:text-xl mb-2">{shoe.name}</h3>
                    <div className="flex items-center text-neutral-300">
                      <span className="text-sm">View Details</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
