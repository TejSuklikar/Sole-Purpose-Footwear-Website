"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

interface Shoe {
  id: number
  name: string
  price: number
  images: string[]
  sizes: string[]
  description: string
  details: string[]
}

export function ProductDetail({ shoe }: { shoe: Shoe }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isAdded, setIsAdded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) return

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${shoe.id}-${selectedSize}`,
        name: shoe.name,
        price: shoe.price,
        size: selectedSize,
        image: shoe.images[0],
      },
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shoe.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shoe.images.length) % shoe.images.length)
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[4/3] relative bg-neutral-50 rounded-lg overflow-hidden group">
              <Image
                src={shoe.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${shoe.name} view ${currentImageIndex + 1}`}
                fill
                className="object-contain object-center p-4"
                crossOrigin="anonymous"
              />

              {/* Navigation arrows - only show if more than 1 image */}
              {shoe.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {shoe.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {shoe.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-neutral-900" : "bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail images */}
            {shoe.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {shoe.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-[4/3] relative bg-neutral-50 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-neutral-900" : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${shoe.name} thumbnail ${index + 1}`}
                      fill
                      className="object-contain object-center p-2"
                      crossOrigin="anonymous"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 mb-2">{shoe.name}</h1>
              <p className="text-3xl font-bold text-neutral-900">${shoe.price}</p>
            </div>

            <p className="text-lg text-neutral-600 leading-relaxed">{shoe.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {shoe.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedSize === size
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button onClick={handleAddToCart} disabled={!selectedSize} size="lg" className="w-full">
              {isAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                "Add to Cart"
              )}
            </Button>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2">
                {shoe.details.map((detail, index) => (
                  <li key={index} className="text-neutral-600 flex items-start">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
