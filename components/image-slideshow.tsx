"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slideshowImages = [
  {
    id: 1,
    src: "/images/kuffiyeh-side-sunset.png",
    alt: "Red Kuffiyeh AF1 - Side view at sunset",
    title: "Red Kuffiyeh AF1",
    description: "Traditional Palestinian patterns in bold red",
  },
  {
    id: 2,
    src: "/images/kuffiyeh-side-detail.png",
    alt: "Red Kuffiyeh AF1 - Detailed side view",
    title: "Red Kuffiyeh AF1",
    description: "Intricate geometric design details",
  },
  {
    id: 3,
    src: "/images/kuffiyeh-heel-view.png",
    alt: "Red Kuffiyeh AF1 - Heel view",
    title: "Red Kuffiyeh AF1",
    description: "Back view showing heel details",
  },
  {
    id: 4,
    src: "/images/mexican-full-shoe.png",
    alt: "Mexican Eagle AF1",
    title: "Mexican Eagle AF1",
    description: "Hand-painted Mexican flag design",
  },
  {
    id: 5,
    src: "/images/black-red-af1.png",
    alt: "Black & Red Geometric AF1",
    title: "Black & Red Geometric",
    description: "Sleek geometric patterns",
  },
]

export function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideshowImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)
  }

  const currentImage = slideshowImages[currentIndex]

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Featured Designs</h2>
          <p className="text-lg text-neutral-600">Explore our custom sneaker artistry from every angle</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-[4/3] relative bg-white rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              fill
              className="object-cover object-center transition-opacity duration-500"
              crossOrigin="anonymous"
            />

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6 text-neutral-900" />
            </button>

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-white font-playfair text-2xl font-bold mb-2">{currentImage.title}</h3>
              <p className="text-white/90 text-lg">{currentImage.description}</p>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-center mt-4">
            <span className="text-neutral-600 text-sm">
              {currentIndex + 1} of {slideshowImages.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
