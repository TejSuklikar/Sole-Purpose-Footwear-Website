"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { Check, ChevronLeft, ChevronRight, ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

interface Shoe {
  id: number
  name: string
  price: number
  images: string[]
  sizes: string[]
  inStockSizes?: string[]
  description: string
  details: string[]
}

export function ProductDetail({ shoe: initialShoe }: { shoe: Shoe }) {
  const [shoe, setShoe] = useState(initialShoe)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isAdded, setIsAdded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { dispatch } = useCart()

  // Load current shoe data from global storage to get latest inventory
  useEffect(() => {
    const loadShoeData = () => {
      const savedShoes = localStorage.getItem("sp_shoes_global")
      if (savedShoes) {
        const shoes = JSON.parse(savedShoes)
        const currentShoe = shoes.find((s: Shoe) => s.id === initialShoe.id)
        if (currentShoe) {
          setShoe({ ...initialShoe, inStockSizes: currentShoe.inStockSizes || initialShoe.sizes })
        }
      }
    }

    loadShoeData()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sp_shoes_global") {
        loadShoeData()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically
    const interval = setInterval(loadShoeData, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [initialShoe])

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

  const inStockSizes = shoe.inStockSizes || shoe.sizes

  // Group sizes by category for better display
  const mensSizes = shoe.sizes.filter((size) => !size.includes("W") && !size.includes("C") && !size.includes("Y"))
  const womensSizes = shoe.sizes.filter((size) => size.includes("W"))
  const babiesToddlerSizes = shoe.sizes.filter((size) => {
    if (!size.includes("C")) return false
    const num = Number.parseFloat(size)
    return num >= 1 && num <= 10
  })
  const littleKidsSizes = shoe.sizes.filter((size) => {
    if (size.includes("C")) {
      const num = Number.parseFloat(size)
      return num >= 8 && num <= 13.5
    }
    if (size.includes("Y")) {
      const num = Number.parseFloat(size)
      return num >= 1 && num <= 3
    }
    return false
  })
  const bigKidsSizes = shoe.sizes.filter((size) => {
    if (size.includes("Y")) {
      const num = Number.parseFloat(size)
      return num >= 1 && num <= 7
    }
    return false
  })

  const renderSizeCategory = (categoryName: string, categorySizes: string[]) => {
    if (categorySizes.length === 0) return null

    return (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-neutral-300 mb-2">{categoryName}</h4>
        <div className="grid grid-cols-4 gap-2">
          {categorySizes.map((size) => {
            const isInStock = inStockSizes.includes(size)
            const isSelected = selectedSize === size

            return (
              <button
                key={size}
                onClick={() => isInStock && setSelectedSize(size)}
                disabled={!isInStock}
                className={`p-3 border rounded-lg text-center transition-colors relative ${
                  isSelected
                    ? "border-white bg-white text-neutral-900"
                    : isInStock
                      ? "border-neutral-600 text-white hover:border-neutral-400"
                      : "border-neutral-700 text-neutral-500 cursor-not-allowed"
                }`}
              >
                {size}
                {!isInStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/80 rounded-lg">
                    <span className="text-xs text-red-400">Out</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const canAddToCart = selectedSize && inStockSizes.includes(selectedSize)

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Arrow */}
        <div className="mb-8">
          <Link href="/shoes" className="inline-flex items-center text-white hover:text-neutral-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[4/3] relative bg-neutral-50 rounded-lg overflow-hidden group">
              <Image
                src={shoe.images[currentImageIndex] || "/placeholder.svg?height=400&width=400&text=Product+Image"}
                alt={`${shoe.name} view ${currentImageIndex + 1}`}
                fill
                className="object-contain object-center p-4"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=400&text=Product+Image"
                }}
              />

              {/* Navigation arrows - only show if more than 1 image */}
              {shoe.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
                      src={image || "/placeholder.svg?height=100&width=100&text=Thumbnail"}
                      alt={`${shoe.name} thumbnail ${index + 1}`}
                      fill
                      className="object-contain object-center p-2"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=100&width=100&text=Thumbnail"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">{shoe.name}</h1>
              <p className="text-3xl font-bold text-white">${shoe.price}</p>
            </div>

            <p className="text-lg text-neutral-300 leading-relaxed">{shoe.description}</p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 text-sm">
              <Package className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-400">
                {inStockSizes.length > 0 ? (
                  <>
                    <span className="text-green-400">{inStockSizes.length}</span> of {shoe.sizes.length} sizes in stock
                  </>
                ) : (
                  <span className="text-red-400">Currently out of stock</span>
                )}
              </span>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Select Size</h3>
              <p className="text-sm text-neutral-400 mb-4">Sizes marked "Out" are currently unavailable</p>

              {renderSizeCategory("Men's", mensSizes)}
              {renderSizeCategory("Women's", womensSizes)}
              {renderSizeCategory("Big Kids (1Y-7Y)", bigKidsSizes)}
              {renderSizeCategory("Little Kids (8C-3Y)", littleKidsSizes)}
              {renderSizeCategory("Babies & Toddlers (1C-10C)", babiesToddlerSizes)}
            </div>

            {/* Add to Cart */}
            <Button onClick={handleAddToCart} disabled={!canAddToCart} size="lg" className="w-full">
              {isAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to Cart
                </>
              ) : !selectedSize ? (
                "Select a Size"
              ) : !inStockSizes.includes(selectedSize) ? (
                "Size Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </Button>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Product Details</h3>
              <ul className="space-y-2">
                {shoe.details.map((detail, index) => (
                  <li key={index} className="text-neutral-300 flex items-start">
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
